import { PARSE_CONFIG } from '@/config/parseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SESSION_TOKEN_KEY = '@session_token';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  userId: string;
  userName?: string;
  createdAt: Date;
  updatedAt: Date;
}

class TaskService {
  private async request(method: string, endpoint: string, data?: any) {
    const sessionToken = await AsyncStorage.getItem(SESSION_TOKEN_KEY);
    
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

  async create(title: string, description: string): Promise<Task> {
    const response = await this.request('POST', '/classes/Task', {
      title,
      description,
      completed: false,
    });

    return {
      id: response.objectId,
      title,
      description,
      completed: false,
      userId: '',
      createdAt: new Date(response.createdAt),
      updatedAt: new Date(response.updatedAt),
    };
  }

  async list(): Promise<Task[]> {
    const response = await this.request('GET', '/classes/Task?order=-createdAt&include=user');

    return response.results.map((task: any) => ({
      id: task.objectId,
      title: task.title,
      description: task.description,
      completed: task.completed || false,
      userId: task.user?.objectId || '',
      userName: task.user?.username || 'Usuário',
      createdAt: new Date(task.createdAt),
      updatedAt: new Date(task.updatedAt),
    }));
  }

  async update(id: string, title?: string, description?: string, completed?: boolean): Promise<Task> {
    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (completed !== undefined) updateData.completed = completed;

    const response = await this.request('PUT', `/classes/Task/${id}`, updateData);

    // Buscar tarefa atualizada
    const updated = await this.request('GET', `/classes/Task/${id}?include=user`);

    return {
      id: updated.objectId,
      title: updated.title,
      description: updated.description,
      completed: updated.completed || false,
      userId: updated.user?.objectId || '',
      userName: updated.user?.username || 'Usuário',
      createdAt: new Date(updated.createdAt),
      updatedAt: new Date(updated.updatedAt),
    };
  }

  async delete(id: string): Promise<void> {
    await this.request('DELETE', `/classes/Task/${id}`);
  }

  async toggle(id: string): Promise<Task> {
    // Buscar estado atual
    const current = await this.request('GET', `/classes/Task/${id}?include=user`);
    const newCompleted = !current.completed;

    // Atualizar
    await this.request('PUT', `/classes/Task/${id}`, { completed: newCompleted });

    return {
      id: current.objectId,
      title: current.title,
      description: current.description,
      completed: newCompleted,
      userId: current.user?.objectId || '',
      userName: current.user?.username || 'Usuário',
      createdAt: new Date(current.createdAt),
      updatedAt: new Date(current.updatedAt),
    };
  }
}

export const taskService = new TaskService();