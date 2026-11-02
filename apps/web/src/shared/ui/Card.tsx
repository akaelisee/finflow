import type { ReactNode } from 'react';

type Variant = 'default' | 'metric';

type Props = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

export function Card({ variant = 'default', children, className = '' }: Props) {
  const base = 'rounded-lg';
  const variantClasses = {
    default: 'bg-surface-2 border border-border p-4',
    metric: 'bg-surface-1 p-3.5',
  };

  return (
    <div className={`${base} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
}