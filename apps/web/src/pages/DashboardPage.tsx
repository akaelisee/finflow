import { currentMonth } from '@/shared/lib/formatDate';
import { useAnalytics, KpiCards, CategoryDonut, MonthlyLineChart } from '@/features/dashboard';

export function DashboardPage() {
  const month = currentMonth();
  const { kpis, byCategory, monthly } = useAnalytics(month);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
      <KpiCards kpis={kpis.data} isLoading={kpis.isLoading} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h2 className="mb-4 text-base font-semibold text-gray-900">Dépenses par catégorie</h2>
          <CategoryDonut data={byCategory.data} isLoading={byCategory.isLoading} />
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h2 className="mb-4 text-base font-semibold text-gray-900">Évolution mensuelle</h2>
          <MonthlyLineChart data={monthly.data} isLoading={monthly.isLoading} />
        </div>
      </div>
    </div>
  );
}
