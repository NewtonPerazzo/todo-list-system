import { forwardRef, memo } from 'react';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const InputComponent = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = true, className = '', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const widthStyles = fullWidth ? 'w-full' : '';

    return (
      <div className={`flex flex-col gap-1 ${widthStyles}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-primary-700"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            px-2 py-1
            border border-primary-200
            rounded-lg
            bg-white
            text-primary-900
            placeholder:text-primary-300
            focus:outline-none
            focus:ring-2
            focus:ring-primary-300
            focus:border-primary-500
            disabled:bg-gray-100
            disabled:cursor-not-allowed
            transition-colors
            ${error ? 'border-error-500 focus:ring-error-300 focus:border-error-500' : ''}
            ${className}
          `}
          {...props}
        />
        {error && (
          <span className="text-sm text-error-500">{error}</span>
        )}
      </div>
    );
  }
);

InputComponent.displayName = 'Input';

export const Input = memo(InputComponent);
