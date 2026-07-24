import { formatMoney } from '@/shared/lib/formatMoney';
import { Skeleton, EmptyState } from '@/shared/ui';
import type { CategoryBreakdown } from '../api/analyticsApi';

interface CategoryDonutProps {
  data: CategoryBreakdown[] | undefined;
  isLoading: boolean;
}

const SIZE = 160;
const STROKE = 20;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function CategoryDonut({ data, isLoading }: CategoryDonutProps) {
  if (isLoading) return <Skeleton className="size-40 rounded-full" />;
  if (!data || data.length === 0) {
    return <EmptyState title="Aucune dépense" description="Aucune dépense catégorisée ce mois-ci." />;
  }

  const total = data.reduce((sum, item) => sum + item.total, 0);
  const segments = data.reduce<{ item: CategoryBreakdown; dash: number; offset: number }[]>((acc, item) => {
    const fraction = total > 0 ? item.total / total : 0;
    const dash = fraction * CIRCUMFERENCE;
    const previousOffset = acc.length > 0 ? acc[acc.length - 1]!.offset + acc[acc.length - 1]!.dash : 0;
    return [...acc, { item, dash, offset: previousOffset }];
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label="Répartition des dépenses par catégorie" className="shrink-0">
        <g transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}>
          <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} fill="none" stroke="#e5e7eb" strokeWidth={STROKE} />
          {segments.map(({ item, dash, offset: segmentOffset }) => (
            <circle
              key={item.categoryId}
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke={item.color}
              strokeWidth={STROKE}
              strokeDasharray={`${dash} ${CIRCUMFERENCE - dash}`}
              strokeDashoffset={-segmentOffset}
            />
          ))}
        </g>
      </svg>
      <ul className="flex flex-col gap-1.5 text-sm">
        {data.map((item) => (
          <li key={item.categoryId} className="flex items-center gap-2">
            <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: item.color }} aria-hidden="true" />
            <span className="text-gray-700">{item.categoryName}</span>
            <span className="ml-auto font-medium text-gray-900">{formatMoney(item.total)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
