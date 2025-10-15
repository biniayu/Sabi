import { AuthUtils } from '../utils/auth';
import { UserService } from './userService';
import { LoginCredentials, RegisterData, AppError, User, AuthTokenPayload } from '../types';

export class AuthService {
  // User login
  static async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    try {
      const { email, password } = credentials;

      // Find user with password
      const userWithPassword = await UserService.findByEmailWithPassword(email);
      
      if (!userWithPassword) {
        throw new AppError('Invalid email or password', 401);
      }

      // Check if user is suspended
      if (userWithPassword.status === 'suspended') {
        throw new AppError('Account has been suspended. Please contact support.', 403);
      }

      // Verify password
      const isPasswordValid = await AuthUtils.comparePassword(password, userWithPassword.password_hash);
      
      if (!isPasswordValid) {
        throw new AppError('Invalid email or password', 401);
      }

      // Create JWT token payload
      const tokenPayload: AuthTokenPayload = {
        userId: userWithPassword.id,
        email: userWithPassword.email,
        role: userWithPassword.role
      };

      // Generate JWT token
      const token = AuthUtils.generateToken(tokenPayload);

      // Return user data (without password)
      const { password_hash, ...user } = userWithPassword;

      return { user, token };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Login error:', error);
      throw new AppError('Login failed', 500);
    }
  }

  // User registration
  static async register(userData: RegisterData): Promise<{ user: User; token: string }> {
    try {
      // Validate password strength
      const passwordValidation = AuthUtils.validatePasswordStrength(userData.password);
      if (!passwordValidation.isValid) {
        throw new AppError(`Password validation failed: ${passwordValidation.errors.join(', ')}`, 400);
      }

      // Create user
      const user = await UserService.create(userData);

      // Create JWT token payload
      const tokenPayload: AuthTokenPayload = {
        userId: user.id,
        email: user.email,
        role: user.role
      };

      // Generate JWT token
      const token = AuthUtils.generateToken(tokenPayload);

      return { user, token };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Registration error:', error);
      throw new AppError('Registration failed', 500);
    }
  }

  // Get current user profile
  static async getCurrentUser(userId: string): Promise<User> {
    try {
      const user = await UserService.findById(userId);
      
      if (!user) {
        throw new AppError('User not found', 404);
      }

      if (user.status === 'suspended') {
        throw new AppError('Account has been suspended', 403);
      }

      return user;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Get current user error:', error);
      throw new AppError('Failed to get user profile', 500);
    }
  }

  // Refresh token (for future enhancement)
  static async refreshToken(refreshToken: string): Promise<{ token: string }> {
    try {
      // Verify refresh token
      const { userId } = AuthUtils.verifyRefreshToken(refreshToken);

      // Get current user
      const user = await UserService.findById(userId);
      
      if (!user || user.status === 'suspended') {
        throw new AppError('Invalid refresh token', 401);
      }

      // Create new JWT token payload
      const tokenPayload: AuthTokenPayload = {
        userId: user.id,
        email: user.email,
        role: user.role
      };

      // Generate new JWT token
      const token = AuthUtils.generateToken(tokenPayload);

      return { token };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Refresh token error:', error);
      throw new AppError('Token refresh failed', 401);
    }
  }

  // Change password
  static async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    try {
      // Validate new password strength
      const passwordValidation = AuthUtils.validatePasswordStrength(newPassword);
      if (!passwordValidation.isValid) {
        throw new AppError(`New password validation failed: ${passwordValidation.errors.join(', ')}`, 400);
      }

      await UserService.changePassword(userId, currentPassword, newPassword);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Change password error:', error);
      throw new AppError('Failed to change password', 500);
    }
  }

  // Forgot password (placeholder for email-based reset)
  static async forgotPassword(email: string): Promise<void> {
    try {
      const user = await UserService.findByEmail(email);
      
      if (!user) {
        // Don't reveal if email exists or not for security
        console.log(`Password reset requested for non-existent email: ${email}`);
        return;
      }

      // TODO: Implement password reset token generation and email sending
      console.log(`Password reset requested for user: ${user.id}`);
      
      // For now, just log the action
      // In production, you would:
      // 1. Generate a secure reset token
      // 2. Store it with expiration time
      // 3. Send email with reset link
    } catch (error) {
      console.error('Forgot password error:', error);
      throw new AppError('Failed to process password reset request', 500);
    }
  }

  // Reset password with token (placeholder)
  static async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      // Validate new password strength
      const passwordValidation = AuthUtils.validatePasswordStrength(newPassword);
      if (!passwordValidation.isValid) {
        throw new AppError(`Password validation failed: ${passwordValidation.errors.join(', ')}`, 400);
      }

      // TODO: Implement password reset with token
      // 1. Verify reset token
      // 2. Check if token is not expired
      // 3. Update user password
      // 4. Invalidate the reset token
      
      throw new AppError('Password reset with token not yet implemented', 501);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Reset password error:', error);
      throw new AppError('Failed to reset password', 500);
    }
  }

  // Verify email (placeholder)
  static async verifyEmail(token: string): Promise<void> {
    try {
      // TODO: Implement email verification
      // 1. Verify email verification token
      // 2. Update user status to active
      // 3. Invalidate the verification token
      
      throw new AppError('Email verification not yet implemented', 501);
    } catch (error) {
      console.error('Verify email error:', error);
      throw new AppError('Failed to verify email', 500);
    }
  }

  // Logout (mainly for cleanup, JWT tokens are stateless)
  static async logout(token: string): Promise<void> {
    try {
      // With JWT tokens, logout is typically handled client-side
      // Server-side logout would require token blacklisting
      // For now, just validate the token exists
      AuthUtils.verifyToken(token);
      
      // TODO: Implement token blacklisting if needed
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      throw new AppError('Logout failed', 500);
    }
  }

  // Validate token (for middleware)
  static async validateToken(token: string): Promise<AuthTokenPayload> {
    try {
      const payload = AuthUtils.verifyToken(token);
      
      // Optionally verify user still exists and is active
      const user = await UserService.findById(payload.userId);
      if (!user || user.status === 'suspended') {
        throw new AppError('Invalid token', 401);
      }

      return payload;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Token validation error:', error);
      throw new AppError('Invalid token', 401);
    }
  }
}

export default AuthService;
