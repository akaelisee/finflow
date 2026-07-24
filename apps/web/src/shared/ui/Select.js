import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useId } from 'react';
import { cn } from '@/shared/lib/cn';
export const Select = forwardRef(({ className, label, error, options, placeholder, id, ...props }, ref) => {
    const generatedId = useId();
    const selectId = id ?? generatedId;
    return (_jsxs("div", { className: "flex flex-col gap-1.5", children: [label ? (_jsx("label", { htmlFor: selectId, className: "text-sm font-medium text-gray-700", children: label })) : null, _jsxs("select", { ref: ref, id: selectId, className: cn('h-10 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900', 'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500', error && 'border-red-500 focus:ring-red-500 focus:border-red-500', className), "aria-invalid": Boolean(error), ...props, children: [placeholder ? (_jsx("option", { value: "", disabled: true, children: placeholder })) : null, options.map((option) => (_jsx("option", { value: option.value, children: option.label }, option.value)))] }), error ? _jsx("p", { className: "text-sm text-red-600", children: error }) : null] }));
});
Select.displayName = 'Select';
