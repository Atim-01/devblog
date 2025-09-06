// API base configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Common HTTP headers
const getHeaders = (includeAuth = false) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (includeAuth && typeof window !== 'undefined') {
    const token = localStorage.getItem('authToken');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  return headers;
};

// Generic API request function
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {},
  includeAuth = false
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = getHeaders(includeAuth);

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || errorData.details?.validationErrors?.[0] || `HTTP error! status: ${response.status}`;
      throw new ApiError(errorMessage, response.status);
    }

    // Handle empty responses (like DELETE operations)
    if (response.status === 204) {
      return {} as T;
    }

    const responseData = await response.json();
    
    // Handle NestJS response format: { data: T, message: string, success: boolean }
    if (responseData.data !== undefined) {
      return responseData.data;
    }
    
    return responseData;
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
};

// Posts API
export const postsApi = {
  // Get all posts (public)
  getAll: () => apiRequest<Post[]>('/posts'),
  
  // Get single post by ID (public)
  getById: (id: string) => apiRequest<Post>(`/posts/${id}`),
  
  // Search posts (public)
  search: (query: string) => apiRequest<Post[]>(`/posts/search?q=${encodeURIComponent(query)}`),
  
  // Get posts by tag (public)
  getByTag: (tag: string) => apiRequest<Post[]>(`/posts/tag/${encodeURIComponent(tag)}`),
  
  // Get posts by author (public)
  getByAuthor: (authorId: string) => apiRequest<Post[]>(`/posts/author/${authorId}`),
  
  // Create new post (authenticated)
  create: (data: CreatePostData) => 
    apiRequest<Post>('/posts', {
      method: 'POST',
      body: JSON.stringify(data),
    }, true),
  
  // Update post (authenticated)
  update: (id: string, data: UpdatePostData) => 
    apiRequest<Post>(`/posts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }, true),
  
  // Delete post (authenticated)
  delete: (id: string) => 
    apiRequest<void>(`/posts/${id}`, {
      method: 'DELETE',
    }, true),
};

// Users API
export const usersApi = {
  // Get current user profile (authenticated)
  getProfile: () => apiRequest<User>('/users/profile', {}, true),
  
  // Update user profile (authenticated)
  updateProfile: (data: UpdateUserData) => 
    apiRequest<User>('/users/profile', {
      method: 'PATCH',
      body: JSON.stringify(data),
    }, true),
};

// Types
export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author?: {
    id: string;
    username: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostData {
  title: string;
  content: string;
}

export interface UpdatePostData {
  title?: string;
  content?: string;
}

export interface User {
  id: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserData {
  username?: string;
}

// Error handling utilities
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Response wrapper for consistent API responses
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Utility function to handle API errors
export const handleApiError = (error: unknown): string => {
  if (error instanceof ApiError) {
    return error.message;
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unexpected error occurred';
};
