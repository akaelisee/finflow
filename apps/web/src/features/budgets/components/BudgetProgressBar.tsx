import { cn } from '@/shared/lib/cn';

interface BudgetProgressBarProps {
  percentUsed: number;
}

export function BudgetProgressBar({ percentUsed }: BudgetProgressBarProps) {
  const isOverBudget = percentUsed >= 100;

  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
      <div
        className={cn('h-full rounded-full transition-all', isOverBudget ? 'bg-red-500' : 'bg-brand-500')}
        style={{ width: `${Math.min(100, percentUsed)}%` }}
      />
    </div>
  );
}
