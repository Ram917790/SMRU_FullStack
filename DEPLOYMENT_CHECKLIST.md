# 🚀 Deployment Checklist

## Pre-Deployment
- [x] Update `ALLOWED_HOSTS` in `settings_production.py` with smru.in and smru.edu.in
- [x] Update `CORS_ALLOWED_ORIGINS` with smru.in and smru.edu.in domains
- [ ] Generate a secure `SECRET_KEY`
- [ ] Run `build_production.bat` or `build_production.sh`
- [ ] Test build locally

## FileZilla Upload
- [ ] Connect to server via FileZilla
- [ ] Upload `backend/` folder (excluding venv, __pycache__, .env)
- [ ] Upload `frontend/my-app/dist/` contents to `frontend/` folder
- [ ] Set proper file permissions (755 for directories, 644 for files)

## Server Configuration
- [ ] SSH into server
- [ ] Create `.env` file in backend directory with smru.in domains
- [ ] Install Python dependencies: `pip install -r requirements_production.txt`
- [ ] Run migrations: `python manage.py migrate --settings=smru.settings_production`
- [ ] Collect static files: `python manage.py collectstatic --noinput --settings=smru.settings_production`
- [ ] Create superuser (optional): `python manage.py createsuperuser --settings=smru.settings_production`

## Web Server Setup
- [ ] Configure Apache/Nginx virtual host
- [ ] Enable site configuration
- [ ] Restart web server
- [ ] Test static file serving

## Application Startup
- [ ] Start Gunicorn: `gunicorn --bind 127.0.0.1:8000 smru.wsgi:application`
- [ ] Or setup systemd service for auto-start
- [ ] Test API endpoints: `http://smru.in/api/` and `http://smru.edu.in/api/`
- [ ] Test frontend: `http://smru.in/` and `http://smru.edu.in/`

## SSL/HTTPS (Recommended)
- [ ] Install SSL certificate (Let's Encrypt)
- [ ] Update CORS settings for HTTPS
- [ ] Redirect HTTP to HTTPS

## Testing
- [ ] Frontend loads correctly
- [ ] API endpoints respond
- [ ] Static files load
- [ ] Media files accessible
- [ ] Admin panel accessible
- [ ] Database operations work

## Monitoring
- [ ] Setup log monitoring
- [ ] Monitor server resources
- [ ] Setup backup strategy
- [ ] Monitor application performance
