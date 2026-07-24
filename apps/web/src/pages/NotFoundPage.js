import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
export function NotFoundPage() {
    return (_jsxs("div", { className: "flex min-h-screen flex-col items-center justify-center gap-2 text-center", children: [_jsx("h1", { className: "text-4xl font-bold text-gray-900", children: "404" }), _jsx("p", { className: "text-gray-500", children: "Cette page n'existe pas." }), _jsx(Link, { to: "/", className: "mt-4 text-brand-600 hover:underline", children: "Retour \u00E0 l'accueil" })] }));
}
