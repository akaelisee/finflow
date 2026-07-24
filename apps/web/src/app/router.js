import { jsx as _jsx } from "react/jsx-runtime";
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/features/auth';
import { AppLayout } from '@/pages/AppLayout';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { AccountsPage } from '@/pages/AccountsPage';
import { TransactionsPage } from '@/pages/TransactionsPage';
import { BudgetsPage } from '@/pages/BudgetsPage';
import { ImportPage } from '@/pages/ImportPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
// eslint-disable-next-line react-refresh/only-export-components -- route guard lives next to the router it guards
function ProtectedRoute() {
    const isAuthenticated = useAuthStore((state) => state.accessToken !== null);
    return isAuthenticated ? _jsx(Outlet, {}) : _jsx(Navigate, { to: "/login", replace: true });
}
export const router = createBrowserRouter([
    { path: '/login', element: _jsx(LoginPage, {}) },
    { path: '/register', element: _jsx(RegisterPage, {}) },
    {
        element: _jsx(ProtectedRoute, {}),
        children: [
            {
                element: _jsx(AppLayout, {}),
                children: [
                    { index: true, element: _jsx(Navigate, { to: "/dashboard", replace: true }) },
                    { path: 'dashboard', element: _jsx(DashboardPage, {}) },
                    { path: 'accounts', element: _jsx(AccountsPage, {}) },
                    { path: 'transactions', element: _jsx(TransactionsPage, {}) },
                    { path: 'budgets', element: _jsx(BudgetsPage, {}) },
                    { path: 'import', element: _jsx(ImportPage, {}) },
                ],
            },
        ],
    },
    { path: '*', element: _jsx(NotFoundPage, {}) },
]);
