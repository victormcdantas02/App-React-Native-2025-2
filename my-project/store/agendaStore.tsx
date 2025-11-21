import { create } from 'zustand';

// ⚠️ IMPORTANTE: Adicionar no .gitignore ou usar variáveis de ambiente
const BACK4APP_URL = 'https://parseapi.back4app.com';
const APP_ID = 'KI4NvqxaQXXcYd2hg8NiafMzjKxU0ASzWtQIAgq6';
const API_KEY = 'NKw9ExK9IxeqtfABAXjP3G7Q0mgTOKWoIbEHb5jt';

const headers = {
  'X-Parse-Application-Id': APP_ID,
  'X-Parse-REST-API-Key': API_KEY,
  'Content-Type': 'application/json',
};

interface Compromisso {
  objectId?: string;
  titulo: string;
  data: string;
  descricao: string;
  categoriaId?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface AgendaStore {
  compromissos: Compromisso[];
  loading: boolean;
  error: string | null;
  
  fetchCompromissos: () => Promise<void>;
  addCompromisso: (data: Omit<Compromisso, 'objectId'>) => Promise<void>;
  updateCompromisso: (id: string, data: Partial<Compromisso>) => Promise<void>;
  deleteCompromisso: (id: string) => Promise<void>;
}

export const useAgendaStore = create<AgendaStore>((set, get) => ({
  compromissos: [],
  loading: false,
  error: null,

  // READ - Buscar todos
  fetchCompromissos: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${BACK4APP_URL}/classes/Compromisso`, {
        headers,
      });
      const data = await response.json();
      set({ compromissos: data.results || [], loading: false });
    } catch (error) {
      console.error('Erro ao buscar:', error);
      set({ error: 'Erro ao buscar compromissos', loading: false });
    }
  },

  // CREATE - Adicionar
  addCompromisso: async (compromisso) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${BACK4APP_URL}/classes/Compromisso`, {
        method: 'POST',
        headers,
        body: JSON.stringify(compromisso),
      });
      const newCompromisso = await response.json();
      
      set((state) => ({
        compromissos: [...state.compromissos, { ...compromisso, ...newCompromisso }],
        loading: false,
      }));
    } catch (error) {
      console.error('Erro ao adicionar:', error);
      set({ error: 'Erro ao adicionar compromisso', loading: false });
    }
  },

  // UPDATE - Atualizar
  updateCompromisso: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${BACK4APP_URL}/classes/Compromisso/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data),
      });
      await response.json();
      
      set((state) => ({
        compromissos: state.compromissos.map((c) =>
          c.objectId === id ? { ...c, ...data } : c
        ),
        loading: false,
      }));
    } catch (error) {
      console.error('Erro ao atualizar:', error);
      set({ error: 'Erro ao atualizar compromisso', loading: false });
    }
  },

  // DELETE - Deletar
  deleteCompromisso: async (id) => {
    set({ loading: true, error: null });
    try {
      await fetch(`${BACK4APP_URL}/classes/Compromisso/${id}`, {
        method: 'DELETE',
        headers,
      });
      
      set((state) => ({
        compromissos: state.compromissos.filter((c) => c.objectId !== id),
        loading: false,
      }));
    } catch (error) {
      console.error('Erro ao deletar:', error);
      set({ error: 'Erro ao deletar compromisso', loading: false });
    }
  },
}));