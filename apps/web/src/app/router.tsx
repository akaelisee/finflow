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
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { index: true, element: <Navigate to="/dashboard" replace /> },
          { path: 'dashboard', element: <DashboardPage /> },
          { path: 'accounts', element: <AccountsPage /> },
          { path: 'transactions', element: <TransactionsPage /> },
          { path: 'budgets', element: <BudgetsPage /> },
          { path: 'import', element: <ImportPage /> },
        ],
      },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
]);
