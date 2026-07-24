import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCategories } from '@/features/categories';
import { EmptyState, Skeleton } from '@/shared/ui';
import { formatMoney } from '@/shared/lib/formatMoney';
import { useBudgetStatus } from '../hooks/useBudgetStatus';
import { BudgetProgressBar } from './BudgetProgressBar';
export function BudgetsList({ budgets, transactions, isLoading }) {
    const { data: categories } = useCategories();
    const statuses = useBudgetStatus(budgets, transactions);
    if (isLoading) {
        return (_jsx("div", { className: "flex flex-col gap-3", children: Array.from({ length: 3 }).map((_, index) => (_jsx(Skeleton, { className: "h-16" }, index))) }));
    }
    if (budgets.length === 0) {
        return _jsx(EmptyState, { title: "Aucun budget", description: "D\u00E9finissez un budget mensuel par cat\u00E9gorie." });
    }
    return (_jsx("div", { className: "flex flex-col gap-4", children: statuses.map(({ budget, spent, percentUsed }) => {
            const category = categories?.find((item) => item.id === budget.categoryId);
            return (_jsxs("div", { className: "rounded-lg border border-gray-200 p-4", children: [_jsxs("div", { className: "mb-2 flex items-center justify-between", children: [_jsx("span", { className: "font-medium text-gray-900", children: category?.name ?? 'Catégorie' }), _jsxs("span", { className: "text-sm text-gray-500", children: [formatMoney(spent), " / ", formatMoney(budget.amount)] })] }), _jsx(BudgetProgressBar, { percentUsed: percentUsed })] }, budget.id));
        }) }));
}
