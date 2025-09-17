# 📚 SMRU Fullstack Application - Complete Documentation
## Comprehensive Project Documentation

---

## 🎯 **Project Overview**

### **Project Name:** SMRU Fullstack Application
### **Organization:** St. Mary's Rehabilitation University
### **Purpose:** Official university website with content management system
### **Domains:** smru.in and smru.edu.in
### **Repository:** [https://github.com/Ram917790/SMRU_FullStack.git](https://github.com/Ram917790/SMRU_FullStack.git)

---

## 🏗️ **Architecture Overview**

### **System Architecture:**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend │    │  Django Backend │    │   Database      │
│   (Port 5173)   │◄──►│   (Port 8000)   │◄──►│   (SQLite)      │
│                 │    │                 │    │                 │
│ • User Interface│    │ • API Endpoints │    │ • Data Storage  │
│ • Components    │    │ • Admin Panel   │    │ • Migrations    │
│ • Routing       │    │ • Authentication│    │ • Models        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### **Technology Stack:**
- **Frontend:** React 18.3.1 + Vite 7.1.1 + Tailwind CSS
- **Backend:** Django 5.0.6 + Django REST Framework
- **Database:** SQLite (development) / PostgreSQL (production)
- **Web Server:** Apache/Nginx
- **Application Server:** Gunicorn

---

## 📁 **Detailed Project Structure**

### **Backend Structure:**
```
backend/
├── cms/                           # Content Management System
│   ├── __init__.py
│   ├── admin.py                   # Django admin configuration
│   ├── apps.py                    # App configuration
│   ├── models.py                  # Database models
│   ├── views.py                   # API views
│   ├── serializers.py             # Data serialization
│   ├── urls.py                    # URL routing
│   ├── tests.py                   # Unit tests
│   └── migrations/                # Database migrations
│       ├── 0001_initial.py
│       ├── 0002_jobposting_delete_job.py
│       ├── 0003_alter_department_options.py
│       ├── 0004_leader_show_profile_button.py
│       ├── 0005_remove_leader_show_profile_button.py
│       ├── 0006_remove_leader_image_url.py
│       └── 0007_leader_email_leader_experience.py
├── smru/                          # Django project settings
│   ├── __init__.py
│   ├── settings.py                # Development settings
│   ├── settings_production.py     # Production settings
│   ├── urls.py                    # Main URL configuration
│   ├── wsgi.py                    # WSGI configuration
│   └── asgi.py                    # ASGI configuration
├── media/                         # Media files
│   └── leadership/                # Leadership images
├── staticfiles/                   # Collected static files
├── manage.py                      # Django management script
├── requirements.txt               # Development dependencies
├── requirements_production.txt    # Production dependencies
├── env_example.txt                # Environment variables template
├── create_basic_data.py           # Data seeding script
├── create_sample_data.py          # Sample data script
└── db.sqlite3                     # SQLite database
```

### **Frontend Structure:**
```
frontend/my-app/
├── src/
│   ├── components/                # React components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── HeroSection.jsx
│   │   ├── Navigation.jsx
│   │   └── slots/
│   │       └── LeadershipSlot.jsx
│   ├── pages/                     # Page components
│   │   ├── About.jsx
│   │   ├── Home.jsx
│   │   ├── Leadership.jsx
│   │   ├── LeaderProfile.jsx
│   │   └── Contact.jsx
│   ├── assets/                    # Static assets
│   │   ├── images/
│   │   ├── icons/
│   │   └── documents/
│   ├── data/                      # Static data
│   │   ├── leaders.js
│   │   └── schools.js
│   ├── hooks/                     # Custom React hooks
│   │   ├── useNpfForm.js
│   │   └── useOpenApply.js
│   ├── lib/                       # Utility libraries
│   │   └── api.js
│   ├── styles/                    # CSS styles
│   │   └── globals.css
│   ├── utils/                     # Utility functions
│   │   ├── placeholders.js
│   │   └── slug.js
│   ├── animations/                # Animation configurations
│   │   └── variants.js
│   ├── App.jsx                    # Main App component
│   ├── main.jsx                   # Application entry point
│   └── index.css                  # Global styles
├── public/                        # Public assets
│   ├── favicon.png
│   └── vite.svg
├── dist/                          # Built application
├── package.json                   # Node.js dependencies
├── vite.config.js                 # Vite configuration
├── tailwind.config.js             # Tailwind CSS configuration
├── postcss.config.js              # PostCSS configuration
└── eslint.config.js               # ESLint configuration
```

