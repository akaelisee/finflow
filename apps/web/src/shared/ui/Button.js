import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { cn } from '@/shared/lib/cn';
const variantClasses = {
    primary: 'bg-brand-600 text-white hover:bg-brand-700 focus-visible:ring-brand-500',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-400',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
};
const sizeClasses = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
};
export const Button = forwardRef(({ className, variant = 'primary', size = 'md', isLoading = false, disabled, children, ...props }, ref) => {
    return (_jsxs("button", { ref: ref, disabled: disabled || isLoading, className: cn('inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2', 'disabled:cursor-not-allowed disabled:opacity-50', variantClasses[variant], sizeClasses[size], className), ...props, children: [isLoading ? _jsx("span", { className: "size-4 animate-spin rounded-full border-2 border-current border-t-transparent" }) : null, children] }));
});
Button.displayName = 'Button';
