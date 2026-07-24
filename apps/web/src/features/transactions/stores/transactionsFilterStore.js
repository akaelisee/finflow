import { create } from 'zustand';
const initialFilters = {
    accountId: null,
    categoryId: null,
    search: '',
};
export const useTransactionsFilterStore = create((set) => ({
    ...initialFilters,
    setAccountId: (accountId) => set({ accountId }),
    setCategoryId: (categoryId) => set({ categoryId }),
    setSearch: (search) => set({ search }),
    reset: () => set(initialFilters),
}));
