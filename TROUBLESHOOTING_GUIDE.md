# 🔧 Complete Troubleshooting Guide
## Fixing Common St. Mary's Rehabilitation University Website Issues

---

## 🚨 **Critical Issues (Website Not Working)**

### **❌ "This site can't be reached" Error**

**What it means:** Your website is completely inaccessible.

**Possible causes:**
- Server is down
- DNS not configured
- Wrong domain settings
- Firewall blocking access

**Solutions:**
1. **Check if server is running:**
   ```bash
   ping smru.in
   ```

2. **Verify DNS settings:**
   - Go to your domain registrar
   - Check if A record points to correct server IP
   - Wait 24-48 hours for DNS propagation

3. **Contact hosting provider:**
   - Ask if server is running
   - Verify domain configuration
   - Check firewall settings

---

### **❌ "Internal Server Error (500)"**

**What it means:** Server is running but application has errors.

**Solutions:**
1. **Check server error logs:**
   ```bash
   tail -f /var/log/apache2/smru_error.log
   ```

2. **Common causes:**
   - Missing Python dependencies
   - Wrong file permissions
   - Database connection issues
   - Incorrect .env file

3. **Fix steps:**
   ```bash
   # Install dependencies
   pip install -r requirements_production.txt
   
   # Fix permissions
   chmod 755 /your-web-directory/smru-website/backend
   
   # Check .env file
   cat /your-web-directory/smru-website/backend/.env
   ```

---

### **❌ "Page Not Found (404)"**

**What it means:** Files not found or wrong configuration.

**Solutions:**
1. **Check if files exist:**
   ```bash
   ls -la /your-web-directory/smru-website/frontend/
   ls -la /your-web-directory/smru-website/backend/
   ```

2. **Verify web server configuration:**
   - Check Apache/Nginx virtual host
   - Verify DocumentRoot path
   - Check file permissions

3. **Re-upload missing files:**
   - Use FileZilla to upload missing files
   - Verify upload completed successfully

---

## 🔧 **FileZilla Issues**

### **❌ "Connection Failed"**

**Solutions:**
1. **Check credentials:**
   - Verify username and password
   - Check if account is active
   - Contact hosting provider

2. **Check connection settings:**
   - Use correct protocol (FTP/SFTP)
   - Use correct port (21 for FTP, 22 for SFTP)
   - Try passive mode

3. **Network issues:**
   - Check internet connection
   - Try different network
   - Disable firewall temporarily

---

### **❌ "Permission Denied"**

**Solutions:**
1. **Check file permissions:**
   ```bash
   chmod 755 /your-web-directory/smru-website/backend
   chmod 644 /your-web-directory/smru-website/backend/*.py
   ```

2. **Check ownership:**
   ```bash
   chown -R www-data:www-data /your-web-directory/smru-website/
   ```

3. **Contact hosting provider:**
   - Ask for correct file permissions
   - Request ownership changes

---

### **❌ Upload Stuck or Very Slow**

**Solutions:**
1. **Check file sizes:**
   - Large files take longer
   - Don't upload unnecessary files

2. **Network optimization:**
   - Use wired connection
   - Close other applications
   - Try during off-peak hours

3. **Upload in smaller batches:**
   - Upload backend first
   - Then upload frontend
   - Don't upload everything at once

---

## 🐍 **Python/Django Issues**

### **❌ "Module Not Found" Error**

**Solutions:**
1. **Install missing dependencies:**
   ```bash
   pip install -r requirements_production.txt
   ```

2. **Check virtual environment:**
   ```bash
   source venv/bin/activate
   pip list
   ```

3. **Verify Python path:**
   ```bash
   which python
   python --version
   ```

---

### **❌ "Database Error"**

**Solutions:**
1. **Check database file:**
   ```bash
   ls -la /your-web-directory/smru-website/backend/db.sqlite3
   ```

2. **Run migrations:**
   ```bash
   python manage.py migrate --settings=smru.settings_production
   ```

3. **Check database permissions:**
   ```bash
   chmod 664 /your-web-directory/smru-website/backend/db.sqlite3
   ```

---

### **❌ "Static Files Not Found"**

**Solutions:**
1. **Collect static files:**
   ```bash
   python manage.py collectstatic --noinput --settings=smru.settings_production
   ```

2. **Check static files directory:**
   ```bash
   ls -la /your-web-directory/smru-website/backend/staticfiles/
   ```

