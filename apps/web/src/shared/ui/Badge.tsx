import type { ReactNode } from 'react';

type Variant = 'info' | 'success' | 'danger' | 'warning' | 'neutral';

type Props = {
  variant?: Variant;
  children: ReactNode;
};

const VARIANT_CLASSES: Record<Variant, string> = {
  info: 'bg-primary-bg text-primary-text',
  success: 'bg-success-bg text-success-hover',
  danger: 'bg-danger-bg text-danger-hover',
  warning: 'bg-warning-bg text-warning-hover',
  neutral: 'bg-surface-1 text-text-secondary',
};

export function Badge({ variant = 'neutral', children }: Props) {
  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5
        text-xs font-medium rounded-full
        ${VARIANT_CLASSES[variant]}
      `}
    >
      {children}
    </span>
  );
}