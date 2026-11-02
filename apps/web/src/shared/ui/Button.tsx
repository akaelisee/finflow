import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  children: ReactNode;
};

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-hover border-transparent',
  secondary: 'bg-surface-2 text-text-primary border-border hover:border-border-strong',
  ghost: 'bg-transparent text-primary border-transparent hover:bg-primary-bg',
  danger: 'bg-danger text-white hover:bg-danger-hover border-transparent',
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: 'h-7 px-2.5 text-xs',
  md: 'h-9 px-3.5 text-sm',
  lg: 'h-11 px-4.5 text-base',
};

export function Button({
  variant = 'secondary',
  size = 'md',
  icon,
  children,
  className = '',
  ...rest
}: Props) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        rounded-md border font-medium
        transition-colors cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${VARIANT_CLASSES[variant]}
        ${SIZE_CLASSES[size]}
        ${className}
      `}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
}