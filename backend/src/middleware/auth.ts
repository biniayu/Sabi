import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest, UserRole, AppError } from '../types';
import { AuthUtils } from '../utils/auth';

// Basic authentication middleware
export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    const token = AuthUtils.extractTokenFromHeader(authHeader);

    if (!token) {
      throw new AppError('Access token required', 401);
    }

    const payload = AuthUtils.verifyToken(token);
    req.user = payload;
    
    next();
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Authentication failed'
    });
  }
};

// Role-based authorization middleware
export const authorize = (...roles: UserRole[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions'
      });
    }

    next();
  };
};

// Admin only middleware
export const adminOnly = authorize('admin');

// Owner or Admin middleware
export const ownerOrAdmin = authorize('owner', 'admin');

// Resource ownership check middleware
export const checkResourceOwnership = (resourceKey: string = 'id') => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    // Admin can access any resource
    if (req.user.role === 'admin') {
      return next();
    }

    const resourceUserId = req.params[resourceKey] || req.body.user_id;
    
    if (req.user.userId !== resourceUserId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only access your own resources.'
      });
    }

    next();
  };
};

// Car ownership check middleware
export const checkCarOwnership = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    // Admin can access any car
    if (req.user.role === 'admin') {
      return next();
    }

    const carId = req.params.id || req.params.carId;
    
    if (!carId) {
      return res.status(400).json({
        success: false,
        message: 'Car ID required'
      });
    }

    // This would typically check the database
    // For now, we'll add the car ownership check in the controller
    // The actual implementation would be:
    // const car = await CarService.getById(carId);
    // if (car.owner_id !== req.user.userId) { ... }
    
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error checking car ownership'
    });
  }
};

// Optional authentication (for public endpoints that benefit from user context)
export const optionalAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    const token = AuthUtils.extractTokenFromHeader(authHeader);

    if (token) {
      try {
        const payload = AuthUtils.verifyToken(token);
        req.user = payload;
      } catch (error) {
        // Ignore token errors for optional auth
        console.log('Optional auth failed:', error);
      }
    }
    
    next();
  } catch (error) {
    // Continue even if optional auth fails
    next();
  }
};

export default {
  authenticate,
  authorize,
  adminOnly,
  ownerOrAdmin,
  checkResourceOwnership,
  checkCarOwnership,
  optionalAuth
};
