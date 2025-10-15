import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { db } from './utils/database';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Trust proxy (important for rate limiting behind reverse proxy)
app.set('trust proxy', 1);

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-requested-with']
};
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression middleware
app.use(compression());

// Logging middleware
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    const dbHealth = await db.isHealthy();
    const status = dbHealth ? 'healthy' : 'unhealthy';
    const httpCode = dbHealth ? 200 : 503;

    res.status(httpCode).json({
      success: dbHealth,
      status,
      timestamp: new Date().toISOString(),
      service: 'Sabi Car Rental API',
      version: '1.0.0',
      environment: NODE_ENV,
      database: dbHealth ? 'connected' : 'disconnected'
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      service: 'Sabi Car Rental API',
      error: 'Health check failed'
    });
  }
});

// API Routes (we'll add these in the next phase)
app.use('/api/auth', (req, res) => {
  res.json({ message: 'Auth routes will be implemented next' });
});

app.use('/api/users', (req, res) => {
  res.json({ message: 'User routes will be implemented next' });
});

app.use('/api/cars', (req, res) => {
  res.json({ message: 'Car routes will be implemented next' });
});

app.use('/api/bookings', (req, res) => {
  res.json({ message: 'Booking routes will be implemented next' });
});

app.use('/api/dashboard', (req, res) => {
  res.json({ message: 'Dashboard routes will be implemented next' });
});

// Default API route
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'Sabi Car Rental API',
    version: '1.0.0',
    environment: NODE_ENV,
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/health',
      auth: '/api/auth',
      users: '/api/users',
      cars: '/api/cars',
      bookings: '/api/bookings',
      dashboard: '/api/dashboard'
    }
  });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
    requested_url: req.originalUrl,
    method: req.method
  });
});

// Global error handler
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Global error handler:', error);

  // Handle different types of errors
  if (error.statusCode) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message || 'An error occurred',
      ...(NODE_ENV === 'development' && { stack: error.stack })
    });
  }

  // Handle validation errors
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: error.errors
    });
  }

  // Handle JWT errors
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }

  if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expired'
    });
  }

  // Handle database errors
  if (error.code === '23505') { // PostgreSQL unique violation
    return res.status(409).json({
      success: false,
      message: 'Duplicate entry found'
    });
  }

  if (error.code === '23503') { // PostgreSQL foreign key violation
    return res.status(400).json({
      success: false,
      message: 'Referenced resource not found'
    });
  }

  // Default error response
  res.status(500).json({
    success: false,
    message: NODE_ENV === 'development' ? error.message : 'Internal server error',
    ...(NODE_ENV === 'development' && { stack: error.stack })
  });
});

// Graceful shutdown handling
process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  
  try {
    await db.close();
    console.log('Database connections closed.');
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
});

process.on('SIGINT', async () => {
  console.log('SIGINT received. Shutting down gracefully...');
  
  try {
    await db.close();
    console.log('Database connections closed.');
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
});

// Start server
const startServer = async () => {
  try {
    // Test database connection
    const dbHealthy = await db.isHealthy();
    if (!dbHealthy) {
      console.error('❌ Database connection failed. Please check your database configuration.');
      process.exit(1);
    }

    console.log('✅ Database connection established successfully');

    app.listen(PORT, () => {
      console.log('\n🚀 Sabi Car Rental API Server Started Successfully!');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`📍 Server running on port: ${PORT}`);
      console.log(`🌍 Environment: ${NODE_ENV}`);
      console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
      console.log(`❤️  Health Check: http://localhost:${PORT}/health`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('\n📚 Available Endpoints:');
      console.log('  GET  /health           - Health check');
      console.log('  GET  /api              - API information');
      console.log('  *    /api/auth         - Authentication routes');
      console.log('  *    /api/users        - User management routes');
      console.log('  *    /api/cars         - Car management routes');
      console.log('  *    /api/bookings     - Booking management routes');
      console.log('  *    /api/dashboard    - Dashboard & analytics routes');
      console.log('\n💡 Next steps:');
      console.log('  1. Set up your PostgreSQL database');
      console.log('  2. Copy .env.example to .env and configure');
      console.log('  3. Run: npm run db:setup (to create tables)');
      console.log('  4. Run: npm run db:seed (to add sample data)');
      console.log('\n');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();

export default app;
