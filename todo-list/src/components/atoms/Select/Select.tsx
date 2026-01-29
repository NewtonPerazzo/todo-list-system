import { forwardRef, memo } from 'react';
import type { SelectHTMLAttributes } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
  fullWidth?: boolean;
}

const SelectComponent = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, fullWidth = true, className = '', id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const widthStyles = fullWidth ? 'w-full' : '';

    return (
      <div className={`flex flex-col gap-1 ${widthStyles}`}>
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-medium text-primary-700"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`
            px-2 py-1
            border border-primary-200
            rounded-lg
            bg-white
            text-primary-900
            focus:outline-none
            focus:ring-2
            focus:ring-primary-300
            focus:border-primary-500
            disabled:bg-gray-100
            disabled:cursor-not-allowed
            transition-colors
            appearance-none
            cursor-pointer
            ${error ? 'border-error-500 focus:ring-error-300 focus:border-error-500' : ''}
            ${className}
          `}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <span className="text-sm text-error-500">{error}</span>
        )}
      </div>
    );
  }
);

SelectComponent.displayName = 'Select';

export const Select = memo(SelectComponent);
