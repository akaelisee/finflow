import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createPortal } from 'react-dom';
import { cn } from '@/shared/lib/cn';
export function Drawer({ isOpen, onClose, title, children, side = 'right' }) {
    if (!isOpen)
        return null;
    return createPortal(_jsxs("div", { className: "fixed inset-0 z-50", children: [_jsx("div", { className: "absolute inset-0 bg-black/40", onClick: onClose, "aria-hidden": "true" }), _jsxs("div", { role: "dialog", "aria-modal": "true", "aria-label": title, className: cn('absolute top-0 h-full w-full max-w-sm bg-white shadow-xl', 'flex flex-col overflow-y-auto', side === 'right' ? 'right-0' : 'left-0'), children: [title ? (_jsxs("div", { className: "flex items-center justify-between border-b border-gray-200 px-4 py-3", children: [_jsx("h2", { className: "text-lg font-semibold text-gray-900", children: title }), _jsx("button", { type: "button", onClick: onClose, className: "rounded-md p-1 text-gray-500 hover:bg-gray-100", "aria-label": "Fermer", children: "\u2715" })] })) : null, _jsx("div", { className: "flex-1 p-4", children: children })] })] }), document.body);
}
