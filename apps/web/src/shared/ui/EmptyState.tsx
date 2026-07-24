import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 px-6 py-12 text-center">
      <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      {description ? <p className="max-w-sm text-sm text-gray-500">{description}</p> : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}
