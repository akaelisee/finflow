import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import { cn } from '@/shared/lib/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className="flex flex-col gap-1.5">
        {label ? (
          <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
            {label}
          </label>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'h-10 rounded-md border border-gray-300 px-3 text-sm text-gray-900',
            'placeholder:text-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500',
            error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
            className,
          )}
          aria-invalid={Boolean(error)}
          {...props}
        />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
      </div>
    );
  },
);

Input.displayName = 'Input';