3. **Verify web server configuration:**
   - Check Alias directive in Apache
   - Verify static files location

---

## 🌐 **Web Server Issues**

### **❌ Apache Not Starting**

**Solutions:**
1. **Check configuration:**
   ```bash
   apache2ctl configtest
   ```

2. **Check error logs:**
   ```bash
   tail -f /var/log/apache2/error.log
   ```

3. **Restart Apache:**
   ```bash
   sudo systemctl restart apache2
   ```

---

### **❌ Nginx Not Starting**

**Solutions:**
1. **Test configuration:**
   ```bash
   nginx -t
   ```

2. **Check error logs:**
   ```bash
   tail -f /var/log/nginx/error.log
   ```

3. **Restart Nginx:**
   ```bash
   sudo systemctl restart nginx
   ```

---

## 🔒 **SSL/HTTPS Issues**

### **❌ "Not Secure" Warning**

**Solutions:**
1. **Install SSL certificate:**
   ```bash
   sudo certbot --apache -d smru.in -d www.smru.in
   ```

2. **Check certificate status:**
   ```bash
   openssl s_client -connect smru.in:443
   ```

3. **Update CORS settings:**
   - Change HTTP to HTTPS in .env file
   - Update ALLOWED_HOSTS

---

## 📱 **Frontend Issues**

### **❌ React App Shows Blank Page**

**Solutions:**
1. **Check browser console:**
   - Press F12
   - Look for JavaScript errors
   - Check Network tab

2. **Verify build files:**
   ```bash
   ls -la /your-web-directory/smru-website/frontend/
   ```

3. **Check file permissions:**
   ```bash
   chmod 644 /your-web-directory/smru-website/frontend/*
   ```

---

### **❌ API Calls Failing**

**Solutions:**
1. **Check CORS settings:**
   - Verify .env file has correct domains
   - Check Django CORS configuration

2. **Test API directly:**
   ```bash
   curl http://smru.in/api/
   ```

3. **Check network requests:**
   - Use browser developer tools
   - Look for CORS errors

---

## 🔍 **Debugging Commands**

### **Check Application Status:**
```bash
# Check if Django is running
ps aux | grep gunicorn

# Check if ports are listening
netstat -tlnp | grep :8000

# Check system resources
top
df -h
free -h
```

### **Check Logs:**
```bash
# Django logs
tail -f /your-web-directory/smru-website/backend/logs/django.log

# Web server logs
tail -f /var/log/apache2/smru_error.log
tail -f /var/log/apache2/smru_access.log

# System logs
journalctl -u smru-website -f
```

### **Test Connectivity:**
```bash
# Test local connection
curl http://localhost:8000/api/

# Test external connection
curl http://smru.in/api/

# Test DNS resolution
nslookup smru.in
```

---

## 📞 **When to Contact Support**

### **Contact Your Hosting Provider When:**
- ✅ Server is completely down
- ✅ Can't connect via FTP/SSH
- ✅ Need to install software
- ✅ Need to configure web server
- ✅ Need SSL certificate setup
- ✅ File permission issues persist

### **Contact Domain Registrar When:**
- ✅ DNS not resolving
- ✅ Domain not pointing to server
- ✅ Need to update nameservers

### **What Information to Provide:**
- ✅ Exact error messages
- ✅ Steps you've already tried
- ✅ Log file contents
- ✅ Screenshots of errors
- ✅ Your server access details

---

## 🆘 **Emergency Recovery**

### **If Everything Breaks:**
1. **Don't panic** - most issues are fixable
2. **Document the problem** - take screenshots
3. **Contact support immediately**
4. **Have backup ready** - keep local copy of files
5. **Be patient** - some fixes take time

### **Quick Recovery Steps:**
```bash
# Stop everything
sudo systemctl stop apache2
sudo systemctl stop smru-website

# Check what's wrong
sudo systemctl status apache2
sudo systemctl status smru-website

# Fix and restart
sudo systemctl start smru-website
sudo systemctl start apache2
```

---

## ✅ **Prevention Tips**

### **Before Making Changes:**
- ✅ Always backup your files
- ✅ Test changes on a copy first
- ✅ Document what you're doing
- ✅ Have rollback plan ready

### **Regular Maintenance:**
- ✅ Monitor server resources
- ✅ Check error logs regularly
- ✅ Keep software updated
- ✅ Backup database regularly

---

*Remember: Most deployment issues are common and have standard solutions. Don't hesitate to ask for help!*

