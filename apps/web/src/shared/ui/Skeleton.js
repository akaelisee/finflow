import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '@/shared/lib/cn';
export function Skeleton({ className, ...props }) {
    return _jsx("div", { className: cn('animate-pulse rounded-md bg-gray-200', className), ...props });
}