---

## 🗄️ **Database Schema**

### **Models:**

#### **Leader Model:**
```python
class Leader(models.Model):
    name = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    experience = models.TextField()
    profile_image = models.ImageField(upload_to='leadership/')
    bio = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

#### **Department Model:**
```python
class Department(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

#### **JobPosting Model:**
```python
class JobPosting(models.Model):
    title = models.CharField(max_length=200)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    description = models.TextField()
    requirements = models.TextField()
    location = models.CharField(max_length=100)
    salary_range = models.CharField(max_length=100)
    application_deadline = models.DateField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

---

## 🔌 **API Endpoints**

### **Base URL:**
- **Development:** `http://localhost:8000/api/`
- **Production:** `https://smru.in/api/`

### **Leadership API:**
```
GET    /api/leaders/              # List all leaders
GET    /api/leaders/{id}/         # Get specific leader
POST   /api/leaders/              # Create leader (admin only)
PUT    /api/leaders/{id}/         # Update leader (admin only)
DELETE /api/leaders/{id}/         # Delete leader (admin only)
```

### **Department API:**
```
GET    /api/departments/          # List all departments
GET    /api/departments/{id}/     # Get specific department
POST   /api/departments/          # Create department (admin only)
PUT    /api/departments/{id}/     # Update department (admin only)
DELETE /api/departments/{id}/     # Delete department (admin only)
```

### **Job Posting API:**
```
GET    /api/jobs/                 # List all job postings
GET    /api/jobs/{id}/            # Get specific job posting
POST   /api/jobs/                 # Create job posting (admin only)
PUT    /api/jobs/{id}/            # Update job posting (admin only)
DELETE /api/jobs/{id}/            # Delete job posting (admin only)
```

### **Admin Panel:**
```
GET    /api/admin/                # Django admin interface
```

---

## 🎨 **Frontend Components**

### **Main Components:**

#### **Header Component:**
- Navigation menu
- University logo
- Mobile responsive menu
- Contact information

#### **HeroSection Component:**
- Main banner
- Call-to-action buttons
- Background images
- Responsive design

#### **LeadershipSlot Component:**
- Leader profile cards
- Image display
- Contact information
- Social links

#### **Footer Component:**
- University information
- Quick links
- Contact details
- Social media links

### **Page Components:**

#### **Home Page:**
- Hero section
- University overview
- Featured content
- Quick navigation

#### **About Page:**
- University history
- Mission and vision
- Statistics
- Leadership information

#### **Leadership Page:**
- Leader grid display
- Filter by department
- Search functionality
- Pagination

#### **Leader Profile Page:**
- Individual leader details
- Biography
- Contact information
- Related leaders

#### **Contact Page:**
- Contact form
- University address
- Phone numbers
- Email addresses

---

## ⚙️ **Configuration Files**

### **Django Settings:**

#### **Development Settings (settings.py):**
```python
DEBUG = True
ALLOWED_HOSTS = ["127.0.0.1", "localhost"]
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
```

#### **Production Settings (settings_production.py):**
```python
DEBUG = False
ALLOWED_HOSTS = [
    'smru.in',
    'www.smru.in',
    'smru.edu.in',
    'www.smru.edu.in',
]
CORS_ALLOWED_ORIGINS = [
    "https://smru.in",
    "https://www.smru.in",
    "https://smru.edu.in",
    "https://www.smru.edu.in",
]
```

### **Vite Configuration:**
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
  server: {
    port: 5500,
    strictPort: true,
  }
});
```

### **Tailwind Configuration:**
```javascript
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#your-primary-color',
        secondary: '#your-secondary-color',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
