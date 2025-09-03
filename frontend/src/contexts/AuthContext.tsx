'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

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
  logout: () => void;
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
      // Check if user is logged in by verifying JWT token
      const token = localStorage.getItem('authToken');
      if (!token) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      // TODO: Verify token with backend API
      // const response = await fetch('/api/auth/me', {
      //   headers: { Authorization: `Bearer ${token}` }
      // });
      // if (response.ok) {
      //   const userData = await response.json();
      //   setUser(userData);
      // } else {
      //   localStorage.removeItem('authToken');
      //   setUser(null);
      // }

      // For now, just check if token exists
      // Remove this when backend is ready
      setUser(null);
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('authToken');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      
      // TODO: Replace with actual API call when backend is ready
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ username, password })
      // });
      
      // if (!response.ok) {
      //   throw new Error('Login failed');
      // }
      
      // const { user: userData, token } = await response.json();
      // localStorage.setItem('authToken', token);
      // setUser(userData);

      // Mock login for now - remove when backend is ready
      const mockUser: User = {
        id: '1',
        username,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem('authToken', 'mock-token');
      setUser(mockUser);
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
      
      // TODO: Replace with actual API call when backend is ready
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ username, password })
      // });
      
      // if (!response.ok) {
      //   throw new Error('Registration failed');
      // }
      
      // const { user: userData, token } = await response.json();
      // localStorage.setItem('authToken', token);
      // setUser(userData);

      // Mock registration for now - remove when backend is ready
      const mockUser: User = {
        id: '1',
        username,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem('authToken', 'mock-token');
      setUser(mockUser);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
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
