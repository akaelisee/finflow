import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { currentMonth } from '@/shared/lib/formatDate';
import { useBudgets, BudgetsList, AddBudgetModal } from '@/features/budgets';
import { useTransactions } from '@/features/transactions';
import { Button } from '@/shared/ui';
export function BudgetsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const month = currentMonth();
    const { data: budgets, isLoading: isLoadingBudgets } = useBudgets(month);
    const { data: transactions, isLoading: isLoadingTransactions } = useTransactions({ from: `${month}-01` });
    return (_jsxs("div", { className: "flex flex-col gap-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Budgets" }), _jsx(Button, { onClick: () => setIsModalOpen(true), children: "Ajouter un budget" })] }), _jsx(BudgetsList, { budgets: budgets ?? [], transactions: transactions ?? [], isLoading: isLoadingBudgets || isLoadingTransactions }), _jsx(AddBudgetModal, { isOpen: isModalOpen, onClose: () => setIsModalOpen(false) })] }));
}
