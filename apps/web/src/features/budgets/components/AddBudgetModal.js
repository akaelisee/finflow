import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Modal, Button, Input, toast } from '@/shared/ui';
import { CategoryPicker } from '@/features/categories';
import { currentMonth } from '@/shared/lib/formatDate';
import { budgetsApi } from '../api/budgetsApi';
export function AddBudgetModal({ isOpen, onClose }) {
    const [categoryId, setCategoryId] = useState(null);
    const [amount, setAmount] = useState('0');
    const queryClient = useQueryClient();
    const month = currentMonth();
    const createBudget = useMutation({
        mutationFn: budgetsApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['budgets'] });
            toast('Budget créé', 'success');
            onClose();
        },
        onError: () => toast('Impossible de créer le budget', 'error'),
    });
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!categoryId)
            return;
        createBudget.mutate({ categoryId, month, amount: Math.round(Number(amount) * 100) });
    };
    return (_jsx(Modal, { isOpen: isOpen, onClose: onClose, title: "Ajouter un budget", children: _jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-4", children: [_jsx(CategoryPicker, { value: categoryId, onChange: setCategoryId }), _jsx(Input, { label: "Montant mensuel (\u20AC)", type: "number", step: "0.01", value: amount, onChange: (event) => setAmount(event.target.value), required: true }), _jsx(Button, { type: "submit", isLoading: createBudget.isPending, children: "Ajouter" })] }) }));
}
