import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input, Select } from '@/shared/ui';
import { useAccounts } from '@/features/accounts';
import { useCategories } from '@/features/categories';
import { useTransactionsFilterStore } from '../stores/transactionsFilterStore';
export function TransactionFilters() {
    const { data: accounts } = useAccounts();
    const { data: categories } = useCategories();
    const accountId = useTransactionsFilterStore((state) => state.accountId);
    const categoryId = useTransactionsFilterStore((state) => state.categoryId);
    const search = useTransactionsFilterStore((state) => state.search);
    const setAccountId = useTransactionsFilterStore((state) => state.setAccountId);
    const setCategoryId = useTransactionsFilterStore((state) => state.setCategoryId);
    const setSearch = useTransactionsFilterStore((state) => state.setSearch);
    return (_jsxs("div", { className: "flex flex-wrap gap-3", children: [_jsx(Input, { placeholder: "Rechercher\u2026", value: search, onChange: (event) => setSearch(event.target.value), className: "w-56" }), _jsx(Select, { placeholder: "Tous les comptes", value: accountId ?? '', onChange: (event) => setAccountId(event.target.value || null), options: (accounts ?? []).map((account) => ({ value: account.id, label: account.name })), className: "w-48" }), _jsx(Select, { placeholder: "Toutes les cat\u00E9gories", value: categoryId ?? '', onChange: (event) => setCategoryId(event.target.value || null), options: (categories ?? []).map((category) => ({ value: category.id, label: category.name })), className: "w-48" })] }));
}
