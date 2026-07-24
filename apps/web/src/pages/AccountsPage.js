import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useAccounts, AccountsList, AddAccountModal } from '@/features/accounts';
import { Button } from '@/shared/ui';
export function AccountsPage() {
    const { data: accounts, isLoading } = useAccounts();
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (_jsxs("div", { className: "flex flex-col gap-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Comptes" }), _jsx(Button, { onClick: () => setIsModalOpen(true), children: "Ajouter un compte" })] }), _jsx(AccountsList, { accounts: accounts ?? [], isLoading: isLoading }), _jsx(AddAccountModal, { isOpen: isModalOpen, onClose: () => setIsModalOpen(false) })] }));
}
