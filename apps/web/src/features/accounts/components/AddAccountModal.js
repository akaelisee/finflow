import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Modal, Button, Input, Select, toast } from '@/shared/ui';
import { useCreateAccount } from '../hooks/useCreateAccount';
const typeOptions = [
    { value: 'CHECKING', label: 'Compte courant' },
    { value: 'SAVINGS', label: 'Épargne' },
    { value: 'CREDIT', label: 'Crédit' },
];
export function AddAccountModal({ isOpen, onClose }) {
    const [name, setName] = useState('');
    const [bank, setBank] = useState('');
    const [type, setType] = useState('CHECKING');
    const [initialBalance, setInitialBalance] = useState('0');
    const createAccount = useCreateAccount();
    const handleSubmit = (event) => {
        event.preventDefault();
        createAccount.mutate({ name, bank, type, initialBalance: Math.round(Number(initialBalance) * 100) }, {
            onSuccess: () => {
                toast('Compte créé', 'success');
                onClose();
            },
            onError: () => toast('Impossible de créer le compte', 'error'),
        });
    };
    return (_jsx(Modal, { isOpen: isOpen, onClose: onClose, title: "Ajouter un compte", children: _jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-4", children: [_jsx(Input, { label: "Nom du compte", value: name, onChange: (event) => setName(event.target.value), required: true }), _jsx(Input, { label: "Banque", value: bank, onChange: (event) => setBank(event.target.value), required: true }), _jsx(Select, { label: "Type", options: typeOptions, value: type, onChange: (event) => setType(event.target.value) }), _jsx(Input, { label: "Solde initial (\u20AC)", type: "number", step: "0.01", value: initialBalance, onChange: (event) => setInitialBalance(event.target.value) }), _jsx(Button, { type: "submit", isLoading: createAccount.isPending, children: "Ajouter" })] }) }));
}
