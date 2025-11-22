export interface SignUpData {
  username: string;
  email: string;
  password: string;
  name?: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  name?: string;
}

export interface AuthContextData {
  user: User | null;
  loading: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (username: string, email: string, password: string, name?: string) => Promise<void>;
  signOut: () => Promise<void>;
}