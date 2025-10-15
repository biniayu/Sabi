import { api } from './axios';
import { 
  ApiResponse, 
  PaginatedResponse,
  DashboardStats,
  RevenueData,
  UserReport,
  CarReport,
  BookingReport,
  AuthUser
} from '../types';

export const dashboardService = {
  // Get dashboard statistics
  getDashboardStats: async (): Promise<ApiResponse<DashboardStats>> => {
    try {
      const response = await api.get<ApiResponse<DashboardStats>>('/dashboard/stats');
      return response.data;
    } catch (error) {
      console.error('Get dashboard stats error:', error);
      throw error;
    }
  },

  // Get revenue data for charts
  getRevenueData: async (period: 'month' | 'year' = 'month'): Promise<ApiResponse<RevenueData[]>> => {
    try {
      const response = await api.get<ApiResponse<RevenueData[]>>(`/dashboard/revenue?period=${period}`);
      return response.data;
    } catch (error) {
      console.error('Get revenue data error:', error);
      throw error;
    }
  },

  // Get recent bookings
  getRecentBookings: async (limit: number = 10): Promise<ApiResponse<BookingReport[]>> => {
    try {
      const response = await api.get<ApiResponse<BookingReport[]>>(`/dashboard/recent-bookings?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Get recent bookings error:', error);
      throw error;
    }
  },

  // Admin: Get all users with stats
  getAllUsers: async (
    page: number = 1, 
    limit: number = 10
  ): Promise<PaginatedResponse<UserReport>> => {
    try {
      const response = await api.get<PaginatedResponse<UserReport>>(`/admin/users?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Get all users error:', error);
      throw error;
    }
  },

  // Admin: Update user role
  updateUserRole: async (userId: string, role: string): Promise<ApiResponse<AuthUser>> => {
    try {
      const response = await api.patch<ApiResponse<AuthUser>>(`/admin/users/${userId}/role`, { role });
      return response.data;
    } catch (error) {
      console.error('Update user role error:', error);
      throw error;
    }
  },

  // Admin: Suspend/unsuspend user
  toggleUserStatus: async (userId: string, suspended: boolean): Promise<ApiResponse<AuthUser>> => {
    try {
      const response = await api.patch<ApiResponse<AuthUser>>(`/admin/users/${userId}/status`, { suspended });
      return response.data;
    } catch (error) {
      console.error('Toggle user status error:', error);
      throw error;
    }
  },

  // Admin: Delete user
  deleteUser: async (userId: string): Promise<ApiResponse<void>> => {
    try {
      const response = await api.delete<ApiResponse<void>>(`/admin/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Delete user error:', error);
      throw error;
    }
  },

  // Admin: Get car reports
  getCarReports: async (
    page: number = 1, 
    limit: number = 10
  ): Promise<PaginatedResponse<CarReport>> => {
    try {
      const response = await api.get<PaginatedResponse<CarReport>>(`/admin/cars/reports?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Get car reports error:', error);
      throw error;
    }
  },

  // Admin: Get booking reports
  getBookingReports: async (
    startDate?: string,
    endDate?: string,
    page: number = 1, 
    limit: number = 10
  ): Promise<PaginatedResponse<BookingReport>> => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString()
      });
      
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);
      
      const response = await api.get<PaginatedResponse<BookingReport>>(`/admin/bookings/reports?${params}`);
      return response.data;
    } catch (error) {
      console.error('Get booking reports error:', error);
      throw error;
    }
  },

  // Owner: Get owner-specific stats
  getOwnerStats: async (ownerId: string): Promise<ApiResponse<{
    totalCars: number;
    totalBookings: number;
    totalRevenue: number;
    monthlyRevenue: number;
    averageRating: number;
    activeBookings: number;
  }>> => {
    try {
      const response = await api.get(`/dashboard/owner/${ownerId}/stats`);
      return response.data;
    } catch (error) {
      console.error('Get owner stats error:', error);
      throw error;
    }
  },

  // Owner: Get earnings data
  getOwnerEarnings: async (ownerId: string, period: 'month' | 'year' = 'month'): Promise<ApiResponse<RevenueData[]>> => {
    try {
      const response = await api.get(`/dashboard/owner/${ownerId}/earnings?period=${period}`);
      return response.data;
    } catch (error) {
      console.error('Get owner earnings error:', error);
      throw error;
    }
  },

  // Export data (for reports)
  exportBookingData: async (
    format: 'csv' | 'excel',
    startDate?: string,
    endDate?: string
  ): Promise<Blob> => {
    try {
      const params = new URLSearchParams({ format });
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);
      
      const response = await api.get(`/admin/export/bookings?${params}`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error('Export booking data error:', error);
      throw error;
    }
  },

  // Export user data
  exportUserData: async (format: 'csv' | 'excel'): Promise<Blob> => {
    try {
      const response = await api.get(`/admin/export/users?format=${format}`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error('Export user data error:', error);
      throw error;
    }
  }
};
