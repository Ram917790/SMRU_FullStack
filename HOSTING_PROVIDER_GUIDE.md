# 🏢 Hosting Provider Setup Guide
## What to Ask Your Hosting Provider

---

## 📋 **Information to Provide to Your Hosting Provider**

### **Your Project Details:**
```
Project Type: Django + React Fullstack Application
Domains: smru.in and smru.edu.in
Python Version: 3.8 or higher
Node.js Version: 16 or higher
Database: SQLite (included) or PostgreSQL/MySQL
Web Server: Apache or Nginx
```

---

## 🔧 **Server Configuration Requirements**

### **1. Python Environment Setup**
Ask your hosting provider to run these commands:

```bash
# Navigate to your project directory
cd /your-web-directory/smru-website/backend

# Install Python dependencies
pip install -r requirements_production.txt

# Create virtual environment (if needed)
python -m venv venv
source venv/bin/activate  # Linux/Mac
# or
venv\Scripts\activate     # Windows

# Install dependencies in virtual environment
pip install -r requirements_production.txt
```

### **2. Database Setup**
```bash
# Run Django migrations
python manage.py migrate --settings=smru.settings_production

# Create superuser (optional)
python manage.py createsuperuser --settings=smru.settings_production

# Collect static files
python manage.py collectstatic --noinput --settings=smru.settings_production
```

### **3. Application Startup**
```bash
# Start the Django application
gunicorn --bind 127.0.0.1:8000 smru.wsgi:application

# Or run in background
nohup gunicorn --bind 127.0.0.1:8000 smru.wsgi:application &
```

---

## 🌐 **Web Server Configuration**

### **Apache Configuration**
Provide this configuration to your hosting provider:

```apache
<VirtualHost *:80>
    ServerName smru.in
    ServerAlias www.smru.in smru.edu.in www.smru.edu.in
    DocumentRoot /your-web-directory/smru-website/frontend
    
    # Serve React app
    <Directory /your-web-directory/smru-website/frontend>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
        
        # Handle React Router
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>
    
    # Django API endpoints
    Alias /api /your-web-directory/smru-website/backend
    <Directory /your-web-directory/smru-website/backend>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    # Static files
    Alias /static /your-web-directory/smru-website/backend/staticfiles
    <Directory /your-web-directory/smru-website/backend/staticfiles>
        Require all granted
    </Directory>
    
    # Media files
    Alias /media /your-web-directory/smru-website/backend/media
    <Directory /your-web-directory/smru-website/backend/media>
        Require all granted
    </Directory>
    
    # WSGI configuration
    WSGIDaemonProcess smru.in python-path=/your-web-directory/smru-website/backend python-home=/your-web-directory/smru-website/backend/venv
    WSGIProcessGroup smru.in
    WSGIScriptAlias /api /your-web-directory/smru-website/backend/smru/wsgi.py
    
    ErrorLog ${APACHE_LOG_DIR}/smru_error.log
    CustomLog ${APACHE_LOG_DIR}/smru_access.log combined
</VirtualHost>
```

### **Nginx Configuration (Alternative)**
```nginx
server {
    listen 80;
    server_name smru.in www.smru.in smru.edu.in www.smru.edu.in;
    
    # Frontend (React)
    location / {
        root /your-web-directory/smru-website/frontend;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
    
    # Backend API
    location /api/ {
        proxy_pass http://127.0.0.1:8000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Static files
    location /static/ {
        alias /your-web-directory/smru-website/backend/staticfiles/;
    }
    
    # Media files
    location /media/ {
        alias /your-web-directory/smru-website/backend/media/;
    }
}
```

---

## 🔒 **SSL Certificate Setup**

### **Let's Encrypt (Free SSL)**
Ask your hosting provider to install SSL certificates:

```bash
# Install Certbot
sudo apt install certbot python3-certbot-apache

# Get SSL certificate
sudo certbot --apache -d smru.in -d www.smru.in -d smru.edu.in -d www.smru.edu.in

# Auto-renewal
sudo crontab -e
# Add this line:
0 12 * * * /usr/bin/certbot renew --quiet
```

---

## 🚀 **Production Service Setup**

### **Systemd Service (Auto-start)**
Create a service file for automatic startup:

```bash
# Create service file
sudo nano /etc/systemd/system/smru-website.service
```

