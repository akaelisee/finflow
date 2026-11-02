import { createBrowserRouter } from 'react-router-dom';
import { DashboardLayout } from '../shared/layout/DashboardLayout';
import { DashboardPage } from '../pages/DashboardPage';
import { TransactionsPage } from '../pages/TransactionsPage';
import { TransactionDetailPage } from '../pages/TransactionDetailPage';
import { AccountsPage } from '../pages/AccountsPage';
import { BudgetsPage } from '../pages/BudgetsPage';
import { CategoriesPage } from '../pages/CategoriesPage';
import { SettingsPage } from '../pages/SettingsPage';
import { HelpPage } from '../pages/HelpPage';
import { ImportCsvPage } from '../pages/ImportCsvPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { BudgetDetailPage } from '@/pages/BudgetDetailPage';
import { AccountDetailPage } from '@/pages/AccountDetailPage';

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  {
    path: '/',
    element: <DashboardLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'transactions', element: <TransactionsPage /> },
      {path:'transactions/:id', element: <TransactionDetailPage />},
      { path: 'accounts', element: <AccountsPage /> },
      { path: 'accounts/:id', element: <AccountDetailPage /> },
      { path: 'imports', element: <ImportCsvPage /> },
      { path: 'budgets', element: <BudgetsPage /> },
      { path: 'budgets/:id', element: <BudgetDetailPage /> },
      { path: 'categories', element: <CategoriesPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: 'help', element: <HelpPage /> },
    ],
  },
]);