```

---

## 🚀 **Build and Deployment**

### **Build Process:**

#### **Frontend Build:**
```bash
cd frontend/my-app
npm install
npm run build
```

#### **Backend Preparation:**
```bash
cd backend
pip install -r requirements_production.txt
python manage.py migrate --settings=smru.settings_production
python manage.py collectstatic --noinput --settings=smru.settings_production
```

### **Production Build Script:**
```bash
# Windows
build_production.bat

# Linux/Mac
./build_production.sh
```

### **Deployment Steps:**
1. **Build application locally**
2. **Upload files via FileZilla**
3. **Configure server (Apache/Nginx)**
4. **Install Python dependencies**
5. **Run database migrations**
6. **Start application with Gunicorn**
7. **Setup SSL certificates**

---

## 🔒 **Security Configuration**

### **Django Security:**
- CSRF protection enabled
- CORS headers configured
- Secure session settings
- XSS protection
- Content type sniffing protection

### **Production Security:**
- DEBUG = False
- Secure secret key
- HTTPS enforcement
- Secure cookie settings
- Content Security Policy

### **File Upload Security:**
- File type validation
- File size limits
- Secure file storage
- Image optimization

---

## 📊 **Performance Optimization**

### **Frontend Optimizations:**
- Vite build optimization
- Code splitting
- Image optimization
- Lazy loading
- Bundle size optimization

### **Backend Optimizations:**
- Database query optimization
- Static file serving
- Caching strategies
- Gzip compression
- CDN integration ready

### **Server Optimizations:**
- Gunicorn worker configuration
- Static file serving
- Media file handling
- Log rotation
- Monitoring setup

---

## 🧪 **Testing**

### **Backend Testing:**
```bash
cd backend
python manage.py test
```

### **Frontend Testing:**
```bash
cd frontend/my-app
npm test
```

### **API Testing:**
- Use Django REST Framework browsable API
- Postman collection available
- Automated test suite

---

## 📈 **Monitoring and Logging**

### **Error Logging:**
- Django error logging
- Server error logs
- Application performance monitoring
- User activity tracking

### **Log Files:**
- Application logs: `/var/log/smru/`
- Web server logs: `/var/log/apache2/`
- System logs: `journalctl -u smru-website`

---

## 🔄 **Maintenance**

### **Regular Maintenance:**
- Database backups
- Log file rotation
- Security updates
- Performance monitoring
- Content updates

### **Update Process:**
1. **Pull latest changes**
2. **Update dependencies**
3. **Run migrations**
4. **Test locally**
5. **Deploy to production**
6. **Monitor for issues**

---

## 📞 **Support and Documentation**

### **Documentation Files:**
- `README.md` - Main project documentation
- `COMPLETE_DEPLOYMENT_GUIDE.md` - Deployment guide
- `FILEZILLA_STEP_BY_STEP.md` - FileZilla instructions
- `HOSTING_PROVIDER_GUIDE.md` - Server setup guide
- `TROUBLESHOOTING_GUIDE.md` - Problem-solving guide

### **Support Channels:**
- GitHub Issues
- Documentation
- Email support
- Technical documentation

---

## 🎯 **Future Roadmap**

### **Planned Features:**
- Student portal
- Faculty management
- Online applications
- Event management
- News system
- Mobile application

### **Technical Improvements:**
- PostgreSQL migration
- Redis caching
- CDN integration
- CI/CD pipeline
- Performance monitoring

---

*This documentation provides a comprehensive overview of the SMRU Fullstack Application for St. Mary's Rehabilitation University. For specific implementation details, refer to the individual documentation files.*
