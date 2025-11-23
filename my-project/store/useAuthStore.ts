import { create } from 'zustand';
import { User } from '@/types/auth.types';
import { authService } from '@/services/authService';

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (username: string, email: string, password: string, name?: string) => Promise<void>;
  signOut: () => Promise<void>;
  loadUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),

  signIn: async (username, password) => {
    const user = await authService.login({ username, password });
    set({ user });
  },

  signUp: async (username, email, password, name) => {
    // ✅ Apenas cadastra, NÃO faz logout
    await authService.signUp({ username, email, password, name });
    
    // ✅ Faz logout manualmente para limpar a sessão
    await authService.logout();
    
    // ✅ Limpa o estado (usuário não fica logado)
    set({ user: null });
  },

  signOut: async () => {
    await authService.logout();
    set({ user: null });
  },

  loadUser: async () => {
    try {
      const user = await authService.getCurrentUser();
      set({ user, loading: false });
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
      set({ user: null, loading: false });
    }
  },
}));