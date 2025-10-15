import { api } from './axios';
import { 
  ApiResponse, 
  PaginatedResponse,
  Car, 
  CarForm, 
  CarFilters 
} from '../types';

export const carService = {
  // Get all cars with optional filters and pagination
  getCars: async (
    filters?: CarFilters, 
    page: number = 1, 
    limit: number = 10
  ): Promise<PaginatedResponse<Car>> => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...Object.fromEntries(
          Object.entries(filters || {}).filter(([_, value]) => value !== undefined)
        )
      });
      
      const response = await api.get<PaginatedResponse<Car>>(`/cars?${params}`);
      return response.data;
    } catch (error) {
      console.error('Get cars error:', error);
      throw error;
    }
  },

  // Get single car by ID
  getCarById: async (id: string): Promise<ApiResponse<Car>> => {
    try {
      const response = await api.get<ApiResponse<Car>>(`/cars/${id}`);
      return response.data;
    } catch (error) {
      console.error('Get car by ID error:', error);
      throw error;
    }
  },

  // Get cars by owner (for owners to manage their cars)
  getCarsByOwner: async (ownerId: string): Promise<ApiResponse<Car[]>> => {
    try {
      const response = await api.get<ApiResponse<Car[]>>(`/cars/owner/${ownerId}`);
      return response.data;
    } catch (error) {
      console.error('Get cars by owner error:', error);
      throw error;
    }
  },

  // Create new car
  createCar: async (carData: CarForm): Promise<ApiResponse<Car>> => {
    try {
      const response = await api.post<ApiResponse<Car>>('/cars', carData);
      return response.data;
    } catch (error) {
      console.error('Create car error:', error);
      throw error;
    }
  },

  // Update car
  updateCar: async (id: string, carData: Partial<CarForm>): Promise<ApiResponse<Car>> => {
    try {
      const response = await api.put<ApiResponse<Car>>(`/cars/${id}`, carData);
      return response.data;
    } catch (error) {
      console.error('Update car error:', error);
      throw error;
    }
  },

  // Delete car
  deleteCar: async (id: string): Promise<ApiResponse<void>> => {
    try {
      const response = await api.delete<ApiResponse<void>>(`/cars/${id}`);
      return response.data;
    } catch (error) {
      console.error('Delete car error:', error);
      throw error;
    }
  },

  // Update car status
  updateCarStatus: async (id: string, status: Car['status']): Promise<ApiResponse<Car>> => {
    try {
      const response = await api.patch<ApiResponse<Car>>(`/cars/${id}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Update car status error:', error);
      throw error;
    }
  },

  // Get popular cars
  getPopularCars: async (limit: number = 8): Promise<ApiResponse<Car[]>> => {
    try {
      const response = await api.get<ApiResponse<Car[]>>(`/cars/popular?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Get popular cars error:', error);
      throw error;
    }
  },

  // Search cars by location
  getCarsByLocation: async (location: string): Promise<ApiResponse<Car[]>> => {
    try {
      const response = await api.get<ApiResponse<Car[]>>(`/cars/location/${encodeURIComponent(location)}`);
      return response.data;
    } catch (error) {
      console.error('Get cars by location error:', error);
      throw error;
    }
  },

  // Upload car image
  uploadCarImage: async (file: File): Promise<ApiResponse<{ url: string }>> => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await api.post<ApiResponse<{ url: string }>>(
        '/cars/upload-image', 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Upload car image error:', error);
      throw error;
    }
  }
};
