# 📁 FileZilla Step-by-Step Visual Guide
## Complete Walkthrough for St. Mary's Rehabilitation University Website

---

## 🖼️ **FileZilla Interface Explained**

When you open FileZilla, you'll see **4 main areas**:

```
┌─────────────────┬─────────────────┐
│   LOCAL FILES   │  SERVER FILES   │
│   (Your PC)     │  (Your Website) │
│                 │                 │
│  📁 Documents   │  📁 public_html │
│  📁 Desktop     │  📁 logs        │
│  📁 Projects    │  📁 tmp         │
└─────────────────┴─────────────────┘
┌─────────────────┬─────────────────┐
│  UPLOAD QUEUE   │  SERVER QUEUE   │
│  (Files to      │  (Server        │
│   upload)       │   operations)   │
└─────────────────┴─────────────────┘
```

---

## 🔧 **Step 1: Setting Up Your Connection**

### **1.1 Open Site Manager**
1. Click the **folder icon** in the toolbar (Site Manager)
2. You'll see a popup window

### **1.2 Create New Site**
1. Click **"New Site"** button
2. Give it a name: `SMRU Website`
3. Fill in the details:

```
┌─────────────────────────────────────┐
│ Site Manager                        │
├─────────────────────────────────────┤
│ New Site: SMRU Website              │
│                                     │
│ General Tab:                        │
│ Host: smru.in (or your server IP)   │
│ Protocol: FTP - File Transfer       │
│ Port: 21                            │
│ Encryption: Use explicit FTP over   │
│ Logon Type: Normal                  │
│ User: your_username                 │
│ Password: your_password             │
│                                     │
│ [Connect] [Cancel]                  │
└─────────────────────────────────────┘
```

### **1.3 Test Connection**
1. Click **"Connect"**
2. Watch the **status messages** at the top
3. **Success looks like:**
   ```
   Status: Connected to smru.in
   Response: 220 Welcome to FTP server
   Command: USER your_username
   Response: 331 Password required
   Command: PASS ********
   Response: 230 Login successful
   Status: Directory listing successful
   ```

---

## 📂 **Step 2: Understanding File Structure**

### **2.1 Your Local Project Structure**
```
S:\Projects\scope\V1 - Copy\my_fullstack_app\
├── backend\                    ← Upload this folder
│   ├── cms\
│   ├── smru\
│   ├── manage.py
│   ├── requirements_production.txt
│   ├── .env                    ← Create on server
│   ├── venv\                   ← DON'T upload
│   └── __pycache__\            ← DON'T upload
├── frontend\
│   └── my-app\
│       └── dist\               ← Upload contents only
│           ├── index.html
│           ├── assets\
│           └── vite.svg
└── build_production.bat
```

### **2.2 Server Structure (After Upload)**
```
/your-web-directory/smru-website/
├── backend\                    ← Django application
│   ├── cms\
│   ├── smru\
│   ├── manage.py
│   ├── requirements_production.txt
│   └── .env                    ← Created on server
└── frontend\                   ← React website
    ├── index.html
    ├── assets\
    └── vite.svg
```

---

## 📤 **Step 3: Uploading Backend Files**

### **3.1 Navigate to Backend Folder**
1. In **left panel** (Local), navigate to your project
2. **Double-click** on `backend` folder
3. You should see:
   ```
   📁 cms
   📁 smru
   📁 venv                    ← Skip this
   📁 __pycache__             ← Skip this
   📄 manage.py
   📄 requirements_production.txt
   📄 .env                    ← Skip this (create on server)
   ```

### **3.2 Select Files to Upload**
1. **Hold Ctrl** and click on each file/folder you want
2. **Select these:**
   - ✅ `cms` folder
   - ✅ `smru` folder
   - ✅ `manage.py`
   - ✅ `requirements_production.txt`
   - ✅ Any other `.py` files
3. **DON'T select:**
   - ❌ `venv` folder
   - ❌ `__pycache__` folder
   - ❌ `.env` file

### **3.3 Upload to Server**
1. In **right panel** (Server), navigate to your web directory
2. **Right-click** → **"Create directory"** → Name: `smru-website`
3. **Double-click** to enter the folder
4. **Drag and drop** selected files from left to right panel
5. **Watch the upload queue** at the bottom

### **3.4 Upload Progress**
You'll see progress like this:
```
┌─────────────────────────────────────┐
│ Queued files: 15                    │
│ Successful transfers: 12            │
│ Failed transfers: 0                 │
│ Currently transferring: manage.py   │
│ 45% complete                        │
└─────────────────────────────────────┘
```

