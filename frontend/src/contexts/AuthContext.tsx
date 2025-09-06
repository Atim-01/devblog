'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { authApi, AuthResponse } from '@/lib/auth';
import { ApiError } from '@/lib/api';

export interface User {
  id: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      
      // Check if user is logged in by verifying JWT token
      const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
      console.log('Auth check - token exists:', !!token);
      
      if (!token) {
        console.log('No token found, setting user to null');
        setUser(null);
        return;
      }

      // Verify token with backend API
      try {
        console.log('Verifying token with backend...');
        const userData = await authApi.getProfile();
        console.log('User data received:', userData);
        setUser(userData);
      } catch (error) {
        console.error('Auth check failed with error:', error);
        if (error instanceof ApiError && error.status === 401) {
          // Token expired or invalid
          console.log('Token expired or invalid, clearing auth data');
          if (typeof window !== 'undefined') {
            localStorage.removeItem('authToken');
          }
          setUser(null);
        } else {
          console.error('Auth check failed:', error);
          // If backend is not available, try to decode the token locally as fallback
          try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (payload.exp && payload.exp * 1000 > Date.now()) {
              console.log('Using local token fallback');
              setUser({
                id: payload.sub,
                username: payload.username,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              });
            } else {
            console.log('Token expired locally');
            if (typeof window !== 'undefined') {
              localStorage.removeItem('authToken');
            }
            setUser(null);
            }
          } catch (localError) {
            console.error('Local token decode failed:', localError);
            if (typeof window !== 'undefined') {
              localStorage.removeItem('authToken');
            }
            setUser(null);
          }
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
      }
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      
      const response: AuthResponse = await authApi.login({ username, password });
      setUser(response.user);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      
      const response: AuthResponse = await authApi.register({ username, password });
      setUser(response.user);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout failed:', error);
      // Continue with local cleanup even if API call fails
    } finally {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
      }
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
