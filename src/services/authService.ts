import { api } from './axios';
import { 
  ApiResponse, 
  AuthUser, 
  LoginForm, 
  RegisterForm 
} from '../types';

export const authService = {
  // Login user
  login: async (credentials: LoginForm): Promise<ApiResponse<AuthUser>> => {
    try {
      const response = await api.post<ApiResponse<AuthUser>>('/auth/login', credentials);
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Register user
  register: async (userData: RegisterForm): Promise<ApiResponse<AuthUser>> => {
    try {
      const response = await api.post<ApiResponse<AuthUser>>('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  // Get current user profile
  getCurrentUser: async (): Promise<ApiResponse<AuthUser>> => {
    try {
      const response = await api.get<ApiResponse<AuthUser>>('/auth/me');
      return response.data;
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  },

  // Update user profile
  updateProfile: async (userData: Partial<AuthUser>): Promise<ApiResponse<AuthUser>> => {
    try {
      const response = await api.patch<ApiResponse<AuthUser>>('/auth/profile', userData);
      return response.data;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  },

  // Change password
  changePassword: async (oldPassword: string, newPassword: string): Promise<ApiResponse<void>> => {
    try {
      const response = await api.post<ApiResponse<void>>('/auth/change-password', {
        oldPassword,
        newPassword
      });
      return response.data;
    } catch (error) {
      console.error('Change password error:', error);
      throw error;
    }
  },

  // Logout (if backend logout is needed)
  logout: async (): Promise<ApiResponse<void>> => {
    try {
      const response = await api.post<ApiResponse<void>>('/auth/logout');
      return response.data;
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }
};
