import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { LoginForm } from '@/features/auth';
export function LoginPage() {
    return (_jsx("div", { className: "flex min-h-screen items-center justify-center bg-gray-50 px-4", children: _jsxs("div", { className: "w-full max-w-sm rounded-lg border border-gray-200 bg-white p-8", children: [_jsx("h1", { className: "mb-6 text-xl font-bold text-gray-900", children: "Connexion \u00E0 FinFlow" }), _jsx(LoginForm, {}), _jsxs("p", { className: "mt-4 text-center text-sm text-gray-500", children: ["Pas encore de compte ?", ' ', _jsx(Link, { to: "/register", className: "font-medium text-brand-600 hover:underline", children: "Cr\u00E9er un compte" })] })] }) }));
}
