import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '@/shared/lib/cn';
const sizeClasses = {
    sm: 'size-8 text-xs',
    md: 'size-10 text-sm',
    lg: 'size-14 text-lg',
};
function getInitials(name) {
    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.[0] ?? '';
    const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? '') : '';
    return (first + last).toUpperCase();
}
export function Avatar({ name, size = 'md', className }) {
    return (_jsx("span", { className: cn('inline-flex items-center justify-center rounded-full bg-brand-100 font-semibold text-brand-700', sizeClasses[size], className), "aria-hidden": "true", children: getInitials(name) }));
}
