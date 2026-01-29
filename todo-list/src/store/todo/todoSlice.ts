import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { PaginatedResponse, ToDo, TodoState } from './todoTypes';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from './todoThunks';

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
  editingTodo: null,
  total: 0,
  page: 1,
  pages: 1,
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setEditingTodo: (state, action: PayloadAction<ToDo>) => {
      state.editingTodo = action.payload;
    },
    clearEditingTodo: (state) => {
      state.editingTodo = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Todos
    builder.addCase(fetchTodos.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action: PayloadAction<PaginatedResponse>) => {
      state.loading = false;
      state.todos = action.payload.items;
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.pages = action.payload.pages;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch todos';
    });

    // Create Todo
    builder.addCase(createTodo.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createTodo.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to create todo';
    });

    // Update Todo
    builder.addCase(updateTodo.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateTodo.fulfilled, (state, action: PayloadAction<ToDo>) => {
      state.loading = false;
      state.editingTodo = null;
      const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    });
    builder.addCase(updateTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to update todo';
    });

    // Delete Todo
    builder.addCase(deleteTodo.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteTodo.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to delete todo';
    });
  },
});

export const { clearError, setEditingTodo, clearEditingTodo } = todoSlice.actions;
export default todoSlice.reducer;
