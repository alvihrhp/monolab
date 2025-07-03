// Common types used across the application
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code: string;
    details?: any;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

// Gallery types
export interface GalleryItem {
  id: string;
  title: string;
  slug: string; // URL-friendly identifier (id + title)
  description: string;
  imageUrl: string;
  category: string;
  metadata: Record<string, string>; // Flexible key-value pairs for specific details
  createdAt: Date;
}

// UI Component Props
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export interface InputProps {
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

export interface GalleryCardProps {
  item: GalleryItem;
  onImageLoad?: () => void;
} 