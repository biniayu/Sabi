import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { AuthTokenPayload } from '../types';

const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS || '12');

export class AuthUtils {
  // JWT Token Operations
  static generateToken(payload: AuthTokenPayload): string {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
      issuer: 'sabi-car-rental',
      audience: 'sabi-users'
    });
  }

  static verifyToken(token: string): AuthTokenPayload {
    try {
      return jwt.verify(token, JWT_SECRET, {
        issuer: 'sabi-car-rental',
        audience: 'sabi-users'
      }) as AuthTokenPayload;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Token has expired');
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new Error('Invalid token');
      }
      throw new Error('Token verification failed');
    }
  }

  static extractTokenFromHeader(authHeader?: string): string | null {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    return authHeader.slice(7);
  }

  // Password Operations
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
  }

  static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  // Validation Utilities
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isValidPassword(password: string): boolean {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  static validatePasswordStrength(password: string): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }

    if (!/(?=.*[a-z])/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (!/(?=.*\d)/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    if (!/^[a-zA-Z\d@$!%*?&]+$/.test(password)) {
      errors.push('Password contains invalid characters');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Token Refresh (for future enhancement)
  static generateRefreshToken(userId: string): string {
    return jwt.sign(
      { userId, type: 'refresh' },
      JWT_SECRET,
      { expiresIn: '30d' }
    );
  }

  static verifyRefreshToken(token: string): { userId: string } {
    try {
      const payload = jwt.verify(token, JWT_SECRET) as any;
      if (payload.type !== 'refresh') {
        throw new Error('Invalid refresh token');
      }
      return { userId: payload.userId };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }
}

export default AuthUtils;
