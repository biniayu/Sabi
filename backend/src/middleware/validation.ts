import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { AppError } from '../types';

// Validation middleware factory
export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const validationErrors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));

      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    req.body = value;
    next();
  };
};

// Query parameter validation
export const validateQuery = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.query, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const validationErrors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));

      return res.status(400).json({
        success: false,
        message: 'Query validation failed',
        errors: validationErrors
      });
    }

    req.query = value;
    next();
  };
};

// Parameters validation
export const validateParams = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.params, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const validationErrors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));

      return res.status(400).json({
        success: false,
        message: 'Parameter validation failed',
        errors: validationErrors
      });
    }

    req.params = value;
    next();
  };
};

// Common validation schemas
export const schemas = {
  // Authentication schemas
  login: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email address',
      'string.empty': 'Email is required',
      'any.required': 'Email is required'
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': 'Password must be at least 6 characters long',
      'string.empty': 'Password is required',
      'any.required': 'Password is required'
    })
  }),

  register: Joi.object({
    name: Joi.string().min(2).max(100).required().messages({
      'string.min': 'Name must be at least 2 characters long',
      'string.max': 'Name cannot exceed 100 characters',
      'string.empty': 'Name is required',
      'any.required': 'Name is required'
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email address',
      'string.empty': 'Email is required',
      'any.required': 'Email is required'
    }),
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/)
      .required()
      .messages({
        'string.min': 'Password must be at least 8 characters long',
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
        'string.empty': 'Password is required',
        'any.required': 'Password is required'
      }),
    role: Joi.string().valid('user', 'owner').default('user'),
    phone: Joi.string().pattern(/^\+?[\d\s-()]{10,15}$/).optional().messages({
      'string.pattern.base': 'Please provide a valid phone number'
    })
  }),

  // Car schemas
  createCar: Joi.object({
    name: Joi.string().min(2).max(200).required(),
    brand: Joi.string().min(2).max(50).required(),
    model: Joi.string().min(1).max(50).required(),
    year: Joi.number().integer().min(1900).max(new Date().getFullYear() + 1).required(),
    price: Joi.number().positive().required(),
    description: Joi.string().max(1000).optional(),
    features: Joi.array().items(Joi.string()).default([]),
    location: Joi.string().min(2).max(100).required()
  }),

  updateCar: Joi.object({
    name: Joi.string().min(2).max(200).optional(),
    brand: Joi.string().min(2).max(50).optional(),
    model: Joi.string().min(1).max(50).optional(),
    year: Joi.number().integer().min(1900).max(new Date().getFullYear() + 1).optional(),
    price: Joi.number().positive().optional(),
    description: Joi.string().max(1000).optional(),
    features: Joi.array().items(Joi.string()).optional(),
    location: Joi.string().min(2).max(100).optional(),
    status: Joi.string().valid('Available', 'Rented', 'Maintenance').optional()
  }),

  // Booking schemas
  createBooking: Joi.object({
    car_id: Joi.string().uuid().required(),
    start_date: Joi.date().min('now').required(),
    end_date: Joi.date().greater(Joi.ref('start_date')).required(),
    notes: Joi.string().max(500).optional()
  }),

  updateBookingStatus: Joi.object({
    status: Joi.string().valid('pending', 'confirmed', 'active', 'completed', 'cancelled').required()
  }),

  // User schemas
  updateUser: Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    phone: Joi.string().pattern(/^\+?[\d\s-()]{10,15}$/).optional(),
    address: Joi.string().max(200).optional()
  }),

  updateUserAdmin: Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    phone: Joi.string().pattern(/^\+?[\d\s-()]{10,15}$/).optional(),
    address: Joi.string().max(200).optional(),
    status: Joi.string().valid('active', 'suspended', 'pending').optional(),
    role: Joi.string().valid('user', 'admin', 'owner').optional()
  }),

  // Query schemas
  carFilters: Joi.object({
    brand: Joi.string().optional(),
    minPrice: Joi.number().min(0).optional(),
    maxPrice: Joi.number().min(0).optional(),
    status: Joi.string().valid('Available', 'Rented', 'Maintenance').optional(),
    location: Joi.string().optional(),
    owner_id: Joi.string().uuid().optional(),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    sort_by: Joi.string().valid('price', 'rating', 'created_at', 'name').default('created_at'),
    sort_order: Joi.string().valid('ASC', 'DESC').default('DESC')
  }),

  bookingFilters: Joi.object({
    status: Joi.string().valid('pending', 'confirmed', 'active', 'completed', 'cancelled').optional(),
    user_id: Joi.string().uuid().optional(),
    car_id: Joi.string().uuid().optional(),
    start_date: Joi.date().optional(),
    end_date: Joi.date().optional(),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    sort_by: Joi.string().valid('created_at', 'start_date', 'total_amount').default('created_at'),
    sort_order: Joi.string().valid('ASC', 'DESC').default('DESC')
  }),

  userFilters: Joi.object({
    role: Joi.string().valid('user', 'admin', 'owner').optional(),
    status: Joi.string().valid('active', 'suspended', 'pending').optional(),
    search: Joi.string().max(100).optional(),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    sort_by: Joi.string().valid('created_at', 'name', 'email').default('created_at'),
    sort_order: Joi.string().valid('ASC', 'DESC').default('DESC')
  }),

  // Parameter schemas
  uuidParam: Joi.object({
    id: Joi.string().uuid().required().messages({
      'string.guid': 'Invalid ID format',
      'any.required': 'ID is required'
    })
  })
};

export default {
  validate,
  validateQuery,
  validateParams,
  schemas
};
