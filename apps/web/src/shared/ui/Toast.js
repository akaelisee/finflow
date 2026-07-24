import { jsx as _jsx } from "react/jsx-runtime";
import { create } from 'zustand';
import { cn } from '@/shared/lib/cn';
const useToastStore = create((set) => ({
    toasts: [],
    push: (message, variant = 'info') => {
        const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
        set((state) => ({ toasts: [...state.toasts, { id, message, variant }] }));
        setTimeout(() => {
            set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) }));
        }, 4000);
    },
    dismiss: (id) => set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) })),
}));
// eslint-disable-next-line react-refresh/only-export-components -- tiny self-contained toast module (store + trigger + view)
export function toast(message, variant) {
    useToastStore.getState().push(message, variant);
}
const variantClasses = {
    success: 'bg-green-600 text-white',
    error: 'bg-red-600 text-white',
    info: 'bg-gray-900 text-white',
};
export function ToastContainer() {
    const toasts = useToastStore((state) => state.toasts);
    const dismiss = useToastStore((state) => state.dismiss);
    return (_jsx("div", { className: "fixed bottom-4 right-4 z-[100] flex flex-col gap-2", children: toasts.map((item) => (_jsx("button", { type: "button", onClick: () => dismiss(item.id), className: cn('rounded-md px-4 py-2 text-left text-sm shadow-lg', variantClasses[item.variant]), children: item.message }, item.id))) }));
}
