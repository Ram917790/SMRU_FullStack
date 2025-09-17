# 🏛️ SMRU Fullstack Application
## Sri Manakula Vinayagar Medical University - Official Website

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/Ram917790/SMRU_FullStack.git)
[![Django](https://img.shields.io/badge/Django-5.0.6-green)](https://djangoproject.com/)
[![React](https://img.shields.io/badge/React-18.3.1-blue)](https://reactjs.org/)

---

## 📋 **Overview**

The SMRU Fullstack Application is a comprehensive web platform for Sri Manakula Vinayagar Medical University, featuring a modern React frontend and a robust Django backend.

### **Live Websites:**
- **Primary Domain:** [smru.in](https://smru.in)
- **Alternative Domain:** [smru.edu.in](https://smru.edu.in)

---

## ✨ **Features**

### **Frontend:**
- 🎨 Modern UI/UX with Tailwind CSS
- 📱 Mobile responsive design
- ⚡ Fast loading with Vite
- 🎭 Smooth animations with Framer Motion
- 🧭 React Router navigation

### **Backend:**
- 🔐 Django Admin for content management
- 📊 RESTful API with Django REST Framework
- 🗄️ Database management with migrations
- 🔒 Security with CORS and CSRF protection
- 📁 Media file management

---

## 🛠️ **Technology Stack**

### **Frontend:**
- React 18.3.1
- Vite 7.1.1
- Tailwind CSS 3.4.17
- Framer Motion 12.23.12
- React Router DOM 7.8.0

### **Backend:**
- Django 5.0.6
- Django REST Framework 3.15.1
- Django CORS Headers 4.4.0
- Gunicorn 21.2.0
- WhiteNoise 6.6.0

---

## 🚀 **Quick Start**

### **Prerequisites:**
- Python 3.8+
- Node.js 16+
- Git

### **Installation:**
```bash
# Clone repository
git clone https://github.com/Ram917790/SMRU_FullStack.git
cd SMRU_FullStack

# Backend setup
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

# Frontend setup
cd frontend/my-app
npm install
npm run dev
```

### **Access Points:**
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8000/api/
- **Admin Panel:** http://localhost:8000/admin/

---

## 🌐 **Production Deployment**

### **Quick Deployment:**
1. **Build application:**
   ```bash
   build_production.bat  # Windows
   ./build_production.sh  # Linux/Mac
   ```

2. **Upload via FileZilla:**
   - Follow [Complete Deployment Guide](COMPLETE_DEPLOYMENT_GUIDE.md)
   - Use [FileZilla Step-by-Step Guide](FILEZILLA_STEP_BY_STEP.md)

3. **Configure server:**
   - Provide [Hosting Provider Guide](HOSTING_PROVIDER_GUIDE.md) to your hosting provider

### **Deployment Documentation:**
- 📖 [Complete Deployment Guide](COMPLETE_DEPLOYMENT_GUIDE.md)
- 📁 [FileZilla Step-by-Step](FILEZILLA_STEP_BY_STEP.md)
- 🏢 [Hosting Provider Guide](HOSTING_PROVIDER_GUIDE.md)
- 🔧 [Troubleshooting Guide](TROUBLESHOOTING_GUIDE.md)

---

## 📚 **API Documentation**

### **Base URL:**
- **Development:** `http://localhost:8000/api/`
- **Production:** `https://smru.in/api/`

### **Endpoints:**
- `GET /api/leaders/` - Get all leaders
- `GET /api/departments/` - Get all departments
- `GET /api/jobs/` - Get all job postings
- **Admin Panel:** `/api/admin/`

---

## 📁 **Project Structure**

```
SMRU_FullStack/
├── backend/                    # Django Backend
│   ├── cms/                   # Content Management
│   ├── smru/                  # Django settings
│   └── requirements.txt       # Dependencies
├── frontend/my-app/           # React Frontend
│   ├── src/                   # Source code
│   ├── package.json           # Node dependencies
│   └── dist/                  # Built application
├── docs/                      # Documentation
└── build_production.bat       # Build scripts
```

---

## 🔧 **Configuration**

### **Environment Variables:**
Create `.env` file in backend directory:
```env
SECRET_KEY=your-secret-key-here
DEBUG=False
ALLOWED_HOSTS=smru.in,www.smru.in,smru.edu.in,www.smru.edu.in
CORS_ALLOWED_ORIGINS=https://smru.in,https://www.smru.in,https://smru.edu.in,https://www.smru.edu.in
```

---

## 📞 **Support**

### **Documentation:**
- 📖 [Complete Deployment Guide](COMPLETE_DEPLOYMENT_GUIDE.md)
- 🔧 [Troubleshooting Guide](TROUBLESHOOTING_GUIDE.md)
- 📁 [FileZilla Guide](FILEZILLA_STEP_BY_STEP.md)

### **Contact:**
- **Repository:** [https://github.com/Ram917790/SMRU_FullStack.git](https://github.com/Ram917790/SMRU_FullStack.git)
- **Website:** [https://smru.in](https://smru.in)

---

## 📄 **License**

This project is licensed under the MIT License.

---

*Last updated: January 2025*
*Version: 1.0.0*
*For SMRU - Sri Manakula Vinayagar Medical University*