import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { formatMoney } from '@/shared/lib/formatMoney';
import { formatDate } from '@/shared/lib/formatDate';
import { cn } from '@/shared/lib/cn';
export function TransactionRow({ transaction, onDelete }) {
    const isExpense = transaction.amount < 0;
    return (_jsxs("tr", { className: "border-b border-gray-100", children: [_jsx("td", { className: "py-2 pr-4 text-sm text-gray-500", children: formatDate(transaction.transactionDate) }), _jsx("td", { className: "py-2 pr-4 text-sm text-gray-900", children: transaction.label }), _jsx("td", { className: cn('py-2 pr-4 text-right text-sm font-medium', isExpense ? 'text-red-600' : 'text-green-600'), children: formatMoney(transaction.amount) }), _jsx("td", { className: "py-2 text-right", children: onDelete ? (_jsx("button", { type: "button", onClick: onDelete, className: "text-sm text-gray-400 hover:text-red-600", children: "Supprimer" })) : null })] }));
}
