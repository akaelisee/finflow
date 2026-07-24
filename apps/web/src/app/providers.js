import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queryClient';
import { ToastContainer } from '@/shared/ui';
export function Providers({ children }) {
    return (_jsxs(QueryClientProvider, { client: queryClient, children: [children, _jsx(ToastContainer, {})] }));
}
