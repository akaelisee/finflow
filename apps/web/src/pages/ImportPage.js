import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CsvDropzone, ImportPreview, importApi } from '@/features/import';
import { useAccounts } from '@/features/accounts';
import { Select, toast } from '@/shared/ui';
export function ImportPage() {
    const { data: accounts } = useAccounts();
    const [accountId, setAccountId] = useState('');
    const [preview, setPreview] = useState(null);
    const queryClient = useQueryClient();
    const previewMutation = useMutation({
        mutationFn: (file) => importApi.preview(accountId, file),
        onSuccess: (data) => setPreview(data),
        onError: () => toast("Impossible d'analyser le fichier", 'error'),
    });
    const confirmMutation = useMutation({
        mutationFn: () => importApi.confirm(preview?.importId ?? ''),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
            toast('Import confirmé', 'success');
            setPreview(null);
        },
        onError: () => toast("Impossible de confirmer l'import", 'error'),
    });
    return (_jsxs("div", { className: "flex flex-col gap-6", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Import CSV" }), _jsx("div", { className: "max-w-xs", children: _jsx(Select, { label: "Compte \u00E0 cr\u00E9diter", value: accountId, onChange: (event) => setAccountId(event.target.value), placeholder: "S\u00E9lectionner un compte", options: (accounts ?? []).map((account) => ({ value: account.id, label: account.name })) }) }), preview ? (_jsx(ImportPreview, { rows: preview.rows, onConfirm: () => confirmMutation.mutate(), onCancel: () => setPreview(null), isConfirming: confirmMutation.isPending })) : (_jsx(CsvDropzone, { onFileSelected: (file) => {
                    if (!accountId) {
                        toast("Sélectionnez un compte avant d'importer", 'error');
                        return;
                    }
                    previewMutation.mutate(file);
                } }))] }));
}