---

## 📤 **Step 4: Uploading Frontend Files**

### **4.1 Navigate to Frontend Build**
1. In **left panel**, navigate to: `frontend/my-app/dist/`
2. You should see:
   ```
   📄 index.html
   📁 assets
   │   ├── index-ABC123.js
   │   ├── index-DEF456.css
   │   └── images...
   📄 vite.svg
   ```

### **4.2 Select All Frontend Files**
1. **Press Ctrl+A** to select all files
2. **Drag and drop** to server
3. **Create `frontend` folder** on server if it doesn't exist

### **4.3 Verify Upload**
Your server should now look like:
```
/your-web-directory/smru-website/
├── backend\
│   ├── cms\
│   ├── smru\
│   ├── manage.py
│   └── requirements_production.txt
└── frontend\
    ├── index.html
    ├── assets\
    └── vite.svg
```

---

## ⚙️ **Step 5: Creating Environment File**

### **5.1 Create .env File on Server**
1. **Right-click** in server panel
2. Select **"Create file"**
3. Name it: `.env`
4. **Double-click** the file to edit

### **5.2 Add Environment Variables**
Copy and paste this content:
```env
SECRET_KEY=your-super-secret-key-change-this
DEBUG=False
ALLOWED_HOSTS=smru.in,www.smru.in,smru.edu.in,www.smru.edu.in
CORS_ALLOWED_ORIGINS=https://smru.in,https://www.smru.in,https://smru.edu.in,https://www.smru.edu.in
```

### **5.3 Save the File**
1. **Press Ctrl+S** to save
2. **Close the editor**
3. The file should appear in your server panel

---

## 🔐 **Step 6: Setting File Permissions**

### **6.1 Set Backend Folder Permissions**
1. **Right-click** on `backend` folder in server panel
2. Select **"File permissions"**
3. Set permissions to: `755`
4. Check **"Recurse into subdirectories"**
5. Click **"OK"**

### **6.2 Set Frontend Folder Permissions**
1. **Right-click** on `frontend` folder
2. Set permissions to: `755`
3. **Apply to subdirectories**

---

## ✅ **Step 7: Verifying Upload**

### **7.1 Check File Count**
Your server should have approximately:
- **Backend:** 20-30 files
- **Frontend:** 5-10 files
- **Total:** 25-40 files

### **7.2 Check File Sizes**
- **Backend files:** Should be several KB each
- **Frontend files:** Should be larger (especially JS/CSS files)

### **7.3 Common Upload Issues**
**If files are missing:**
- ✅ Check upload queue for failed transfers
- ✅ Re-upload missing files
- ✅ Verify file permissions

**If upload is slow:**
- ✅ This is normal for large files
- ✅ Don't interrupt the upload
- ✅ Check your internet connection

---

## 🚨 **Important Notes**

### **What NOT to Upload:**
- ❌ `venv/` folder (virtual environment)
- ❌ `__pycache__/` folder (Python cache)
- ❌ `.git/` folder (version control)
- ❌ `node_modules/` folder (if present)
- ❌ Local `.env` file (create new one on server)

### **What TO Upload:**
- ✅ All `.py` files
- ✅ All `.txt` files
- ✅ All folders except excluded ones
- ✅ Built frontend files from `dist/` folder

### **File Size Guidelines:**
- **Small files** (< 1MB): Upload quickly
- **Medium files** (1-10MB): May take a few minutes
- **Large files** (> 10MB): May take longer, be patient

---

## 🎯 **Quick Reference Commands**

### **FileZilla Shortcuts:**
- **Ctrl+A:** Select all files
- **Ctrl+C:** Copy files
- **Ctrl+V:** Paste files
- **F5:** Refresh directory listing
- **Delete:** Delete selected files
- **F2:** Rename file/folder

### **Navigation Tips:**
- **Double-click** folders to enter them
- **Right-click** for context menu
- **Drag and drop** to move files
- **Use breadcrumbs** to navigate back

---

## 📞 **Getting Help**

### **If Upload Fails:**
1. **Check your internet connection**
2. **Verify FTP credentials**
3. **Contact your hosting provider**
4. **Try uploading smaller batches**

### **If Files Don't Appear:**
1. **Refresh the server directory** (F5)
2. **Check if you're in the right folder**
3. **Verify file permissions**
4. **Contact hosting support**

---

*This guide covers the FileZilla upload process. After uploading, you'll need to configure your server (contact your hosting provider for this step).*

