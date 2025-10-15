# 🚗 Sabi Car Rental - Backend API

A robust, scalable backend API for the Sabi Car Rental platform built with Node.js, Express, TypeScript, and PostgreSQL.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Database Setup](#-database-setup)
- [Environment Configuration](#-environment-configuration)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Development](#-development)
- [Testing](#-testing)
- [Deployment](#-deployment)

## 🚀 Features

- **🔐 JWT Authentication & Authorization**: Secure user authentication with role-based access control
- **👥 Role-Based System**: Support for `user`, `owner`, and `admin` roles
- **🚗 Car Management**: Complete CRUD operations for car listings
- **📅 Booking System**: Full booking lifecycle management with status tracking  
- **📊 Analytics Dashboard**: Real-time statistics and reporting
- **🔍 Advanced Filtering**: Sophisticated search and filter capabilities
- **📱 API-First Design**: RESTful API with comprehensive error handling
- **🛡️ Security**: Helmet, CORS, rate limiting, and input validation
- **📈 Performance**: Database indexing, query optimization, and caching
- **🔄 Real-Time Updates**: WebSocket support for live updates (planned)

## 🛠️ Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL 14+
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Joi
- **Security**: Helmet, bcryptjs
- **Documentation**: Swagger/OpenAPI (planned)
- **Testing**: Jest (planned)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.0.0 or higher
- **PostgreSQL** 14.0 or higher
- **npm** or **yarn** package manager
- **Git** for version control

## 🚀 Installation

### 1. Clone and Navigate

```bash
# You should already be in the project root
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

```bash
# Copy example environment file
cp .env.example .env
```

Edit the `.env` file with your configuration:

```bash
# Open .env file and configure
notepad .env  # Windows
# or
nano .env     # Linux/Mac
```

## 🗄️ Database Setup

### 1. Create PostgreSQL Database

Connect to your PostgreSQL server and create a database:

```sql
-- Connect to PostgreSQL as superuser
psql -U postgres

-- Create database
CREATE DATABASE sabi_car_rental;

-- Create user (optional)
CREATE USER sabi_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE sabi_car_rental TO sabi_user;

-- Exit psql
\q
```

### 2. Configure Database Connection

Update your `.env` file with database credentials:

```env
DATABASE_URL=postgresql://sabi_user:your_secure_password@localhost:5432/sabi_car_rental
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sabi_car_rental
DB_USER=sabi_user
DB_PASSWORD=your_secure_password
```

### 3. Setup Database Tables

```bash
# Create all database tables and indexes
npm run db:setup
```

### 4. Seed Database (Optional)

```bash
# Add sample data for development
npm run db:seed
```

## ⚙️ Environment Configuration

Configure your `.env` file with the following variables:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/sabi_car_rental
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sabi_car_rental
DB_USER=postgres
DB_PASSWORD=your_password

# Server Configuration
PORT=3001
NODE_ENV=development

# JWT Configuration - CHANGE IN PRODUCTION!
JWT_SECRET=your-super-secure-jwt-secret-key-here-change-in-production
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

### 🔑 Security Notes

- **JWT_SECRET**: Use a strong, random secret key (32+ characters)
- **Database Password**: Use a strong password for your database user
- **Change default values** in production environment

## 🏃‍♂️ Running the Application

### Development Mode

```bash
# Start with hot reload
npm run dev
```

### Production Mode

```bash
# Build TypeScript
npm run build

# Start production server
npm start
```

### Health Check

After starting the server, verify it's running:

```bash
curl http://localhost:3001/health
```

## 📚 API Documentation

### Base URL
```
http://localhost:3001/api
```

### Authentication

All protected endpoints require a Bearer token:

```bash
Authorization: Bearer <your-jwt-token>
```

### Core Endpoints

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user profile
- `POST /api/auth/logout` - User logout

#### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user (admin only)

#### Cars
- `GET /api/cars` - Get all cars (with filters)
- `POST /api/cars` - Create new car (owner/admin)
- `GET /api/cars/:id` - Get car by ID
- `PUT /api/cars/:id` - Update car (owner/admin)
- `DELETE /api/cars/:id` - Delete car (owner/admin)

#### Bookings
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/:id` - Get booking by ID
- `PATCH /api/bookings/:id/status` - Update booking status

#### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/reports` - Get detailed reports (admin)

### Response Format

All API responses follow this structure:

```json
{
  "success": boolean,
  "message": string,
  "data": any,
  "pagination"?: {
    "page": number,
    "limit": number,
    "total": number,
    "total_pages": number
  }
}
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/           # Route controllers
│   ├── middleware/           # Express middleware
│   │   ├── auth.ts          # Authentication middleware
│   │   └── validation.ts    # Request validation
│   ├── models/              # Database models (future)
│   ├── routes/              # Express routes
│   ├── services/            # Business logic layer
│   │   ├── authService.ts   # Authentication logic
│   │   ├── userService.ts   # User operations
│   │   ├── carService.ts    # Car operations
│   │   └── bookingService.ts # Booking operations
│   ├── scripts/             # Database scripts
│   │   ├── setupDatabase.ts # Table creation
│   │   └── seedDatabase.ts  # Sample data
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts         # All type definitions
│   ├── utils/               # Utility functions
│   │   ├── auth.ts          # JWT utilities
│   │   └── database.ts      # Database connection
│   └── server.ts            # Express app configuration
├── .env.example             # Environment variables template
├── package.json             # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start with hot reload
npm run build        # Build TypeScript
npm start           # Start production server

# Database
npm run db:setup    # Create database tables
npm run db:seed     # Add sample data
npm run db:reset    # Reset database (drop & recreate)

# Testing (planned)
npm test           # Run tests
npm run test:watch # Run tests in watch mode
```

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Code linting (to be configured)
- **Prettier**: Code formatting (to be configured)

### Adding New Features

1. **Create Service**: Add business logic in `src/services/`
2. **Create Controller**: Add route handlers in `src/controllers/`
3. **Create Routes**: Define endpoints in `src/routes/`
4. **Add Types**: Define TypeScript types in `src/types/`
5. **Add Validation**: Create Joi schemas in `src/middleware/validation.ts`

## 🧪 Testing

### Unit Tests (Planned)

```bash
npm test
```

### Integration Tests (Planned)

```bash
npm run test:integration
```

### API Testing with cURL

```bash
# Health check
curl http://localhost:3001/health

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@sabi.com", "password": "admin123"}'

# Get cars (requires auth token)
curl -X GET http://localhost:3001/api/cars \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🚀 Deployment

### Environment Variables

Set these environment variables in production:

```env
NODE_ENV=production
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/sabi_car_rental
JWT_SECRET=your-very-secure-production-jwt-secret
FRONTEND_URL=https://yourdomain.com
```

### Database Migration

```bash
# Run database setup on production
npm run db:setup
```

### Process Management

Use PM2 for production process management:

```bash
npm install -g pm2
npm run build
pm2 start dist/server.js --name "sabi-api"
```

### Docker Deployment (Optional)

```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3001
CMD ["node", "dist/server.js"]
```

## 🔧 Troubleshooting

### Common Issues

#### Database Connection Error
```
Error: Database connection failed
```
**Solution**: Check your PostgreSQL server is running and credentials are correct in `.env`

#### JWT Secret Error  
```
Error: JWT secret is not defined
```
**Solution**: Set `JWT_SECRET` in your `.env` file

#### Port Already in Use
```
Error: Port 3001 is already in use
```
**Solution**: Change the `PORT` in your `.env` file or stop the process using the port

### Debug Mode

Enable detailed logging by setting:

```env
NODE_ENV=development
```

## 📞 Support

### Getting Help

- Check the [troubleshooting section](#-troubleshooting)
- Review the [API documentation](#-api-documentation)
- Ensure all [prerequisites](#-prerequisites) are met

### Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License.

---

**Happy Coding! 🚀**

Built with ❤️ for the Sabi Car Rental platform.
