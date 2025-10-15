import { Request } from 'express';

// User Types
export type UserRole = 'user' | 'admin' | 'owner';
export type UserStatus = 'active' | 'suspended' | 'pending';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  phone?: string;
  address?: string;
  created_at: Date;
  updated_at: Date;
}

export interface UserWithPassword extends User {
  password_hash: string;
}

// Car Types
export type CarStatus = 'Available' | 'Rented' | 'Maintenance';

export interface Car {
  id: string;
  owner_id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  description?: string;
  features: string[];
  images: string[];
  location: string;
  status: CarStatus;
  rating: number;
  total_bookings: number;
  created_at: Date;
  updated_at: Date;
}

// Booking Types
export type BookingStatus = 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  user_id: string;
  car_id: string;
  start_date: Date;
  end_date: Date;
  total_amount: number;
  status: BookingStatus;
  notes?: string;
  created_at: Date;
  updated_at: Date;
}

export interface BookingWithDetails extends Booking {
  user: Pick<User, 'id' | 'name' | 'email' | 'phone'>;
  car: Pick<Car, 'id' | 'name' | 'brand' | 'model' | 'images'>;
}

// Dashboard Types
export interface DashboardStats {
  total_users: number;
  total_cars: number;
  total_bookings: number;
  total_revenue: number;
  monthly_revenue: number;
  growth_percentage: number;
  active_bookings: number;
  avg_rating: number;
}

export interface UserDashboardStats {
  total_bookings: number;
  active_bookings: number;
  completed_bookings: number;
  cancelled_bookings: number;
  total_spent: number;
}

export interface OwnerDashboardStats {
  total_cars: number;
  total_bookings: number;
  total_revenue: number;
  monthly_revenue: number;
  avg_rating: number;
  active_bookings: number;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

// Auth Types
export interface AuthTokenPayload {
  userId: string;
  email: string;
  role: UserRole;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthTokenPayload;
}

// Validation Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
  phone?: string;
}

export interface CreateCarData {
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  description?: string;
  features: string[];
  location: string;
}

export interface CreateBookingData {
  car_id: string;
  start_date: string;
  end_date: string;
  notes?: string;
}

export interface UpdateBookingStatusData {
  status: BookingStatus;
}

export interface UpdateUserData {
  name?: string;
  phone?: string;
  address?: string;
  status?: UserStatus;
  role?: UserRole;
}

// Filter Types
export interface CarFilters {
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: CarStatus;
  location?: string;
  owner_id?: string;
}

export interface BookingFilters {
  status?: BookingStatus;
  user_id?: string;
  car_id?: string;
  start_date?: string;
  end_date?: string;
}

export interface UserFilters {
  role?: UserRole;
  status?: UserStatus;
  search?: string;
}

// Database Query Types
export interface QueryOptions {
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'ASC' | 'DESC';
}

// Error Types
export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export interface ValidationError {
  field: string;
  message: string;
}

// File Upload Types
export interface UploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
}
