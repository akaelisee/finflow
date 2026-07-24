import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CsvDropzone, ImportPreview, importApi } from '@/features/import';
import type { ImportPreviewResponse } from '@/features/import';
import { useAccounts } from '@/features/accounts';
import { Select, toast } from '@/shared/ui';

export function ImportPage() {
  const { data: accounts } = useAccounts();
  const [accountId, setAccountId] = useState('');
  const [preview, setPreview] = useState<ImportPreviewResponse | null>(null);
  const queryClient = useQueryClient();

  const previewMutation = useMutation({
    mutationFn: (file: File) => importApi.preview(accountId, file),
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

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-gray-900">Import CSV</h1>
      <div className="max-w-xs">
        <Select
          label="Compte à créditer"
          value={accountId}
          onChange={(event) => setAccountId(event.target.value)}
          placeholder="Sélectionner un compte"
          options={(accounts ?? []).map((account) => ({ value: account.id, label: account.name }))}
        />
      </div>
      {preview ? (
        <ImportPreview
          rows={preview.rows}
          onConfirm={() => confirmMutation.mutate()}
          onCancel={() => setPreview(null)}
          isConfirming={confirmMutation.isPending}
        />
      ) : (
        <CsvDropzone
          onFileSelected={(file) => {
            if (!accountId) {
              toast("Sélectionnez un compte avant d'importer", 'error');
              return;
            }
            previewMutation.mutate(file);
          }}
        />
      )}
    </div>
  );
}
