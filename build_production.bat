@echo off
echo 🚀 Building Fullstack Application for Production...

REM Build Frontend
echo 📦 Building React Frontend...
cd frontend\my-app
call npm install
call npm run build
echo ✅ Frontend build completed

REM Prepare Backend
echo 🐍 Preparing Django Backend...
cd ..\..\backend

REM Create production environment file if it doesn't exist
if not exist .env (
    echo ⚠️  Creating .env file from template...
    copy env_example.txt .env
    echo 📝 Please update .env file with your production settings
)

REM Collect static files
python manage.py collectstatic --noinput --settings=smru.settings_production
echo ✅ Static files collected

REM Run migrations
python manage.py migrate --settings=smru.settings_production
echo ✅ Database migrations completed

echo 🎉 Production build completed successfully!
echo 📁 Frontend build: frontend\my-app\dist\
echo 📁 Backend ready: backend\
pause

