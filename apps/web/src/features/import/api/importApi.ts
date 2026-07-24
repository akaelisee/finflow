import { API_URL, getAuthToken } from '@/shared/lib/apiClient';
import type { Transaction } from '@/shared/types';

export interface ImportPreviewRow {
  label: string;
  amount: number;
  transactionDate: string;
}

export interface ImportPreviewResponse {
  importId: string;
  accountId: string;
  rows: ImportPreviewRow[];
}

function authHeaders(): HeadersInit {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const importApi = {
  async preview(accountId: string, file: File): Promise<ImportPreviewResponse> {
    const formData = new FormData();
    formData.append('accountId', accountId);
    formData.append('file', file);

    const response = await fetch(`${API_URL}/api/import/csv/preview`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
      headers: authHeaders(),
    });

    if (!response.ok) throw new Error("Échec de l'analyse du fichier CSV");
    return (await response.json()) as ImportPreviewResponse;
  },

  async confirm(importId: string): Promise<Transaction[]> {
    const response = await fetch(`${API_URL}/api/import/csv/confirm`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify({ importId }),
    });

    if (!response.ok) throw new Error("Échec de la confirmation de l'import");
    return (await response.json()) as Transaction[];
  },
};
