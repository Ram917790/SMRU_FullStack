#!/bin/bash

echo "🚀 Building Fullstack Application for Production..."

# Build Frontend
echo "📦 Building React Frontend..."
cd frontend/my-app
npm install
npm run build
echo "✅ Frontend build completed"

# Prepare Backend
echo "🐍 Preparing Django Backend..."
cd ../../backend

# Create production environment file if it doesn't exist
if [ ! -f .env ]; then
    echo "⚠️  Creating .env file from template..."
    cp env_example.txt .env
    echo "📝 Please update .env file with your production settings"
fi

# Collect static files
python manage.py collectstatic --noinput --settings=smru.settings_production
echo "✅ Static files collected"

# Run migrations
python manage.py migrate --settings=smru.settings_production
echo "✅ Database migrations completed"

echo "🎉 Production build completed successfully!"
echo "📁 Frontend build: frontend/my-app/dist/"
echo "📁 Backend ready: backend/"

