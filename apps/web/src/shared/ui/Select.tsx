import { forwardRef, useId } from 'react';
import type { SelectHTMLAttributes } from 'react';
import { cn } from '@/shared/lib/cn';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, placeholder, id, ...props }, ref) => {
    const generatedId = useId();
    const selectId = id ?? generatedId;

    return (
      <div className="flex flex-col gap-1.5">
        {label ? (
          <label htmlFor={selectId} className="text-sm font-medium text-gray-700">
            {label}
          </label>
        ) : null}
        <select
          ref={ref}
          id={selectId}
          className={cn(
            'h-10 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900',
            'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500',
            error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
            className,
          )}
          aria-invalid={Boolean(error)}
          {...props}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
      </div>
    );
  },
);

Select.displayName = 'Select';
