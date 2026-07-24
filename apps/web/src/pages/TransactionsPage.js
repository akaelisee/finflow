import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useTransactions, useDeleteTransaction, useTransactionsFilterStore, TransactionsList, TransactionFilters, AddTransactionModal, } from '@/features/transactions';
import { useDebounce } from '@/shared/hooks';
import { Button } from '@/shared/ui';
export function TransactionsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const accountId = useTransactionsFilterStore((state) => state.accountId);
    const categoryId = useTransactionsFilterStore((state) => state.categoryId);
    const search = useTransactionsFilterStore((state) => state.search);
    const debouncedSearch = useDebounce(search);
    const { data: transactions, isLoading } = useTransactions({ accountId, categoryId, search: debouncedSearch });
    const deleteTransaction = useDeleteTransaction();
    return (_jsxs("div", { className: "flex flex-col gap-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Transactions" }), _jsx(Button, { onClick: () => setIsModalOpen(true), children: "Ajouter une transaction" })] }), _jsx(TransactionFilters, {}), _jsx("div", { className: "rounded-lg border border-gray-200 bg-white p-4", children: _jsx(TransactionsList, { transactions: transactions ?? [], isLoading: isLoading, onDelete: (id) => deleteTransaction.mutate(id) }) }), _jsx(AddTransactionModal, { isOpen: isModalOpen, onClose: () => setIsModalOpen(false) })] }));
}
