import { formatMoney } from '@/shared/lib/formatMoney';
import { formatMonth } from '@/shared/lib/formatDate';
import { Skeleton, EmptyState } from '@/shared/ui';
import type { MonthlyPoint } from '../api/analyticsApi';

interface MonthlyLineChartProps {
  data: MonthlyPoint[] | undefined;
  isLoading: boolean;
}

const WIDTH = 480;
const HEIGHT = 220;
const PADDING = 32;

function buildPath(values: number[], max: number): string {
  if (values.length === 0) return '';
  const stepX = (WIDTH - PADDING * 2) / Math.max(1, values.length - 1);
  return values
    .map((value, index) => {
      const x = PADDING + index * stepX;
      const y = HEIGHT - PADDING - (max > 0 ? (value / max) * (HEIGHT - PADDING * 2) : 0);
      return `${index === 0 ? 'M' : 'L'}${x},${y}`;
    })
    .join(' ');
}

export function MonthlyLineChart({ data, isLoading }: MonthlyLineChartProps) {
  const points = data ?? [];
  const max = Math.max(1, ...points.flatMap((point) => [point.income, point.expenses]));

  if (isLoading) return <Skeleton className="h-56 w-full" />;
  if (points.length === 0) {
    return (
      <EmptyState
        title="Pas encore de données"
        description="L'historique s'affichera après quelques mois d'activité."
      />
    );
  }

  const incomePath = buildPath(points.map((point) => point.income), max);
  const expensesPath = buildPath(points.map((point) => point.expenses), max);
  const stepX = (WIDTH - PADDING * 2) / Math.max(1, points.length - 1);
  const last = points[points.length - 1];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-4 text-sm">
        <span className="flex items-center gap-1.5 text-gray-700">
          <span className="h-0.5 w-4 rounded-full bg-brand-500" /> Revenus
        </span>
        <span className="flex items-center gap-1.5 text-gray-700">
          <span className="h-0.5 w-4 rounded-full bg-red-400" /> Dépenses
        </span>
      </div>
      <svg
        width="100%"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label="Évolution mensuelle des revenus et dépenses"
      >
        <line
          x1={PADDING}
          y1={HEIGHT - PADDING}
          x2={WIDTH - PADDING}
          y2={HEIGHT - PADDING}
          stroke="#e5e7eb"
          strokeWidth={1}
        />
        <path d={incomePath} fill="none" stroke="#0684f5" strokeWidth={2} strokeLinecap="round" />
        <path d={expensesPath} fill="none" stroke="#f87171" strokeWidth={2} strokeLinecap="round" />
        {points.map((point, index) => (
          <text
            key={point.month}
            x={PADDING + index * stepX}
            y={HEIGHT - PADDING + 16}
            textAnchor="middle"
            className="fill-gray-400 text-[10px]"
          >
            {formatMonth(point.month).split(' ')[0]}
          </text>
        ))}
      </svg>
      {last ? (
        <p className="text-xs text-gray-400">
          Dernier mois : {formatMoney(last.income)} de revenus, {formatMoney(last.expenses)} de dépenses
        </p>
      ) : null}
    </div>
  );
}
