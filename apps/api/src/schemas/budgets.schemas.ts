/**
 * Schémas Zod pour la ressource "Budget".
 *
 * Un budget définit une limite de dépense (`amount`, en centimes) pour une
 * catégorie donnée sur un mois donné (format "YYYY-MM"). La contrainte
 * d'unicité `(userId, categoryId, month)` est appliquée en DB et vérifiée
 * côté service pour renvoyer un `ConflictError` propre.
 */

import { z } from 'zod';

/** Format "YYYY-MM", ex: "2026-08". */
export const monthSchema = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Format de mois invalide, attendu : YYYY-MM');

export const CreateBudgetSchema = z.object({
  categoryId: z.string().uuid('Catégorie invalide'),
  month: monthSchema,
  amount: z.number().int('Le montant doit être un entier (centimes)').positive('Le montant doit être positif'),
});
export type CreateBudgetInput = z.infer<typeof CreateBudgetSchema>;

export const UpdateBudgetSchema = z.object({
  amount: z.number().int('Le montant doit être un entier (centimes)').positive('Le montant doit être positif'),
});
export type UpdateBudgetInput = z.infer<typeof UpdateBudgetSchema>;

export const BudgetIdParamSchema = z.object({
  id: z.string().uuid('Identifiant de budget invalide'),
});
export type BudgetIdParam = z.infer<typeof BudgetIdParamSchema>;

export const BudgetQuerySchema = z.object({
  month: monthSchema.optional(),
});
export type BudgetQuery = z.infer<typeof BudgetQuerySchema>;
