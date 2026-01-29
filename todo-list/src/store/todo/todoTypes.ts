export interface ToDo {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  deadline: string;
  status: 'done' | 'not_done';
  canceled: boolean;
}

export type ToDoStatus = ToDo['status'];

export interface CreateToDoPayload {
  name: string;
  description: string;
  deadline: string;
}

export interface UpdateToDoPayload {
  id: string;
  data: Partial<Omit<ToDo, 'id' | 'createdAt'>>;
}

export interface PaginatedResponse {
  items: ToDo[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface FetchTodosParams {
  page?: number;
  limit?: number;
}

export interface TodoState {
  todos: ToDo[];
  loading: boolean;
  error: string | null;
  editingTodo: ToDo | null;
  total: number;
  page: number;
  pages: number;
}
