import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useId } from 'react';
import { cn } from '@/shared/lib/cn';
export const Input = forwardRef(({ className, label, error, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    return (_jsxs("div", { className: "flex flex-col gap-1.5", children: [label ? (_jsx("label", { htmlFor: inputId, className: "text-sm font-medium text-gray-700", children: label })) : null, _jsx("input", { ref: ref, id: inputId, className: cn('h-10 rounded-md border border-gray-300 px-3 text-sm text-gray-900', 'placeholder:text-gray-400', 'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500', error && 'border-red-500 focus:ring-red-500 focus:border-red-500', className), "aria-invalid": Boolean(error), ...props }), error ? _jsx("p", { className: "text-sm text-red-600", children: error }) : null] }));
});
Input.displayName = 'Input';
