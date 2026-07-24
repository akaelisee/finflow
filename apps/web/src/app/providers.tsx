import type { ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queryClient';
import { ToastContainer } from '@/shared/ui';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ToastContainer />
    </QueryClientProvider>
  );
}
