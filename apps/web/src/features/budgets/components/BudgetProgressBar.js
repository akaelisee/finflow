import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '@/shared/lib/cn';
export function BudgetProgressBar({ percentUsed }) {
    const isOverBudget = percentUsed >= 100;
    return (_jsx("div", { className: "h-2 w-full overflow-hidden rounded-full bg-gray-100", children: _jsx("div", { className: cn('h-full rounded-full transition-all', isOverBudget ? 'bg-red-500' : 'bg-brand-500'), style: { width: `${Math.min(100, percentUsed)}%` } }) }));
}
