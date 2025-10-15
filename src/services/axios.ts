import axios, { AxiosResponse, AxiosError } from 'axios';

// Get base URL from environment variables or default to localhost
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

// Create axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    // Get auth token from localStorage
    const currentUser = localStorage.getItem('sabi_current_user');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      // In a real app, you'd store and use a JWT token
      // For now, we'll pass the user ID in headers
      config.headers['X-User-ID'] = user.id;
      config.headers['X-User-Role'] = user.role;
    }
    
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error: AxiosError) => {
    console.error(`API Error: ${error.response?.status} ${error.config?.url}`, error.response?.data);
    
    // Handle common errors
    if (error.response?.status === 401) {
      // Unauthorized - clear auth data and redirect to login
      localStorage.removeItem('sabi_current_user');
      window.location.href = '/login';
    }
    
    if (error.response?.status === 403) {
      // Forbidden - insufficient permissions
      console.error('Access denied: Insufficient permissions');
    }
    
    if (error.response?.status >= 500) {
      // Server error
      console.error('Server error occurred');
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;

// Export convenience methods
export const api = {
  get: <T = any>(url: string, config?: any) => 
    axiosInstance.get<T>(url, config),
  
  post: <T = any>(url: string, data?: any, config?: any) => 
    axiosInstance.post<T>(url, data, config),
  
  put: <T = any>(url: string, data?: any, config?: any) => 
    axiosInstance.put<T>(url, data, config),
  
  patch: <T = any>(url: string, data?: any, config?: any) => 
    axiosInstance.patch<T>(url, data, config),
  
  delete: <T = any>(url: string, config?: any) => 
    axiosInstance.delete<T>(url, config),
};
