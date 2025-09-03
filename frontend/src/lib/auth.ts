import { ApiError } from './api';

// Authentication API endpoints
const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  ME: '/auth/me',
} as const;

// API base configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Authentication response types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    username: string;
    createdAt: string;
    updatedAt: string;
  };
  accessToken: string;
  refreshToken?: string;
}

export interface UserProfile {
  id: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

// Token management
export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('authToken');
};

export const setAuthToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('authToken', token);
};

export const clearAuthToken = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('authToken');
  localStorage.removeItem('refreshToken');
};

export const getRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('refreshToken');
};

export const setRefreshToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('refreshToken', token);
};

// Authentication API functions
export const authApi = {
  // User login
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.LOGIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          errorData.message || 'Login failed',
          response.status,
          errorData.code
        );
      }

      const data: AuthResponse = await response.json();
      
      // Store tokens
      setAuthToken(data.accessToken);
      if (data.refreshToken) {
        setRefreshToken(data.refreshToken);
      }

      return data;
    } catch (error) {
      console.error('Login API call failed:', error);
      throw error;
    }
  },

  // User registration
  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.REGISTER}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          errorData.message || 'Registration failed',
          response.status,
          errorData.code
        );
      }

      const data: AuthResponse = await response.json();
      
      // Store tokens
      setAuthToken(data.accessToken);
      if (data.refreshToken) {
        setRefreshToken(data.refreshToken);
      }

      return data;
    } catch (error) {
      console.error('Registration API call failed:', error);
      throw error;
    }
  },

  // Get current user profile
  getProfile: async (): Promise<UserProfile> => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new ApiError('No authentication token found', 401);
      }

      const response = await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.ME}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token expired or invalid
          clearAuthToken();
          throw new ApiError('Authentication token expired', 401);
        }
        
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          errorData.message || 'Failed to get user profile',
          response.status,
          errorData.code
        );
      }

      return await response.json();
    } catch (error) {
      console.error('Get profile API call failed:', error);
      throw error;
    }
  },

  // Refresh access token
  refreshToken: async (): Promise<{ accessToken: string }> => {
    try {
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        throw new ApiError('No refresh token found', 401);
      }

      const response = await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.REFRESH}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          errorData.message || 'Token refresh failed',
          response.status,
          errorData.code
        );
      }

      const data: { accessToken: string } = await response.json();
      setAuthToken(data.accessToken);
      return data;
    } catch (error) {
      console.error('Token refresh API call failed:', error);
      // Clear tokens on refresh failure
      clearAuthToken();
      throw error;
    }
  },

  // User logout
  logout: async (): Promise<void> => {
    try {
      const token = getAuthToken();
      if (token) {
        // Call logout endpoint to invalidate token on server
        await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.LOGOUT}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      console.error('Logout API call failed:', error);
      // Continue with local cleanup even if API call fails
    } finally {
      // Always clear local tokens
      clearAuthToken();
    }
  },
};

// Utility functions
export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

export const getAuthHeaders = (): Record<string, string> => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

// Mock authentication for development (remove when backend is ready)
export const mockAuth = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful login
    const mockResponse: AuthResponse = {
      user: {
        id: '1',
        username: credentials.username,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
    };

    setAuthToken(mockResponse.accessToken);
    setRefreshToken(mockResponse.refreshToken);
    
    return mockResponse;
  },

  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful registration
    const mockResponse: AuthResponse = {
      user: {
        id: '1',
        username: userData.username,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
    };

    setAuthToken(mockResponse.accessToken);
    setRefreshToken(mockResponse.refreshToken);
    
    return mockResponse;
  },

  getProfile: async (): Promise<UserProfile> => {
    const token = getAuthToken();
    if (!token) {
      throw new ApiError('No authentication token found', 401);
    }

    // Mock user profile
    return {
      id: '1',
      username: 'mockuser',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  },
};
