import Parse from 'parse/react-native';
import { SignUpData, LoginData, User } from '@/types/auth.types';

class AuthService {

  async signUp(data: SignUpData): Promise<User> {
    try {
      const user = new Parse.User();
      user.set('username', data.username);
      user.set('email', data.email);
      user.set('password', data.password);
      if (data.name) user.set('name', data.name);

      await user.signUp();
      return this.toUser(user);
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async login(data: LoginData): Promise<User> {
    try {
      const user = await Parse.User.logIn(data.username, data.password);
      return this.toUser(user);
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async logout(): Promise<void> {
    try {
      await Parse.User.logOut();
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const user = Parse.User.current();
      if (!user) return null;

      await user.fetch();
      return this.toUser(user);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      return null;
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      await Parse.User.requestPasswordReset(email);
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  private toUser(parseUser: Parse.User | any): User {
    return {
      id: parseUser.id,
      username: parseUser.get('username') ?? undefined,
      email: parseUser.get('email') ?? undefined,
      name: parseUser.get('name') ?? undefined,
    };
  }

  private handleError(error: any): Error {
    const errorMessages: Record<number, string> = {
      100: 'Erro de conexão com o servidor',
      101: 'Usuário ou senha inválidos',
      102: 'Consulta inválida',
      103: 'Nome de classe inválido',
      119: 'Operação não permitida',
      124: 'Tempo limite excedido',
      125: 'Email inválido',
      200: 'Usuário não encontrado',
      201: 'Senha é obrigatória',
      202: 'Este nome de usuário já está em uso',
      203: 'Este email já está em uso',
      204: 'Email é obrigatório',
      205: 'Email não encontrado',
      206: 'Usuário não pode ser alterado',
      207: 'Você só pode criar usuários através do cadastro',
      208: 'Conta já vinculada a outro usuário',
      209: 'Sessão inválida',
    };

    const message = errorMessages[error.code] || error.message || 'Erro desconhecido';
    return new Error(message);
  }
}

export const authService = new AuthService();