Add this content:
```ini
[Unit]
Description=Gunicorn instance to serve SMRU Django app
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/your-web-directory/smru-website/backend
Environment="PATH=/your-web-directory/smru-website/backend/venv/bin"
ExecStart=/your-web-directory/smru-website/backend/venv/bin/gunicorn --workers 3 --bind 127.0.0.1:8000 smru.wsgi:application
ExecReload=/bin/kill -s HUP $MAINPID
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Enable and start the service:
```bash
sudo systemctl daemon-reload
sudo systemctl enable smru-website
sudo systemctl start smru-website
sudo systemctl status smru-website
```

---

## 📊 **Monitoring and Logs**

### **Log Files Location**
Ask your hosting provider to monitor these log files:

```bash
# Application logs
tail -f /your-web-directory/smru-website/backend/logs/django.log

# Web server logs
tail -f /var/log/apache2/smru_error.log
tail -f /var/log/apache2/smru_access.log

# System logs
journalctl -u smru-website -f
```

### **Health Check Commands**
```bash
# Check if application is running
ps aux | grep gunicorn

# Check if ports are listening
netstat -tlnp | grep :8000

# Test API endpoint
curl http://localhost:8000/api/

# Check disk space
df -h

# Check memory usage
free -h
```

---

## 🔧 **Troubleshooting Commands**

### **Common Issues and Solutions**

**1. Application won't start:**
```bash
# Check Python version
python --version

# Check if dependencies are installed
pip list

# Check Django settings
python manage.py check --settings=smru.settings_production

# Check database connection
python manage.py dbshell --settings=smru.settings_production
```

**2. Static files not loading:**
```bash
# Recollect static files
python manage.py collectstatic --noinput --settings=smru.settings_production

# Check static files directory
ls -la /your-web-directory/smru-website/backend/staticfiles/

# Check web server configuration
apache2ctl configtest
```

**3. Database issues:**
```bash
# Check database file permissions
ls -la /your-web-directory/smru-website/backend/db.sqlite3

# Run migrations again
python manage.py migrate --settings=smru.settings_production

# Check database integrity
python manage.py dbshell --settings=smru.settings_production
```

---

## 📞 **Communication Template**

### **Email to Hosting Provider:**

```
Subject: Django + React Application Deployment Request

Dear Support Team,

I need help deploying my Django + React fullstack application with the following details:

Project Information:
- Domains: smru.in and smru.edu.in
- Technology: Django 5.0.6 + React + Vite
- Python Version: 3.8+
- Database: SQLite (included in project)

Files Location:
- Backend: /your-web-directory/smru-website/backend/
- Frontend: /your-web-directory/smru-website/frontend/

Required Actions:
1. Install Python dependencies from requirements_production.txt
2. Run Django migrations
3. Collect static files
4. Configure web server (Apache/Nginx)
5. Start Django application with Gunicorn
6. Setup SSL certificates
7. Configure auto-start service

I have uploaded all files via FileZilla and created the .env file with production settings.

Please let me know if you need any additional information or if there are any issues during the setup process.

Thank you for your assistance.

Best regards,
[Your Name]
```

---

## ✅ **Post-Deployment Checklist**

After your hosting provider completes the setup:

- [ ] ✅ Website loads at http://smru.in/
- [ ] ✅ Alternative domain works at http://smru.edu.in/
- [ ] ✅ API endpoints respond at http://smru.in/api/
- [ ] ✅ Admin panel accessible at http://smru.in/api/admin/
- [ ] ✅ Static files load correctly
- [ ] ✅ SSL certificate installed (https://)
- [ ] ✅ Application auto-starts on server reboot
- [ ] ✅ Error logs are accessible
- [ ] ✅ Database operations work
- [ ] ✅ File uploads work (if applicable)

---

## 🆘 **Emergency Contacts**

### **If Something Goes Wrong:**
1. **Contact your hosting provider immediately**
2. **Provide specific error messages**
3. **Share log file contents**
4. **Be ready to provide server access if needed**

### **Important Information to Have Ready:**
- ✅ Server IP address
- ✅ FTP/SFTP credentials
- ✅ SSH access (if available)
- ✅ Domain registrar login
- ✅ DNS settings access

---

*This guide provides everything your hosting provider needs to deploy your SMRU website successfully.*

