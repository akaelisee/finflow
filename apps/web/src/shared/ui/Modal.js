import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/shared/lib/cn';
export function Modal({ isOpen, onClose, title, children, className }) {
    useEffect(() => {
        if (!isOpen)
            return;
        const onKeyDown = (event) => {
            if (event.key === 'Escape')
                onClose();
        };
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [isOpen, onClose]);
    if (!isOpen)
        return null;
    return createPortal(_jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: [_jsx("div", { className: "absolute inset-0 bg-black/40", onClick: onClose, "aria-hidden": "true" }), _jsxs("div", { role: "dialog", "aria-modal": "true", "aria-label": title, className: cn('relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl', className), children: [title ? _jsx("h2", { className: "mb-4 text-lg font-semibold text-gray-900", children: title }) : null, children] })] }), document.body);
}
