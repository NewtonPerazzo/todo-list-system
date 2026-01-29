import { memo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Save, X } from 'lucide-react';
import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { createTodo, updateTodo, fetchTodos } from '../../../store/todo/todoThunks';
import { clearEditingTodo } from '../../../store/todo/todoSlice';
import toast from 'react-hot-toast';

interface FormData {
  name: string;
  description: string;
  deadline: string;
}

function toDateInputValue(isoDate: string): string {
  return isoDate ? isoDate.split('T')[0] : '';
}

function ToDoFormComponent() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.todo.loading);
  const editingTodo = useAppSelector((state) => state.todo.editingTodo);

  const isEditing = editingTodo !== null;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      description: '',
      deadline: '',
    },
  });

  useEffect(() => {
    if (editingTodo) {
      reset({
        name: editingTodo.name,
        description: editingTodo.description,
        deadline: toDateInputValue(editingTodo.deadline),
      });
    } else {
      reset({
        name: '',
        description: '',
        deadline: '',
      });
    }
  }, [editingTodo, reset]);

  const handleCancel = () => {
    dispatch(clearEditingTodo());
  };

  const onSubmit = async (data: FormData) => {
    try {
      if (isEditing) {
        await dispatch(updateTodo({
          id: editingTodo.id,
          data: {
            name: data.name,
            description: data.description,
            deadline: new Date(data.deadline).toISOString(),
          },
        })).unwrap();
        toast.success('Task updated successfully!');
      } else {
        await dispatch(createTodo({
          name: data.name,
          description: data.description,
          deadline: new Date(data.deadline).toISOString(),
        })).unwrap();
        toast.success('Task created successfully!');
        reset();
        dispatch(fetchTodos({ page: 1 }));
      }
    } catch {
      toast.error(isEditing ? 'Failed to update task' : 'Failed to create task');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-lg shadow-md p-4 border border-primary-100 mx-auto w-full"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-primary-700">
          {isEditing ? 'Edit Task' : 'Add New Task'}
        </h2>
        {isEditing && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleCancel}
            className="flex items-center gap-1 !text-error-500 hover:bg-error-50"
          >
            <X className="w-4 h-4" />
            Cancel
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <Input
          label="Task Name"
          placeholder="Enter task name"
          error={errors.name?.message}
          {...register('name', {
            required: 'Task name is required',
            minLength: {
              value: 3,
              message: 'Name must be at least 3 characters',
            },
          })}
        />

        <Input
          label="Description"
          placeholder="Enter task description (optional)"
          {...register('description')}
        />

        <Input
          label="Deadline"
          type="date"
          error={errors.deadline?.message}
          {...register('deadline', {
            required: 'Deadline is required',
          })}
        />

        <Button
          type="submit"
          isLoading={loading}
          fullWidth
          className="mt-2 flex items-center justify-center gap-2"
        >
          {isEditing ? (
            <>
              <Save className="w-5 h-5" />
              Save Changes
            </>
          ) : (
            <>
              <Plus className="w-5 h-5" />
              Add To Do
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

export const ToDoForm = memo(ToDoFormComponent);
