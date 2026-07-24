import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function EmptyState({ title, description, action }) {
    return (_jsxs("div", { className: "flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 px-6 py-12 text-center", children: [_jsx("h3", { className: "text-base font-semibold text-gray-900", children: title }), description ? _jsx("p", { className: "max-w-sm text-sm text-gray-500", children: description }) : null, action ? _jsx("div", { className: "mt-2", children: action }) : null] }));
}
