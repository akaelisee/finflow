import { create } from 'zustand';

interface TransactionsFilterState {
  accountId: string | null;
  categoryId: string | null;
  search: string;
  setAccountId: (accountId: string | null) => void;
  setCategoryId: (categoryId: string | null) => void;
  setSearch: (search: string) => void;
  reset: () => void;
}

const initialFilters = {
  accountId: null,
  categoryId: null,
  search: '',
};

export const useTransactionsFilterStore = create<TransactionsFilterState>((set) => ({
  ...initialFilters,
  setAccountId: (accountId) => set({ accountId }),
  setCategoryId: (categoryId) => set({ categoryId }),
  setSearch: (search) => set({ search }),
  reset: () => set(initialFilters),
}));
