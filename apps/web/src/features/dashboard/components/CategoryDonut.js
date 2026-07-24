import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { formatMoney } from '@/shared/lib/formatMoney';
import { Skeleton, EmptyState } from '@/shared/ui';
const SIZE = 160;
const STROKE = 20;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
export function CategoryDonut({ data, isLoading }) {
    if (isLoading)
        return _jsx(Skeleton, { className: "size-40 rounded-full" });
    if (!data || data.length === 0) {
        return _jsx(EmptyState, { title: "Aucune d\u00E9pense", description: "Aucune d\u00E9pense cat\u00E9goris\u00E9e ce mois-ci." });
    }
    const total = data.reduce((sum, item) => sum + item.total, 0);
    const segments = data.reduce((acc, item) => {
        const fraction = total > 0 ? item.total / total : 0;
        const dash = fraction * CIRCUMFERENCE;
        const previousOffset = acc.length > 0 ? acc[acc.length - 1].offset + acc[acc.length - 1].dash : 0;
        return [...acc, { item, dash, offset: previousOffset }];
    }, []);
    return (_jsxs("div", { className: "flex flex-col items-center gap-4 sm:flex-row", children: [_jsx("svg", { width: SIZE, height: SIZE, viewBox: `0 0 ${SIZE} ${SIZE}`, role: "img", "aria-label": "R\u00E9partition des d\u00E9penses par cat\u00E9gorie", className: "shrink-0", children: _jsxs("g", { transform: `rotate(-90 ${SIZE / 2} ${SIZE / 2})`, children: [_jsx("circle", { cx: SIZE / 2, cy: SIZE / 2, r: RADIUS, fill: "none", stroke: "#e5e7eb", strokeWidth: STROKE }), segments.map(({ item, dash, offset: segmentOffset }) => (_jsx("circle", { cx: SIZE / 2, cy: SIZE / 2, r: RADIUS, fill: "none", stroke: item.color, strokeWidth: STROKE, strokeDasharray: `${dash} ${CIRCUMFERENCE - dash}`, strokeDashoffset: -segmentOffset }, item.categoryId)))] }) }), _jsx("ul", { className: "flex flex-col gap-1.5 text-sm", children: data.map((item) => (_jsxs("li", { className: "flex items-center gap-2", children: [_jsx("span", { className: "size-2.5 shrink-0 rounded-full", style: { backgroundColor: item.color }, "aria-hidden": "true" }), _jsx("span", { className: "text-gray-700", children: item.categoryName }), _jsx("span", { className: "ml-auto font-medium text-gray-900", children: formatMoney(item.total) })] }, item.categoryId))) })] }));
}
