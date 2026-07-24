import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink, Outlet } from 'react-router-dom';
import { cn } from '@/shared/lib/cn';
import { Avatar } from '@/shared/ui';
import { useAuthStore } from '@/features/auth';
const navItems = [
    { to: '/dashboard', label: 'Tableau de bord' },
    { to: '/accounts', label: 'Comptes' },
    { to: '/transactions', label: 'Transactions' },
    { to: '/budgets', label: 'Budgets' },
    { to: '/import', label: 'Import' },
];
export function AppLayout() {
    const user = useAuthStore((state) => state.user);
    const clearSession = useAuthStore((state) => state.clearSession);
    return (_jsxs("div", { className: "flex min-h-screen", children: [_jsxs("aside", { className: "flex w-60 shrink-0 flex-col border-r border-gray-200 bg-white p-4", children: [_jsx("div", { className: "mb-6 px-2 text-xl font-bold text-brand-600", children: "FinFlow" }), _jsx("nav", { className: "flex flex-col gap-1", children: navItems.map((item) => (_jsx(NavLink, { to: item.to, className: ({ isActive }) => cn('rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100', isActive && 'bg-brand-50 text-brand-700'), children: item.label }, item.to))) })] }), _jsxs("div", { className: "flex flex-1 flex-col", children: [_jsxs("header", { className: "flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3", children: [_jsx("div", {}), _jsxs("div", { className: "flex items-center gap-3", children: [user ? _jsx(Avatar, { name: user.name, size: "sm" }) : null, _jsx("span", { className: "text-sm font-medium text-gray-700", children: user?.name }), _jsx("button", { type: "button", onClick: clearSession, className: "text-sm text-gray-400 hover:text-gray-700", children: "D\u00E9connexion" })] })] }), _jsx("main", { className: "flex-1 bg-gray-50 p-6", children: _jsx(Outlet, {}) })] })] }));
}
