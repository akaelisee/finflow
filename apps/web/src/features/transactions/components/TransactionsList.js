import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { EmptyState, Skeleton } from '@/shared/ui';
import { TransactionRow } from './TransactionRow';
export function TransactionsList({ transactions, isLoading, onDelete }) {
    if (isLoading) {
        return (_jsx("div", { className: "flex flex-col gap-2", children: Array.from({ length: 5 }).map((_, index) => (_jsx(Skeleton, { className: "h-10" }, index))) }));
    }
    if (transactions.length === 0) {
        return _jsx(EmptyState, { title: "Aucune transaction", description: "Ajoutez une transaction ou importez un fichier CSV." });
    }
    return (_jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b border-gray-200 text-left text-xs uppercase text-gray-400", children: [_jsx("th", { className: "pb-2 pr-4 font-medium", children: "Date" }), _jsx("th", { className: "pb-2 pr-4 font-medium", children: "Libell\u00E9" }), _jsx("th", { className: "pb-2 pr-4 text-right font-medium", children: "Montant" }), _jsx("th", { className: "pb-2" })] }) }), _jsx("tbody", { children: transactions.map((transaction) => (_jsx(TransactionRow, { transaction: transaction, ...(onDelete ? { onDelete: () => onDelete(transaction.id) } : {}) }, transaction.id))) })] }));
}
