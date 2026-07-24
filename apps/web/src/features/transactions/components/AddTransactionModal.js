import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Modal, Button, Input, Select, toast } from '@/shared/ui';
import { useAccounts } from '@/features/accounts';
import { CategoryPicker } from '@/features/categories';
import { useCreateTransaction } from '../hooks/useCreateTransaction';
export function AddTransactionModal({ isOpen, onClose }) {
    const { data: accounts } = useAccounts();
    const [accountId, setAccountId] = useState('');
    const [categoryId, setCategoryId] = useState(null);
    const [label, setLabel] = useState('');
    const [amount, setAmount] = useState('');
    const [transactionDate, setTransactionDate] = useState(() => new Date().toISOString().slice(0, 10));
    const createTransaction = useCreateTransaction();
    const handleSubmit = (event) => {
        event.preventDefault();
        createTransaction.mutate({
            accountId,
            categoryId,
            label,
            amount: Math.round(Number(amount) * 100),
            transactionDate,
        }, {
            onSuccess: () => {
                toast('Transaction ajoutée', 'success');
                onClose();
            },
            onError: () => toast("Impossible d'ajouter la transaction", 'error'),
        });
    };
    return (_jsx(Modal, { isOpen: isOpen, onClose: onClose, title: "Ajouter une transaction", children: _jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-4", children: [_jsx(Select, { label: "Compte", value: accountId, onChange: (event) => setAccountId(event.target.value), placeholder: "S\u00E9lectionner un compte", options: (accounts ?? []).map((account) => ({ value: account.id, label: account.name })), required: true }), _jsx(CategoryPicker, { value: categoryId, onChange: setCategoryId }), _jsx(Input, { label: "Libell\u00E9", value: label, onChange: (event) => setLabel(event.target.value), required: true }), _jsx(Input, { label: "Montant (\u20AC, n\u00E9gatif pour une d\u00E9pense)", type: "number", step: "0.01", value: amount, onChange: (event) => setAmount(event.target.value), required: true }), _jsx(Input, { label: "Date", type: "date", value: transactionDate, onChange: (event) => setTransactionDate(event.target.value), required: true }), _jsx(Button, { type: "submit", isLoading: createTransaction.isPending, children: "Ajouter" })] }) }));
}
