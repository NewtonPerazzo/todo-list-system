import { memo, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { ToDoItem } from '../../molecules/ToDoItem';
import { Button } from '../../atoms/Button';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchTodos, updateTodo, deleteTodo } from '../../../store/todo/todoThunks';
import { setEditingTodo } from '../../../store/todo/todoSlice';
import toast from 'react-hot-toast';

function ToDoListComponent() {
  const dispatch = useAppDispatch();
  const { todos, loading, error, total, page, pages } = useAppSelector((state) => state.todo);

  const loadPage = useCallback((targetPage: number) => {
    dispatch(fetchTodos({ page: targetPage }));
  }, [dispatch]);

  useEffect(() => {
    loadPage(1);
  }, [loadPage]);

  const handleEdit = (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      dispatch(setEditingTodo(todo));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteTodo(id)).unwrap();
      toast.success('Task deleted successfully!');
      loadPage(page);
    } catch {
      toast.error('Failed to delete task');
    }
  };

  const handleToggleDone = async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    const nextStatus = todo.status === 'done' ? 'not_done' : 'done';
    try {
      await dispatch(updateTodo({ id, data: { status: nextStatus } })).unwrap();
      toast.success(nextStatus === 'done' ? 'Task completed!' : 'Task marked as pending');
      loadPage(page);
    } catch {
      toast.error('Failed to update task');
    }
  };

  const handleToggleCancel = async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    const nextCanceled = !todo.canceled;
    try {
      await dispatch(updateTodo({ id, data: { canceled: nextCanceled } })).unwrap();
      toast.success(nextCanceled ? 'Task canceled' : 'Task reactivated');
      loadPage(page);
    } catch {
      toast.error('Failed to update task');
    }
  };

  if (loading && todos.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-error-50 border border-error-200 rounded-lg p-4 text-center mx-auto w-full">
        <p className="text-error-600">{error}</p>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 text-center mx-auto w-full">
        <p className="text-primary-600 text-lg">
          No tasks yet. Add your first task above!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <h2 className="text-xl font-semibold text-primary-700 w-full">
        Your Tasks ({total})
      </h2>
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 rounded-lg">
            <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
          </div>
        )}
        {todos.map((todo) => (
          <ToDoItem
            key={todo.id}
            todo={todo}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleDone={handleToggleDone}
            onToggleCancel={handleToggleCancel}
          />
        ))}
      </div>
      {pages > 1 && (
        <div className="flex items-center gap-4 pt-4">
          <Button
            variant="secondary"
            size="sm"
            disabled={page <= 1}
            onClick={() => loadPage(page - 1)}
            className="flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          <span className="text-sm text-primary-600">
            Page {page} of {pages}
          </span>
          <Button
            variant="secondary"
            size="sm"
            disabled={page >= pages}
            onClick={() => loadPage(page + 1)}
            className="flex items-center gap-1"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

export const ToDoList = memo(ToDoListComponent);
