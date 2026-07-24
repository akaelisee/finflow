import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { currentMonth } from '@/shared/lib/formatDate';
import { useAnalytics, KpiCards, CategoryDonut, MonthlyLineChart } from '@/features/dashboard';
export function DashboardPage() {
    const month = currentMonth();
    const { kpis, byCategory, monthly } = useAnalytics(month);
    return (_jsxs("div", { className: "flex flex-col gap-6", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Tableau de bord" }), _jsx(KpiCards, { kpis: kpis.data, isLoading: kpis.isLoading }), _jsxs("div", { className: "grid grid-cols-1 gap-6 lg:grid-cols-2", children: [_jsxs("div", { className: "rounded-lg border border-gray-200 bg-white p-4", children: [_jsx("h2", { className: "mb-4 text-base font-semibold text-gray-900", children: "D\u00E9penses par cat\u00E9gorie" }), _jsx(CategoryDonut, { data: byCategory.data, isLoading: byCategory.isLoading })] }), _jsxs("div", { className: "rounded-lg border border-gray-200 bg-white p-4", children: [_jsx("h2", { className: "mb-4 text-base font-semibold text-gray-900", children: "\u00C9volution mensuelle" }), _jsx(MonthlyLineChart, { data: monthly.data, isLoading: monthly.isLoading })] })] })] }));
}
