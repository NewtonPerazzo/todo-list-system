import { memo } from 'react';
import { Clock, Pencil, Trash2, Ban, RotateCcw } from 'lucide-react';
import type { ToDo } from '../../../store/todo/todoTypes';
import { formatDate } from '../../../utils/date';
import { Button } from '../../atoms/Button';

interface ToDoItemProps {
  todo: ToDo;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onToggleDone?: (id: string) => void;
  onToggleCancel?: (id: string) => void;
}

function ToDoItemComponent({ todo, onEdit, onDelete, onToggleDone, onToggleCancel }: ToDoItemProps) {
  const isDone = todo.status === 'done';
  const isCanceled = todo.canceled;

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 border border-primary-100 hover:shadow-lg transition-shadow mx-auto w-full ${isCanceled ? 'opacity-60' : ''}`}>
      <div className="flex flex-col gap-2 xs:gap-3">
        {/* Header with checkbox, name and canceled badge */}
        <div className="flex items-start gap-2 xs:gap-3">
          <input
            type="checkbox"
            checked={isDone}
            onChange={() => onToggleDone?.(todo.id)}
            className="mt-1 h-4 w-4 xs:mt-1.5 xs:h-5 xs:w-5 rounded border-primary-300 text-primary-500 cursor-pointer accent-primary-500"
          />
          <div className="flex-1 flex flex-col xs:flex-row xs:items-center xs:justify-between gap-1 xs:gap-2">
            <h3 className={`text-sm xs:text-lg font-semibold text-primary-800 ${isDone ? 'line-through opacity-70' : ''}`}>
              {todo.name}
            </h3>
            {isCanceled && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 xs:gap-1.5 xs:px-3 xs:py-1 rounded-full text-xs xs:text-sm font-medium border bg-error-100 text-error-700 border-error-300">
                <Ban className="w-3 h-3 xs:w-4 xs:h-4" />
                Canceled
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        {todo.description && (
          <p className="text-primary-600 text-xs xs:text-sm pl-6 xs:pl-8">
            {todo.description}
          </p>
        )}

        {/* Dates */}
        <div className="flex flex-col gap-1 xs:gap-2 xs:flex-row xs:items-center xs:gap-4 text-xs xs:text-sm text-primary-500 pl-6 xs:pl-8">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 xs:w-4 xs:h-4" />
            Created: {formatDate(todo.createdAt)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 xs:w-4 xs:h-4" />
            Deadline: {formatDate(todo.deadline)}
          </span>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-1 xs:gap-2 pt-2 border-t border-primary-100">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit?.(todo.id)}
            className="flex items-center gap-1 text-xs xs:text-sm"
          >
            <Pencil className="w-3 h-3 xs:w-4 xs:h-4" />
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleCancel?.(todo.id)}
            className={`flex items-center gap-1 text-xs xs:text-sm ${isCanceled ? '!text-success-600 hover:bg-success-50' : '!text-warning-600 hover:bg-warning-50'}`}
          >
            {isCanceled ? (
              <>
                <RotateCcw className="w-3 h-3 xs:w-4 xs:h-4" />
                Reactivate
              </>
            ) : (
              <>
                <Ban className="w-3 h-3 xs:w-4 xs:h-4" />
                Cancel
              </>
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete?.(todo.id)}
            className="flex items-center gap-1 text-xs xs:text-sm !text-error-500 hover:bg-error-50"
          >
            <Trash2 className="w-3 h-3 xs:w-4 xs:h-4" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export const ToDoItem = memo(ToDoItemComponent);
