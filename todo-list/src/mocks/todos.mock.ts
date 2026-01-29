import type { ToDo } from '../store/todo/todoTypes';

export const todosMock: ToDo[] = [
  {
    id: '1',
    name: 'Complete project documentation',
    description: 'Write the README and API documentation for the project',
    createdAt: '2024-01-15T10:00:00.000Z',
    deadline: '2024-01-20T18:00:00.000Z',
    status: 'done',
    canceled: false,
  },
  {
    id: '2',
    name: 'Review pull requests',
    description: 'Review and approve pending PRs from the team',
    createdAt: '2024-01-16T09:00:00.000Z',
    deadline: '2024-01-18T17:00:00.000Z',
    status: 'not_done',
    canceled: false,
  },
  {
    id: '3',
    name: 'Fix authentication bug',
    description: 'Investigate and fix the login issue reported by users',
    createdAt: '2024-01-14T14:30:00.000Z',
    deadline: '2024-01-15T12:00:00.000Z',
    status: 'done',
    canceled: true,
  },
];

// Simulated storage for CRUD operations
let mockStorage: ToDo[] = [...todosMock];

export const getMockTodos = (): ToDo[] => [...mockStorage];

export const addMockTodo = (todo: ToDo): void => {
  mockStorage = [todo, ...mockStorage];
};

export const updateMockTodo = (id: string, data: Partial<ToDo>): ToDo | null => {
  const index = mockStorage.findIndex((t) => t.id === id);
  if (index === -1) return null;
  mockStorage[index] = { ...mockStorage[index], ...data };
  return mockStorage[index];
};

export const deleteMockTodo = (id: string): boolean => {
  const initialLength = mockStorage.length;
  mockStorage = mockStorage.filter((t) => t.id !== id);
  return mockStorage.length < initialLength;
};
