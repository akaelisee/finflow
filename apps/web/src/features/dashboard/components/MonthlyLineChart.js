import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { formatMoney } from '@/shared/lib/formatMoney';
import { formatMonth } from '@/shared/lib/formatDate';
import { Skeleton, EmptyState } from '@/shared/ui';
const WIDTH = 480;
const HEIGHT = 220;
const PADDING = 32;
function buildPath(values, max) {
    if (values.length === 0)
        return '';
    const stepX = (WIDTH - PADDING * 2) / Math.max(1, values.length - 1);
    return values
        .map((value, index) => {
        const x = PADDING + index * stepX;
        const y = HEIGHT - PADDING - (max > 0 ? (value / max) * (HEIGHT - PADDING * 2) : 0);
        return `${index === 0 ? 'M' : 'L'}${x},${y}`;
    })
        .join(' ');
}
export function MonthlyLineChart({ data, isLoading }) {
    const points = data ?? [];
    const max = Math.max(1, ...points.flatMap((point) => [point.income, point.expenses]));
    if (isLoading)
        return _jsx(Skeleton, { className: "h-56 w-full" });
    if (points.length === 0) {
        return (_jsx(EmptyState, { title: "Pas encore de donn\u00E9es", description: "L'historique s'affichera apr\u00E8s quelques mois d'activit\u00E9." }));
    }
    const incomePath = buildPath(points.map((point) => point.income), max);
    const expensesPath = buildPath(points.map((point) => point.expenses), max);
    const stepX = (WIDTH - PADDING * 2) / Math.max(1, points.length - 1);
    const last = points[points.length - 1];
    return (_jsxs("div", { className: "flex flex-col gap-3", children: [_jsxs("div", { className: "flex items-center gap-4 text-sm", children: [_jsxs("span", { className: "flex items-center gap-1.5 text-gray-700", children: [_jsx("span", { className: "h-0.5 w-4 rounded-full bg-brand-500" }), " Revenus"] }), _jsxs("span", { className: "flex items-center gap-1.5 text-gray-700", children: [_jsx("span", { className: "h-0.5 w-4 rounded-full bg-red-400" }), " D\u00E9penses"] })] }), _jsxs("svg", { width: "100%", viewBox: `0 0 ${WIDTH} ${HEIGHT}`, role: "img", "aria-label": "\u00C9volution mensuelle des revenus et d\u00E9penses", children: [_jsx("line", { x1: PADDING, y1: HEIGHT - PADDING, x2: WIDTH - PADDING, y2: HEIGHT - PADDING, stroke: "#e5e7eb", strokeWidth: 1 }), _jsx("path", { d: incomePath, fill: "none", stroke: "#0684f5", strokeWidth: 2, strokeLinecap: "round" }), _jsx("path", { d: expensesPath, fill: "none", stroke: "#f87171", strokeWidth: 2, strokeLinecap: "round" }), points.map((point, index) => (_jsx("text", { x: PADDING + index * stepX, y: HEIGHT - PADDING + 16, textAnchor: "middle", className: "fill-gray-400 text-[10px]", children: formatMonth(point.month).split(' ')[0] }, point.month)))] }), last ? (_jsxs("p", { className: "text-xs text-gray-400", children: ["Dernier mois : ", formatMoney(last.income), " de revenus, ", formatMoney(last.expenses), " de d\u00E9penses"] })) : null] }));
}
