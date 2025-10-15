# 🚀 Backend Integration Guide

## 🎯 Complete Backend Setup for Sabi Car Rental

This guide will help you set up the complete backend API server and integrate it with your frontend application.

## 📋 Prerequisites

Before starting, ensure you have:
- **PostgreSQL 14+** installed and running
- **Node.js 18+** installed
- **npm** or **yarn** package manager

## 🗄️ Database Setup

### 1. Install PostgreSQL (if not already installed)

**Windows:**
```bash
# Download from https://www.postgresql.org/download/windows/
# Or use chocolatey
choco install postgresql
```

**Mac:**
```bash
brew install postgresql
brew services start postgresql
```

**Linux (Ubuntu):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### 2. Create Database

```bash
# Connect to PostgreSQL as superuser
psql -U postgres

# Create the database
CREATE DATABASE sabi_car_rental;

# Create a dedicated user (optional but recommended)
CREATE USER sabi_user WITH PASSWORD 'your_secure_password_here';
GRANT ALL PRIVILEGES ON DATABASE sabi_car_rental TO sabi_user;

# Exit psql
\q
```

## 🔧 Backend Configuration

### 1. Install Backend Dependencies

You need to navigate to the backend folder and install packages. Since you encountered a PowerShell execution policy issue, let's resolve that first:

```powershell
# Option 1: Set execution policy for current session
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process

# Option 2: Set execution policy permanently (requires admin)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Then install dependencies
cd backend
npm install
```

Alternatively, use Command Prompt instead of PowerShell:

```cmd
cd backend
npm install
```

### 2. Configure Environment Variables

Create the `.env` file in the backend directory:

```bash
# Copy example environment file
cd backend
copy .env.example .env
```

Edit the `.env` file with your configuration:

```env
# Database Configuration
DATABASE_URL=postgresql://sabi_user:your_secure_password_here@localhost:5432/sabi_car_rental
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sabi_car_rental
DB_USER=sabi_user
DB_PASSWORD=your_secure_password_here

# Server Configuration
PORT=3001
NODE_ENV=development

# JWT Configuration - GENERATE A SECURE SECRET!
JWT_SECRET=your-super-secure-jwt-secret-key-minimum-32-characters-long
JWT_EXPIRES_IN=7d

# CORS Configuration
FRONTEND_URL=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_DIR=uploads

# Security
BCRYPT_ROUNDS=12
```

### 3. Generate Secure JWT Secret

Generate a secure JWT secret key:

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Using PowerShell
[System.Web.Security.Membership]::GeneratePassword(32, 0)

# Using online tool (use only for development)
# Visit: https://generate-secret.vercel.app/32
```

## 🚀 Database Initialization

### 1. Create Database Tables

```bash
cd backend
npm run db:setup
```

This will create all the necessary tables:
- `users` (with roles: admin, owner, user)  
- `cars` (with status tracking)
- `bookings` (with status workflow)
- Indexes for performance optimization
- Triggers for automatic updates

### 2. Seed Database with Sample Data

```bash
npm run db:seed
```

This creates test accounts:
- **Admin**: `admin@sabi.com` / `admin123`
- **Owner**: `owner@sabi.com` / `owner123` 
- **User**: `user@sabi.com` / `user123`

Plus sample cars and bookings for testing.

## 🏃‍♂️ Running the Application

### 1. Start Backend Server

```bash
cd backend
npm run dev
```

You should see:
```
🚀 Sabi Car Rental API Server Started Successfully!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 Server running on port: 3001
🌍 Environment: development
🔗 API Base URL: http://localhost:3001/api
❤️  Health Check: http://localhost:3001/health
```

### 2. Test Backend Health

Open a new terminal and test:

```bash
# Health check
curl http://localhost:3001/health

# API info
curl http://localhost:3001/api
```

### 3. Start Frontend

In a new terminal:

```bash
# From the project root (not backend folder)
npm run dev
```

## 🔐 Test Authentication

### 1. Test Login API Directly

```bash
# Test admin login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@sabi.com", "password": "admin123"}'
```

Expected response:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "uuid-here",
      "name": "Admin User",
      "email": "admin@sabi.com",
      "role": "admin"
    },
    "token": "jwt-token-here"
  }
}
```

### 2. Test Frontend Integration

1. Open http://localhost:5173 in your browser
2. Navigate to login page
3. Use test credentials:
   - **Admin**: `admin@sabi.com` / `admin123`
   - **Owner**: `owner@sabi.com` / `owner123`
   - **User**: `user@sabi.com` / `user123`

## 🐛 Troubleshooting

### Common Issues

**1. Database Connection Failed**
```
Error: Database connection failed
```
**Solution**: 
- Ensure PostgreSQL is running: `pg_ctl status`
- Check database credentials in `.env`
- Verify database exists: `psql -U postgres -c "\l"`

**2. Port Already in Use**
```
Error: listen EADDRINUSE: address already in use :::3001
```
**Solution**:
- Change PORT in `.env` file to 3002 or another port
- Or stop the process using port 3001

**3. JWT Secret Error**
```
Error: JWT secret is not defined
```
**Solution**: Set `JWT_SECRET` in your `.env` file

**4. PowerShell Execution Policy**
```
cannot be loaded because running scripts is disabled on this system
```
**Solution**:
```powershell
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
```

**5. Frontend Can't Connect to Backend**
- Ensure backend is running on http://localhost:3001
- Check that `.env` in frontend has: `VITE_API_BASE_URL=http://localhost:3001/api`
- Verify CORS settings in backend

### Debug Mode

Enable verbose logging:
```env
NODE_ENV=development
```

## 📊 API Endpoints

Once the backend is running, these endpoints will be available:

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration  
- `GET /api/auth/me` - Get current user

### Users (Admin only)
- `GET /api/users` - List all users
- `GET /api/users/:id` - Get user by ID
- `PATCH /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Cars
- `GET /api/cars` - List cars (with filters)
- `POST /api/cars` - Create car (owner/admin)
- `GET /api/cars/:id` - Get car details
- `PUT /api/cars/:id` - Update car
- `DELETE /api/cars/:id` - Delete car

### Bookings
- `GET /api/bookings` - List bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/:id` - Get booking details
- `PATCH /api/bookings/:id/status` - Update booking status

### Dashboard
- `GET /api/dashboard/stats` - Get statistics
- `GET /api/dashboard/reports` - Get reports (admin)

## 🎉 Success Indicators

✅ **Backend is working correctly when:**
- Health check returns status 200
- Login API returns JWT token
- Frontend can authenticate users
- Role-based dashboards load correctly
- Real data displays instead of mock data

✅ **Frontend integration is working when:**
- Login redirects to appropriate dashboard
- User roles are enforced correctly  
- API calls show real backend data
- Authentication persists on page refresh

## 🚀 Next Steps

Once backend integration is complete:

1. **Test all dashboard functions** with real data
2. **Implement remaining API endpoints** (car service, booking service, etc.)
3. **Add file upload functionality** for car images
4. **Set up production deployment** 
5. **Add comprehensive error handling**
6. **Implement advanced features** (notifications, real-time updates)

## 📞 Need Help?

If you encounter issues:

1. Check the troubleshooting section above
2. Verify all prerequisites are met
3. Ensure environment variables are properly configured
4. Check console logs for specific error messages

The backend integration transforms your static car rental app into a dynamic, database-driven platform ready for real-world use! 🚗✨
