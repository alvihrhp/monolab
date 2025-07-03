import { create } from 'zustand';
import type { User, LoginCredentials, ApiResponse } from '../types';

interface UserStore {
  // State
  user: User | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  setUser: (user: User) => void;
}

//@ts-ignore
export const useUserStore = create<UserStore>((set, get) => ({
  // Initial state
  user: null,
  isLoading: false,
  error: null,

  // Actions
  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true, error: null });
    
    try {
      // TODO: Replace with actual API call
      const mockResponse: ApiResponse<{ user: User; token: string }> = {
        success: true,
        data: {
          user: {
            id: '1',
            name: 'John Doe',
            email: credentials.email,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          token: 'mock-jwt-token',
        },
      };

      if (mockResponse.success && mockResponse.data) {
        set({ 
          user: mockResponse.data.user, 
          isLoading: false 
        });
        
        // Store token in localStorage
        localStorage.setItem('token', mockResponse.data.token);
      }
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Login failed' 
      });
    }
  },

  logout: () => {
    set({ user: null });
    localStorage.removeItem('token');
  },

  clearError: () => set({ error: null }),

  setUser: (user: User) => set({ user }),
})); 