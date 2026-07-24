import { jsx as _jsx } from "react/jsx-runtime";
import { EmptyState, Skeleton } from '@/shared/ui';
import { AccountCard } from './AccountCard';
export function AccountsList({ accounts, isLoading, onSelect }) {
    if (isLoading) {
        return (_jsx("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3", children: Array.from({ length: 3 }).map((_, index) => (_jsx(Skeleton, { className: "h-32" }, index))) }));
    }
    if (accounts.length === 0) {
        return _jsx(EmptyState, { title: "Aucun compte", description: "Ajoutez votre premier compte bancaire pour commencer." });
    }
    return (_jsx("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3", children: accounts.map((account) => (_jsx(AccountCard, { account: account, onClick: () => onSelect?.(account) }, account.id))) }));
}
