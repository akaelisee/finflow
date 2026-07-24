import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { formatMoney } from '@/shared/lib/formatMoney';
import { Skeleton } from '@/shared/ui';
const moneyCards = [
    { key: 'totalBalance', label: 'Solde total' },
    { key: 'monthlyIncome', label: 'Revenus du mois' },
    { key: 'monthlyExpenses', label: 'Dépenses du mois' },
];
export function KpiCards({ kpis, isLoading }) {
    return (_jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [moneyCards.map((card) => (_jsxs("div", { className: "rounded-lg border border-gray-200 p-4", children: [_jsx("p", { className: "text-sm text-gray-500", children: card.label }), isLoading || !kpis ? (_jsx(Skeleton, { className: "mt-2 h-8 w-24" })) : (_jsx("p", { className: "mt-1 text-2xl font-bold text-gray-900", children: formatMoney(kpis[card.key]) }))] }, card.key))), _jsxs("div", { className: "rounded-lg border border-gray-200 p-4", children: [_jsx("p", { className: "text-sm text-gray-500", children: "Taux d'\u00E9pargne" }), isLoading || !kpis ? (_jsx(Skeleton, { className: "mt-2 h-8 w-24" })) : (_jsxs("p", { className: "mt-1 text-2xl font-bold text-gray-900", children: [Math.round(kpis.savingsRate * 100), "%"] }))] })] }));
}
