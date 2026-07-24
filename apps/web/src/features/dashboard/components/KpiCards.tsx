import { formatMoney } from '@/shared/lib/formatMoney';
import { Skeleton } from '@/shared/ui';
import type { Kpis } from '../api/analyticsApi';

interface KpiCardsProps {
  kpis: Kpis | undefined;
  isLoading: boolean;
}

const moneyCards = [
  { key: 'totalBalance', label: 'Solde total' },
  { key: 'monthlyIncome', label: 'Revenus du mois' },
  { key: 'monthlyExpenses', label: 'Dépenses du mois' },
] as const;

export function KpiCards({ kpis, isLoading }: KpiCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {moneyCards.map((card) => (
        <div key={card.key} className="rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-500">{card.label}</p>
          {isLoading || !kpis ? (
            <Skeleton className="mt-2 h-8 w-24" />
          ) : (
            <p className="mt-1 text-2xl font-bold text-gray-900">{formatMoney(kpis[card.key])}</p>
          )}
        </div>
      ))}
      <div className="rounded-lg border border-gray-200 p-4">
        <p className="text-sm text-gray-500">Taux d'épargne</p>
        {isLoading || !kpis ? (
          <Skeleton className="mt-2 h-8 w-24" />
        ) : (
          <p className="mt-1 text-2xl font-bold text-gray-900">{Math.round(kpis.savingsRate * 100)}%</p>
        )}
      </div>
    </div>
  );
}
