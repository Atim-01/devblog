// User types
export interface User {
  id: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthUser extends User {
  iat?: number;
  exp?: number;
}

// Post types
export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    username: string;
  };
}

export interface CreatePostData {
  title: string;
  content: string;
}

export interface UpdatePostData {
  title?: string;
  content?: string;
}

// Authentication types
export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
  path: string;
  method: string;
  statusCode: number;
}

export interface ApiError {
  success: false;
  message: string;
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
  details?: any;
}

// Form types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'password' | 'textarea';
  placeholder?: string;
  required?: boolean;
  validation?: any;
}

// UI Component types
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning' | 'teal';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'type' | 'onFocus' | 'onBlur'> {
  name: string;
  label?: string;
  type?: 'text' | 'password' | 'email' | 'textarea';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
}
