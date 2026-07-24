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

  return (
    <div className="flex flex-wrap gap-3">
      <Input
        placeholder="Rechercher…"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className="w-56"
      />
      <Select
        placeholder="Tous les comptes"
        value={accountId ?? ''}
        onChange={(event) => setAccountId(event.target.value || null)}
        options={(accounts ?? []).map((account) => ({ value: account.id, label: account.name }))}
        className="w-48"
      />
      <Select
        placeholder="Toutes les catégories"
        value={categoryId ?? ''}
        onChange={(event) => setCategoryId(event.target.value || null)}
        options={(categories ?? []).map((category) => ({ value: category.id, label: category.name }))}
        className="w-48"
      />
    </div>
  );
}
