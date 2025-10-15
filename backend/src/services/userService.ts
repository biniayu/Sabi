import { db } from '../utils/database';
import { AuthUtils } from '../utils/auth';
import { 
  User, 
  UserWithPassword, 
  RegisterData, 
  UpdateUserData,
  UserFilters,
  QueryOptions,
  PaginatedResponse,
  AppError,
  UserRole 
} from '../types';

export class UserService {
  // Create new user
  static async create(userData: RegisterData): Promise<User> {
    try {
      // Check if user already exists
      const existingUser = await this.findByEmail(userData.email);
      if (existingUser) {
        throw new AppError('User with this email already exists', 409);
      }

      // Hash password
      const passwordHash = await AuthUtils.hashPassword(userData.password);

      // Insert user into database
      const query = `
        INSERT INTO users (name, email, password_hash, role, phone, status)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, name, email, role, status, phone, address, avatar, created_at, updated_at
      `;

      const values = [
        userData.name,
        userData.email,
        passwordHash,
        userData.role || 'user',
        userData.phone || null,
        'active'
      ];

      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Error creating user:', error);
      throw new AppError('Failed to create user', 500);
    }
  }

  // Find user by email (including password for authentication)
  static async findByEmailWithPassword(email: string): Promise<UserWithPassword | null> {
    try {
      const query = `
        SELECT id, name, email, password_hash, role, status, phone, address, avatar, created_at, updated_at
        FROM users 
        WHERE email = $1 AND status != 'suspended'
      `;
      
      const result = await db.query(query, [email]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw new AppError('Database error', 500);
    }
  }

  // Find user by email (public data only)
  static async findByEmail(email: string): Promise<User | null> {
    try {
      const query = `
        SELECT id, name, email, role, status, phone, address, avatar, created_at, updated_at
        FROM users 
        WHERE email = $1
      `;
      
      const result = await db.query(query, [email]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw new AppError('Database error', 500);
    }
  }

  // Find user by ID
  static async findById(userId: string): Promise<User | null> {
    try {
      const query = `
        SELECT id, name, email, role, status, phone, address, avatar, created_at, updated_at
        FROM users 
        WHERE id = $1
      `;
      
      const result = await db.query(query, [userId]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error finding user by ID:', error);
      throw new AppError('Database error', 500);
    }
  }

  // Get all users with filters and pagination
  static async getAll(filters: UserFilters = {}, options: QueryOptions = {}): Promise<PaginatedResponse<User>> {
    try {
      const page = options.page || 1;
      const limit = options.limit || 10;
      const offset = (page - 1) * limit;
      const sortBy = options.sort_by || 'created_at';
      const sortOrder = options.sort_order || 'DESC';

      let whereClause = 'WHERE 1=1';
      const values: any[] = [];
      let valueIndex = 1;

      // Apply filters
      if (filters.role) {
        whereClause += ` AND role = $${valueIndex++}`;
        values.push(filters.role);
      }

      if (filters.status) {
        whereClause += ` AND status = $${valueIndex++}`;
        values.push(filters.status);
      }

      if (filters.search) {
        whereClause += ` AND (name ILIKE $${valueIndex++} OR email ILIKE $${valueIndex++})`;
        values.push(`%${filters.search}%`, `%${filters.search}%`);
      }

      // Count total records
      const countQuery = `SELECT COUNT(*) FROM users ${whereClause}`;
      const countResult = await db.query(countQuery, values);
      const total = parseInt(countResult.rows[0].count);

      // Get paginated data
      const query = `
        SELECT id, name, email, role, status, phone, address, avatar, created_at, updated_at
        FROM users 
        ${whereClause}
        ORDER BY ${sortBy} ${sortOrder}
        LIMIT $${valueIndex++} OFFSET $${valueIndex++}
      `;

      values.push(limit, offset);
      const result = await db.query(query, values);

      return {
        success: true,
        message: 'Users retrieved successfully',
        data: result.rows,
        pagination: {
          page,
          limit,
          total,
          total_pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      console.error('Error getting users:', error);
      throw new AppError('Failed to retrieve users', 500);
    }
  }

  // Update user profile
  static async update(userId: string, updateData: UpdateUserData): Promise<User> {
    try {
      const user = await this.findById(userId);
      if (!user) {
        throw new AppError('User not found', 404);
      }

      const fields = [];
      const values = [];
      let valueIndex = 1;

      // Build dynamic update query
      Object.entries(updateData).forEach(([key, value]) => {
        if (value !== undefined) {
          fields.push(`${key} = $${valueIndex++}`);
          values.push(value);
        }
      });

      if (fields.length === 0) {
        return user; // No updates
      }

      values.push(userId);

      const query = `
        UPDATE users 
        SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP
        WHERE id = $${valueIndex}
        RETURNING id, name, email, role, status, phone, address, avatar, created_at, updated_at
      `;

      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Error updating user:', error);
      throw new AppError('Failed to update user', 500);
    }
  }

  // Admin: Update any user (including role and status)
  static async updateByAdmin(userId: string, updateData: UpdateUserData & { role?: UserRole; status?: 'active' | 'suspended' | 'pending' }): Promise<User> {
    try {
      const user = await this.findById(userId);
      if (!user) {
        throw new AppError('User not found', 404);
      }

      const fields = [];
      const values = [];
      let valueIndex = 1;

      // Build dynamic update query
      Object.entries(updateData).forEach(([key, value]) => {
        if (value !== undefined) {
          fields.push(`${key} = $${valueIndex++}`);
          values.push(value);
        }
      });

      if (fields.length === 0) {
        return user; // No updates
      }

      values.push(userId);

      const query = `
        UPDATE users 
        SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP
        WHERE id = $${valueIndex}
        RETURNING id, name, email, role, status, phone, address, avatar, created_at, updated_at
      `;

      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Error updating user by admin:', error);
      throw new AppError('Failed to update user', 500);
    }
  }

  // Delete user (soft delete by changing status)
  static async delete(userId: string): Promise<void> {
    try {
      const user = await this.findById(userId);
      if (!user) {
        throw new AppError('User not found', 404);
      }

      await db.query('UPDATE users SET status = $1 WHERE id = $2', ['suspended', userId]);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Error deleting user:', error);
      throw new AppError('Failed to delete user', 500);
    }
  }

  // Get user statistics
  static async getUserStats(userId: string) {
    try {
      const query = `
        SELECT 
          (SELECT COUNT(*) FROM bookings WHERE user_id = $1) as total_bookings,
          (SELECT COUNT(*) FROM bookings WHERE user_id = $1 AND status = 'active') as active_bookings,
          (SELECT COUNT(*) FROM bookings WHERE user_id = $1 AND status = 'completed') as completed_bookings,
          (SELECT COUNT(*) FROM bookings WHERE user_id = $1 AND status = 'cancelled') as cancelled_bookings,
          (SELECT COALESCE(SUM(total_amount), 0) FROM bookings WHERE user_id = $1 AND status IN ('completed', 'active')) as total_spent
      `;

      const result = await db.query(query, [userId]);
      return result.rows[0];
    } catch (error) {
      console.error('Error getting user stats:', error);
      throw new AppError('Failed to get user statistics', 500);
    }
  }

  // Change password
  static async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    try {
      // Get user with password
      const query = 'SELECT password_hash FROM users WHERE id = $1';
      const result = await db.query(query, [userId]);
      
      if (result.rows.length === 0) {
        throw new AppError('User not found', 404);
      }

      // Verify current password
      const isValid = await AuthUtils.comparePassword(currentPassword, result.rows[0].password_hash);
      if (!isValid) {
        throw new AppError('Current password is incorrect', 400);
      }

      // Hash new password and update
      const newPasswordHash = await AuthUtils.hashPassword(newPassword);
      await db.query('UPDATE users SET password_hash = $1 WHERE id = $2', [newPasswordHash, userId]);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Error changing password:', error);
      throw new AppError('Failed to change password', 500);
    }
  }

  // Verify user account (if implementing email verification)
  static async verifyAccount(userId: string): Promise<void> {
    try {
      await db.query('UPDATE users SET status = $1 WHERE id = $2', ['active', userId]);
    } catch (error) {
      console.error('Error verifying account:', error);
      throw new AppError('Failed to verify account', 500);
    }
  }
}

export default UserService;
