import { create } from 'zustand';

interface Todo {
  id: string;
  text: string;
  category: string;
  isCompleted: boolean;
  data: Date | null;
}

interface TodoStore {
  todos: Todo[];
  user: any;
  loading: boolean;
  setUser: (user: any) => void;
  fetchTodos: (user: any) => Promise<void>;
  addTodo: (text: string, category: string, data: Date) => Promise<void>;
  completeTodo: (id: string) => Promise<void>;
  removeTodo: (id: string) => Promise<void>;
}