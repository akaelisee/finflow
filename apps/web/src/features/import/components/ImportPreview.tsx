import { formatMoney } from '@/shared/lib/formatMoney';
import { formatDate } from '@/shared/lib/formatDate';
import { Button } from '@/shared/ui';
import type { ImportPreviewRow } from '../api/importApi';

interface ImportPreviewProps {
  rows: ImportPreviewRow[];
  onConfirm: () => void;
  onCancel: () => void;
  isConfirming: boolean;
}

export function ImportPreview({ rows, onConfirm, onCancel, isConfirming }: ImportPreviewProps) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-gray-500">{rows.length} transaction(s) détectée(s)</p>
      <div className="max-h-80 overflow-y-auto rounded-lg border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs uppercase text-gray-400">
              <th className="px-3 py-2 font-medium">Date</th>
              <th className="px-3 py-2 font-medium">Libellé</th>
              <th className="px-3 py-2 text-right font-medium">Montant</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="border-b border-gray-100 last:border-0">
                <td className="px-3 py-2 text-sm text-gray-500">{formatDate(row.transactionDate)}</td>
                <td className="px-3 py-2 text-sm text-gray-900">{row.label}</td>
                <td className="px-3 py-2 text-right text-sm font-medium text-gray-900">{formatMoney(row.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={onCancel}>
          Annuler
        </Button>
        <Button onClick={onConfirm} isLoading={isConfirming}>
          Confirmer l'import
        </Button>
      </div>
    </div>
  );
}
