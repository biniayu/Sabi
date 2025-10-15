import { api } from './axios';
import { 
  ApiResponse, 
  PaginatedResponse,
  Booking, 
  BookingWithDetails,
  BookingForm, 
  BookingFilters,
  BookingStatus,
  PaymentStatus
} from '../types';

export const bookingService = {
  // Get all bookings with filters and pagination
  getBookings: async (
    filters?: BookingFilters, 
    page: number = 1, 
    limit: number = 10
  ): Promise<PaginatedResponse<BookingWithDetails>> => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...Object.fromEntries(
          Object.entries(filters || {}).filter(([_, value]) => value !== undefined)
        )
      });
      
      const response = await api.get<PaginatedResponse<BookingWithDetails>>(`/bookings?${params}`);
      return response.data;
    } catch (error) {
      console.error('Get bookings error:', error);
      throw error;
    }
  },

  // Get single booking by ID
  getBookingById: async (id: string): Promise<ApiResponse<BookingWithDetails>> => {
    try {
      const response = await api.get<ApiResponse<BookingWithDetails>>(`/bookings/${id}`);
      return response.data;
    } catch (error) {
      console.error('Get booking by ID error:', error);
      throw error;
    }
  },

  // Get bookings by user (for customers)
  getBookingsByUser: async (userId: string): Promise<ApiResponse<BookingWithDetails[]>> => {
    try {
      const response = await api.get<ApiResponse<BookingWithDetails[]>>(`/bookings/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Get bookings by user error:', error);
      throw error;
    }
  },

  // Get bookings by owner (for car owners)
  getBookingsByOwner: async (ownerId: string): Promise<ApiResponse<BookingWithDetails[]>> => {
    try {
      const response = await api.get<ApiResponse<BookingWithDetails[]>>(`/bookings/owner/${ownerId}`);
      return response.data;
    } catch (error) {
      console.error('Get bookings by owner error:', error);
      throw error;
    }
  },

  // Create new booking
  createBooking: async (bookingData: BookingForm): Promise<ApiResponse<Booking>> => {
    try {
      const response = await api.post<ApiResponse<Booking>>('/bookings', bookingData);
      return response.data;
    } catch (error) {
      console.error('Create booking error:', error);
      throw error;
    }
  },

  // Update booking status
  updateBookingStatus: async (id: string, status: BookingStatus): Promise<ApiResponse<Booking>> => {
    try {
      const response = await api.patch<ApiResponse<Booking>>(`/bookings/${id}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Update booking status error:', error);
      throw error;
    }
  },

  // Update payment status
  updatePaymentStatus: async (id: string, paymentStatus: PaymentStatus): Promise<ApiResponse<Booking>> => {
    try {
      const response = await api.patch<ApiResponse<Booking>>(`/bookings/${id}/payment`, { paymentStatus });
      return response.data;
    } catch (error) {
      console.error('Update payment status error:', error);
      throw error;
    }
  },

  // Cancel booking
  cancelBooking: async (id: string, reason?: string): Promise<ApiResponse<Booking>> => {
    try {
      const response = await api.patch<ApiResponse<Booking>>(`/bookings/${id}/cancel`, { reason });
      return response.data;
    } catch (error) {
      console.error('Cancel booking error:', error);
      throw error;
    }
  },

  // Complete booking
  completeBooking: async (id: string): Promise<ApiResponse<Booking>> => {
    try {
      const response = await api.patch<ApiResponse<Booking>>(`/bookings/${id}/complete`);
      return response.data;
    } catch (error) {
      console.error('Complete booking error:', error);
      throw error;
    }
  },

  // Get booking statistics
  getBookingStats: async (): Promise<ApiResponse<{
    total: number;
    pending: number;
    confirmed: number;
    completed: number;
    cancelled: number;
  }>> => {
    try {
      const response = await api.get('/bookings/stats');
      return response.data;
    } catch (error) {
      console.error('Get booking stats error:', error);
      throw error;
    }
  },

  // Check car availability for dates
  checkAvailability: async (
    carId: string, 
    pickupDate: string, 
    returnDate: string
  ): Promise<ApiResponse<{ available: boolean; conflictingBookings?: BookingWithDetails[] }>> => {
    try {
      const response = await api.post('/bookings/check-availability', {
        carId,
        pickupDate,
        returnDate
      });
      return response.data;
    } catch (error) {
      console.error('Check availability error:', error);
      throw error;
    }
  },

  // Calculate booking price
  calculatePrice: async (
    carId: string,
    pickupDate: string,
    returnDate: string
  ): Promise<ApiResponse<{ 
    dailyRate: number;
    days: number;
    subtotal: number;
    taxes: number;
    fees: number;
    total: number;
  }>> => {
    try {
      const response = await api.post('/bookings/calculate-price', {
        carId,
        pickupDate,
        returnDate
      });
      return response.data;
    } catch (error) {
      console.error('Calculate price error:', error);
      throw error;
    }
  },

  // Process payment
  processPayment: async (
    bookingId: string,
    paymentMethod: string,
    paymentDetails: any
  ): Promise<ApiResponse<{ transactionId: string; status: string }>> => {
    try {
      const response = await api.post('/bookings/process-payment', {
        bookingId,
        paymentMethod,
        paymentDetails
      });
      return response.data;
    } catch (error) {
      console.error('Process payment error:', error);
      throw error;
    }
  }
};
