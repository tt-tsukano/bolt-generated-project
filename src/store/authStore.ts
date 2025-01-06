import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: async (email, password) => {
    // Mock authentication
    const mockUser: User = {
      id: '1',
      email,
      name: 'Test User',
      role: 'admin',
    };
    set({ user: mockUser });
  },
  logout: () => set({ user: null }),
}));
