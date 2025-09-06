// Server-side API utilities for SSR/SSG
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

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

export interface ApiError {
  message: string;
  status?: number;
}

// Server-side API request function
async function serverApiRequest<T>(endpoint: string): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      // Add cache control for better performance
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    
    // Handle NestJS response format: { data: T, message: string, success: boolean }
    if (responseData.data !== undefined) {
      return responseData.data;
    }
    
    return responseData;
  } catch (error) {
    console.error(`Server API request failed for ${endpoint}:`, error);
    throw error;
  }
}

// Server-side API functions
export const serverPostsApi = {
  // Get all posts (public)
  getAll: () => serverApiRequest<Post[]>('/posts'),
  
  // Get single post by ID (public)
  getById: (id: string) => serverApiRequest<Post>(`/posts/${id}`),
  
  // Search posts (public)
  search: (query: string) => serverApiRequest<Post[]>(`/posts/search?q=${encodeURIComponent(query)}`),
  
  // Get posts by author (public)
  getByAuthor: (authorId: string) => serverApiRequest<Post[]>(`/posts/author/${authorId}`),
};

// Error handling utility
export const handleServerApiError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
};
