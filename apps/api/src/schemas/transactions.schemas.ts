/**
 * Schémas Zod pour la ressource "Transaction".
 *
 * `amount` est en centimes (positif = revenu, négatif = dépense), comme en DB.
 * `TransactionQuerySchema` valide les query params de `GET /api/transactions`
 * (filtres + pagination) — les query params HTTP arrivent toujours en string,
 * d'où l'usage de `z.coerce`.
 */

import { z } from 'zod';

export const CreateTransactionSchema = z.object({
  accountId: z.string().uuid('Compte invalide'),
  // null = transaction sans catégorie, omis = idem
  categoryId: z.string().uuid('Catégorie invalide').nullable().optional(),
  amount: z
    .number()
    .int('Le montant doit être un entier (centimes)')
    .refine((v) => v !== 0, 'Le montant ne peut pas être nul'),
  label: z.string().trim().min(1, 'Le libellé est requis').max(200),
  transactionDate: z.coerce.date(),
  notes: z.string().max(1000).nullable().optional(),
});
export type CreateTransactionInput = z.infer<typeof CreateTransactionSchema>;

export const UpdateTransactionSchema = CreateTransactionSchema.partial();
export type UpdateTransactionInput = z.infer<typeof UpdateTransactionSchema>;

export const TransactionIdParamSchema = z.object({
  id: z.string().uuid('Identifiant de transaction invalide'),
});
export type TransactionIdParam = z.infer<typeof TransactionIdParamSchema>;

export const TransactionQuerySchema = z.object({
  accountId: z.string().uuid().optional(),
  categoryId: z.string().uuid().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  search: z.string().trim().min(1).max(200).optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(25),
});
export type TransactionQuery = z.infer<typeof TransactionQuerySchema>;
