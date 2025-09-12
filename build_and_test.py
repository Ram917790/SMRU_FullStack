#!/usr/bin/env python3
"""
Build and test script for SMRU fullstack application.
This script helps build the frontend and test the SPA routing fix.
"""

import os
import subprocess
import sys
from pathlib import Path

def run_command(command, cwd=None, description=""):
    """Run a command and return success status."""
    print(f"\n🔄 {description}")
    print(f"Running: {command}")
    if cwd:
        print(f"Working directory: {cwd}")
    
    try:
        result = subprocess.run(
            command, 
            shell=True, 
            cwd=cwd, 
            check=True, 
            capture_output=True, 
            text=True
        )
        print(f"✅ Success: {description}")
        if result.stdout:
            print("Output:", result.stdout)
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Error: {description}")
        print(f"Command failed with return code {e.returncode}")
        if e.stdout:
            print("Output:", e.stdout)
        if e.stderr:
            print("Error:", e.stderr)
        return False

def main():
    """Main build and test function."""
    print("🚀 SMRU Fullstack Application - Build and Test Script")
    print("=" * 60)
    
    # Get project root
    project_root = Path(__file__).parent
    frontend_dir = project_root / "frontend" / "my-app"
    backend_dir = project_root / "backend"
    
    # Check if directories exist
    if not frontend_dir.exists():
        print(f"❌ Frontend directory not found: {frontend_dir}")
        return False
    
    if not backend_dir.exists():
        print(f"❌ Backend directory not found: {backend_dir}")
        return False
    
    # Step 1: Install frontend dependencies
    if not run_command("npm install", cwd=frontend_dir, description="Installing frontend dependencies"):
        print("❌ Failed to install frontend dependencies")
        return False
    
    # Step 2: Build frontend
    if not run_command("npm run build", cwd=frontend_dir, description="Building frontend application"):
        print("❌ Failed to build frontend")
        return False
    
    # Step 3: Check if build output exists
    dist_dir = frontend_dir / "dist"
    index_file = dist_dir / "index.html"
    
    if not index_file.exists():
        print(f"❌ Build output not found: {index_file}")
        return False
    
    print(f"✅ Frontend built successfully!")
    print(f"📁 Build output: {dist_dir}")
    
    # Step 4: Install backend dependencies
    if not run_command("pip install -r requirements.txt", cwd=backend_dir, description="Installing backend dependencies"):
        print("❌ Failed to install backend dependencies")
        return False
    
    # Step 5: Run Django migrations
    if not run_command("python manage.py migrate", cwd=backend_dir, description="Running Django migrations"):
        print("❌ Failed to run migrations")
        return False
    
    print("\n🎉 Build completed successfully!")
    print("\n📋 Next steps:")
    print("1. Start the Django backend:")
    print(f"   cd {backend_dir}")
    print("   python manage.py runserver")
    print("\n2. Test the SPA routing:")
    print("   - Visit http://127.0.0.1:8000/")
    print("   - Navigate to /about, /schools, etc.")
    print("   - Refresh the page - it should work now!")
    print("\n3. For development, you can also run:")
    print(f"   cd {frontend_dir}")
    print("   npm run dev")
    
    return True

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)

