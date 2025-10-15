// User and Authentication Types
export type UserRole = 'user' | 'admin' | 'owner';

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthUser extends Omit<User, 'password'> {}

// Car Types
export interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: string;
  image: string;
  images?: string[];
  price: number;
  rating: number;
  category: string;
  transmission: 'Manual' | 'Automatic';
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  seats: number;
  description?: string;
  features?: string[];
  status: 'Available' | 'Rented' | 'Maintenance' | 'Unavailable';
  location: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

// Booking Types
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
export type PaymentStatus = 'awaiting' | 'paid' | 'refunded' | 'failed';

export interface Booking {
  id: string;
  carId: string;
  userId: string;
  ownerId: string;
  pickupDate: string;
  returnDate: string;
  duration: number;
  totalAmount: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  pickupLocation: string;
  pickupInstructions: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookingWithDetails extends Booking {
  car: Car;
  user: AuthUser;
  owner: AuthUser;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Dashboard Analytics Types
export interface DashboardStats {
  totalCars: number;
  totalBookings: number;
  totalUsers: number;
  totalRevenue: number;
  monthlyRevenue: number;
  pendingBookings: number;
  confirmedBookings: number;
  completedBookings: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
  bookings: number;
}

// Filter and Search Types
export interface CarFilters {
  category?: string;
  transmission?: string;
  fuelType?: string;
  minPrice?: number;
  maxPrice?: number;
  seats?: number;
  location?: string;
}

export interface BookingFilters {
  status?: BookingStatus;
  paymentStatus?: PaymentStatus;
  startDate?: string;
  endDate?: string;
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: UserRole;
}

export interface CarForm {
  name: string;
  brand: string;
  model: string;
  year: string;
  image: string;
  images?: string[];
  price: number;
  category: string;
  transmission: 'Manual' | 'Automatic';
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  seats: number;
  description?: string;
  features?: string[];
  location: string;
}

export interface BookingForm {
  carId: string;
  pickupDate: string;
  returnDate: string;
  pickupLocation: string;
  pickupInstructions: string;
}

// Report Types
export interface UserReport {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  totalBookings: number;
  totalSpent: number;
  joinDate: string;
  lastActivity: string;
}

export interface CarReport {
  id: string;
  name: string;
  owner: string;
  totalBookings: number;
  totalRevenue: number;
  rating: number;
  utilizationRate: number;
}

export interface BookingReport {
  id: string;
  carName: string;
  userName: string;
  ownerName: string;
  amount: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: 'booking' | 'payment' | 'system' | 'reminder';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}
