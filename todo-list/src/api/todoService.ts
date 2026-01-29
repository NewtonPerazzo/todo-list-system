import type { CreateToDoPayload, PaginatedResponse, ToDo } from '../store/todo/todoTypes';
import api from './axios';

export const todoService = {
  async getAll(page: number = 1, limit: number = 2): Promise<PaginatedResponse> {
    const response = await api.get<PaginatedResponse>('/todos/', {
      params: { page, limit },
    });
    return response.data;
  },

  async getById(id: string): Promise<ToDo | null> {
    const response = await api.get<ToDo>(`/todos/${id}`);
    return response.data;
  },

  async create(payload: CreateToDoPayload): Promise<ToDo> {
    const response = await api.post<ToDo>('/todos/', payload);
    return response.data;
  },

  async update(id: string, data: Partial<Omit<ToDo, 'id' | 'createdAt'>>): Promise<ToDo> {
    const response = await api.put<ToDo>(`/todos/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/todos/${id}`);
  },
};
