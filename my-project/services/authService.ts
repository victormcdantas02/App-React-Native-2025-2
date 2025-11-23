import { PARSE_CONFIG } from '@/config/parseConfig';
import { SignUpData, LoginData, User } from '@/types/auth.types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SESSION_TOKEN_KEY = '@session_token';

class AuthService {
  private async request(method: string, endpoint: string, data?: any, sessionToken?: string) {
    const headers: Record<string, string> = {
      'X-Parse-Application-Id': PARSE_CONFIG.applicationId,
      'X-Parse-JavaScript-Key': PARSE_CONFIG.javascriptKey,
      'Content-Type': 'application/json',
    };

    if (sessionToken) {
      headers['X-Parse-Session-Token'] = sessionToken;
    }

    const options: RequestInit = {
      method,
      headers,
      ...(data && { body: JSON.stringify(data) }),
    };

    const response = await fetch(`${PARSE_CONFIG.serverURL}${endpoint}`, options);
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.error || 'Erro na requisição');
    }

    return json;
  }

  async signUp(data: SignUpData): Promise<User> {
    const response = await this.request('POST', '/users', {
      username: data.username,
      email: data.email,
      password: data.password,
      ...(data.name && { name: data.name }),
    });

    if (response.sessionToken) {
      await AsyncStorage.setItem(SESSION_TOKEN_KEY, response.sessionToken);
    }

    return {
      id: response.objectId,
      username: response.username,
      email: response.email,
      name: response.name,
    };
  }

  async login(data: LoginData): Promise<User> {
    const response = await this.request(
      'GET',
      `/login?username=${encodeURIComponent(data.username)}&password=${encodeURIComponent(data.password)}`
    );

    if (response.sessionToken) {
      await AsyncStorage.setItem(SESSION_TOKEN_KEY, response.sessionToken);
    }

    return {
      id: response.objectId,
      username: response.username,
      email: response.email,
      name: response.name,
    };
  }

  async logout(): Promise<void> {
    const sessionToken = await AsyncStorage.getItem(SESSION_TOKEN_KEY);
    if (sessionToken) {
      try {
        await this.request('POST', '/logout', {}, sessionToken);
      } catch (error) {
        console.error('Erro ao fazer logout:', error);
      }
      await AsyncStorage.removeItem(SESSION_TOKEN_KEY);
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const sessionToken = await AsyncStorage.getItem(SESSION_TOKEN_KEY);
      if (!sessionToken) return null;

      const response = await this.request('GET', '/users/me', undefined, sessionToken);

      return {
        id: response.objectId,
        username: response.username,
        email: response.email,
        name: response.name,
      };
    } catch (error) {
      await AsyncStorage.removeItem(SESSION_TOKEN_KEY);
      return null;
    }
  }

  async resetPassword(email: string): Promise<void> {
    await this.request('POST', '/requestPasswordReset', { email });
  }
}

export const authService = new AuthService();