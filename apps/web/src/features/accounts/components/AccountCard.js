import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from '@/shared/ui';
import { formatMoney } from '@/shared/lib/formatMoney';
const typeLabels = {
    CHECKING: 'Compte courant',
    SAVINGS: 'Épargne',
    CREDIT: 'Crédit',
};
export function AccountCard({ account, onClick }) {
    return (_jsxs("button", { type: "button", onClick: onClick, className: "flex w-full flex-col gap-2 rounded-lg border border-gray-200 border-l-4 p-4 text-left transition-shadow hover:shadow-md", style: { borderLeftColor: account.color }, children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "font-semibold text-gray-900", children: account.name }), _jsx(Badge, { variant: "neutral", children: typeLabels[account.type] })] }), _jsx("span", { className: "text-sm text-gray-500", children: account.bank }), _jsx("span", { className: "text-lg font-bold text-gray-900", children: formatMoney(account.initialBalance, account.currency) })] }));
}
