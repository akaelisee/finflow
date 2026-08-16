import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import DashboardLayout from '@/layouts/dashboardLayout';
import Transaction from './pages/transaction';
import Comptes from './pages/compte';
import Budgets from './pages/budget';
import Dashboard from './pages/dashboard'
import App from './App';

export const Router = () => {
  return (
        <Routes>
            {/* <Route path="/" element={<App />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<DashboardLayout />}>

              <Route index element={<Dashboard />} />

              <Route 
                path="transaction" 
                element={<Transaction />} 
                />
              <Route
                path="accounts"
                element={<Comptes />}
              />

              <Route
                path="budgets"
                element={<Budgets />}
              />

          </Route>
        </Routes>
  );
}