import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/shared/lib/cn';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  side?: 'left' | 'right';
}

export function Drawer({ isOpen, onClose, title, children, side = 'right' }: DrawerProps) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          'absolute top-0 h-full w-full max-w-sm bg-white shadow-xl',
          'flex flex-col overflow-y-auto',
          side === 'right' ? 'right-0' : 'left-0',
        )}
      >
        {title ? (
          <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md p-1 text-gray-500 hover:bg-gray-100"
              aria-label="Fermer"
            >
              ✕
            </button>
          </div>
        ) : null}
        <div className="flex-1 p-4">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
