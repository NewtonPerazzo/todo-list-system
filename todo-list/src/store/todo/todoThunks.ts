import { createAsyncThunk } from '@reduxjs/toolkit';
import { todoService } from '../../api/todoService';
import type { CreateToDoPayload, FetchTodosParams, PaginatedResponse, ToDo, UpdateToDoPayload } from './todoTypes';

export const fetchTodos = createAsyncThunk<PaginatedResponse, FetchTodosParams | void>(
  'todo/fetchTodos',
  async (params) => {
    const response = await todoService.getAll(params?.page, params?.limit);
    return response;
  }
);

export const createTodo = createAsyncThunk<ToDo, CreateToDoPayload>(
  'todo/createTodo',
  async (payload) => {
    const response = await todoService.create(payload);
    return response;
  }
);

export const updateTodo = createAsyncThunk<ToDo, UpdateToDoPayload>(
  'todo/updateTodo',
  async (payload) => {
    const response = await todoService.update(payload.id, payload.data);
    return response;
  }
);

export const deleteTodo = createAsyncThunk<string, string>(
  'todo/deleteTodo',
  async (id) => {
    await todoService.delete(id);
    return id;
  }
);
