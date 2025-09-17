# 🚀 Complete FileZilla Deployment Guide for Beginners
## Deploying Your SMRU Website (smru.in & smru.edu.in)

---

## 📋 **Table of Contents**
1. [What You Need Before Starting](#what-you-need)
2. [Understanding Your Project](#understanding-your-project)
3. [Step 1: Prepare Your Files Locally](#step-1-prepare-files)
4. [Step 2: Download and Setup FileZilla](#step-2-filezilla-setup)
5. [Step 3: Connect to Your Server](#step-3-connect-server)
6. [Step 4: Upload Your Files](#step-4-upload-files)
7. [Step 5: Configure Your Server](#step-5-server-config)
8. [Step 6: Test Your Website](#step-6-test-website)
9. [Troubleshooting Common Issues](#troubleshooting)
10. [Maintenance and Updates](#maintenance)

---

## 🎯 **What You Need Before Starting** {#what-you-need}

### **Required Information:**
- ✅ **Server IP Address** (e.g., 192.168.1.100 or yourdomain.com)
- ✅ **FTP Username** (provided by your hosting company)
- ✅ **FTP Password** (provided by your hosting company)
- ✅ **FTP Port** (usually 21 for FTP or 22 for SFTP)
- ✅ **Web Directory Path** (usually `/public_html/` or `/var/www/html/`)

### **Software You Need:**
- ✅ **FileZilla Client** (free FTP software)
- ✅ **Your completed project files**

### **Hosting Requirements:**
- ✅ **Python 3.8+** support
- ✅ **Node.js** support (for building)
- ✅ **FTP/SFTP access**
- ✅ **SSH access** (recommended)

---

## 🏗️ **Understanding Your Project** {#understanding-your-project}

Your project has **TWO PARTS**:

### **1. Backend (Django API)**
- **Location:** `backend/` folder
- **Purpose:** Handles data, database, admin panel
- **Files to upload:** Everything except `venv/`, `__pycache__/`, `.env`

### **2. Frontend (React Website)**
- **Location:** `frontend/my-app/dist/` folder (after building)
- **Purpose:** The website users see
- **Files to upload:** Only the `dist/` folder contents

---

## 📦 **Step 1: Prepare Your Files Locally** {#step-1-prepare-files}

### **1.1 Build Your Frontend**
1. Open **Command Prompt** (Windows) or **Terminal** (Mac/Linux)
2. Navigate to your project folder:
   ```bash
   cd "S:\Projects\scope\V1 - Copy\my_fullstack_app"
   ```
3. Run the build script:
   ```bash
   build_production.bat
   ```
   **Wait for it to complete!** You'll see messages like:
   ```
   ✅ Frontend build completed
   ✅ Static files collected
   ✅ Database migrations completed
   🎉 Production build completed successfully!
   ```

### **1.2 Check Your Build Results**
After building, you should have:
- ✅ `frontend/my-app/dist/` folder with built files
- ✅ `backend/staticfiles/` folder with collected static files

### **1.3 Create Environment File**
1. Copy `backend/env_example.txt` to `backend/.env`
2. Edit the `.env` file and replace with your actual values:
   ```env
   SECRET_KEY=your-actual-secret-key-here
   DEBUG=False
   ALLOWED_HOSTS=smru.in,www.smru.in,smru.edu.in,www.smru.edu.in
   CORS_ALLOWED_ORIGINS=https://smru.in,https://www.smru.in,https://smru.edu.in,https://www.smru.edu.in
   ```

---

## 📥 **Step 2: Download and Setup FileZilla** {#step-2-filezilla-setup}

### **2.1 Download FileZilla**
1. Go to: https://filezilla-project.org/
2. Click **"Download FileZilla Client"**
3. Download and install (it's free)

### **2.2 Open FileZilla**
1. Launch FileZilla
2. You'll see **4 panels**:
   - **Top left:** Your local computer files
   - **Top right:** Your server files
   - **Bottom left:** Local file queue
   - **Bottom right:** Server file queue

---

## 🔗 **Step 3: Connect to Your Server** {#step-3-connect-server}

### **3.1 Create New Connection**
1. Click the **"Site Manager"** icon (folder icon) in the toolbar
2. Click **"New Site"**
3. Fill in your server details:

   **General Tab:**
   - **Host:** Your server IP or domain (e.g., `smru.in` or `192.168.1.100`)
   - **Protocol:** Choose `FTP` or `SFTP` (ask your hosting provider)
   - **Port:** Usually `21` for FTP or `22` for SFTP
   - **Encryption:** Choose based on your hosting provider
   - **Logon Type:** Normal
   - **User:** Your FTP username
   - **Password:** Your FTP password

4. Click **"Connect"**

### **3.2 Successful Connection**
When connected, you'll see:
- ✅ **Status:** "Directory listing successful"
- ✅ **Right panel:** Shows your server files
- ✅ **Left panel:** Shows your local files

---

## 📤 **Step 4: Upload Your Files** {#step-4-upload-files}

### **4.1 Navigate to Your Web Directory**
1. In the **right panel** (server), navigate to your web directory:
   - Usually: `/public_html/` or `/var/www/html/` or `/htdocs/`
   - Ask your hosting provider for the correct path

### **4.2 Create Project Folders**
1. **Right-click** in the server panel
2. Select **"Create directory"**
3. Create folder: `smru-website`
4. **Double-click** to enter the folder

### **4.3 Upload Backend Files**
1. In the **left panel** (local), navigate to your `backend` folder
2. **Select all files and folders** in the backend folder (Ctrl+A)
3. **Exclude these folders** (uncheck them):
   - ❌ `venv/` (virtual environment)
   - ❌ `__pycache__/` (Python cache)
   - ❌ `.env` (we'll create this on server)
4. **Drag and drop** selected files to the server
5. **Wait for upload to complete**

### **4.4 Upload Frontend Files**
1. In the **left panel**, navigate to `frontend/my-app/dist/`
2. **Select all contents** of the dist folder
3. **Drag and drop** to the server
4. **Wait for upload to complete**

### **4.5 Upload Structure Should Look Like:**
```
/your-web-directory/smru-website/
├── backend/
│   ├── cms/
│   ├── smru/
│   ├── manage.py
│   ├── requirements_production.txt
│   └── (other backend files)
├── frontend/
│   ├── index.html
│   ├── assets/
│   └── (other frontend files)
└── .env (create this next)
```

---

## ⚙️ **Step 5: Configure Your Server** {#step-5-server-config}

### **5.1 Create Environment File on Server**
1. In FileZilla, **right-click** in the server panel
2. Select **"Create file"**
3. Name it: `.env`
4. **Right-click** the `.env` file → **"View/Edit"**
5. Add this content:
   ```env
   SECRET_KEY=your-actual-secret-key-here
   DEBUG=False
   ALLOWED_HOSTS=smru.in,www.smru.in,smru.edu.in,www.smru.edu.in
   CORS_ALLOWED_ORIGINS=https://smru.in,https://www.smru.in,https://smru.edu.in,https://www.smru.edu.in
   ```
6. **Save and close**

### **5.2 Set File Permissions**
1. **Right-click** on the `backend` folder
2. Select **"File permissions"**
3. Set to: `755` (or ask your hosting provider)
4. **Apply to all subdirectories**

### **5.3 Contact Your Hosting Provider**
You need to ask them to:
1. **Install Python dependencies:**
   ```bash
   pip install -r requirements_production.txt
   ```
2. **Run database migrations:**
   ```bash
   python manage.py migrate --settings=smru.settings_production
   ```
3. **Collect static files:**
   ```bash
   python manage.py collectstatic --noinput --settings=smru.settings_production
   ```
4. **Start the application:**
   ```bash
   gunicorn --bind 127.0.0.1:8000 smru.wsgi:application
   ```

---

## 🧪 **Step 6: Test Your Website** {#step-6-test-website}

### **6.1 Test Frontend**
1. Open your browser
2. Go to: `http://smru.in/`
3. You should see your website

### **6.2 Test API**
1. Go to: `http://smru.in/api/`
2. You should see API responses

### **6.3 Test Admin Panel**
1. Go to: `http://smru.in/api/admin/`
2. You should see Django admin login

---

## 🔧 **Troubleshooting Common Issues** {#troubleshooting}

### **❌ "Connection Failed" Error**
**Solutions:**
- ✅ Check your FTP credentials
- ✅ Verify server IP/domain
- ✅ Check if port 21/22 is blocked
- ✅ Contact hosting provider

### **❌ "Permission Denied" Error**
**Solutions:**
- ✅ Check file permissions (should be 755)
- ✅ Contact hosting provider for permission issues

### **❌ Website Shows "Internal Server Error"**
**Solutions:**
- ✅ Check if Python dependencies are installed
- ✅ Verify `.env` file exists and has correct content
- ✅ Check server error logs
- ✅ Contact hosting provider

### **❌ "Page Not Found" Error**
**Solutions:**
- ✅ Verify file upload completed successfully
- ✅ Check if files are in correct directory
- ✅ Contact hosting provider for web server configuration

### **❌ API Not Working**
**Solutions:**
- ✅ Check if Django application is running
- ✅ Verify CORS settings in `.env`
- ✅ Check if database migrations are completed

---

## 🔄 **Maintenance and Updates** {#maintenance}

### **Updating Your Website:**
1. **Make changes locally**
2. **Run build script again:**
   ```bash
   build_production.bat
   ```
3. **Upload new files via FileZilla**
4. **Test the updated website**

### **Regular Maintenance:**
- ✅ **Backup your database** regularly
- ✅ **Update dependencies** when needed
- ✅ **Monitor server logs** for errors
- ✅ **Keep your server software updated**

---

## 📞 **Getting Help**

### **If You're Stuck:**
1. **Check this guide** step by step
2. **Contact your hosting provider** for server issues
3. **Check FileZilla documentation** for FTP issues
4. **Ask in developer communities** for technical help

### **Important Contacts:**
- **Hosting Provider:** For server setup and configuration
- **Domain Registrar:** For domain settings (smru.in, smru.edu.in)
- **Technical Support:** For application-specific issues

---

## ✅ **Final Checklist**

Before going live, ensure:
- [ ] ✅ Files uploaded successfully via FileZilla
- [ ] ✅ `.env` file created on server with correct settings
- [ ] ✅ Python dependencies installed on server
- [ ] ✅ Database migrations completed
- [ ] ✅ Static files collected
- [ ] ✅ Django application running
- [ ] ✅ Website accessible at smru.in
- [ ] ✅ API endpoints working
- [ ] ✅ Admin panel accessible

---

## 🎉 **Congratulations!**

If you've followed this guide completely, your SMRU website should now be live at:
- **Main site:** http://smru.in/
- **Alternative domain:** http://smru.edu.in/
- **Admin panel:** http://smru.in/api/admin/

**Remember:** This is a learning process. Don't worry if you encounter issues - they're normal and solvable!

---

*Last updated: [Current Date]*
*For SMRU Website Deployment*

