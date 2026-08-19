/**
 * Schémas Zod pour la ressource "Account" (comptes bancaires).
 *
 * Ces schémas servent à la fois de validateurs HTTP (dans les routes) et de
 * source de vérité pour les types TypeScript (via `z.infer`).
 */

import { z } from 'zod';

/** Les 3 types de comptes supportés (miroir de l'enum Prisma `AccountType`). */
export const AccountTypeSchema = z.enum(['CHECKING', 'SAVINGS', 'CREDIT']);

/** Couleur hexadécimale du type "#RRGGBB". */
const hexColorSchema = z
  .string()
  .regex(/^#[0-9A-Fa-f]{6}$/, 'Couleur invalide, format attendu : #RRGGBB');

export const CreateAccountSchema = z.object({
  name: z.string().trim().min(1, 'Le nom est requis').max(100),
  bank: z.string().trim().min(1, 'La banque est requise').max(100),
  type: AccountTypeSchema.default('CHECKING'),
  // Montant en centimes (ex: 2500.00 € => 250000)
  initialBalance: z.number().int('Le solde initial doit être un entier (centimes)'),
  currency: z.string().length(3).default('EUR'),
  color: hexColorSchema.default('#378ADD'),
});
export type CreateAccountInput = z.infer<typeof CreateAccountSchema>;

/** Toutes les propriétés sont optionnelles pour une mise à jour partielle. */
export const UpdateAccountSchema = CreateAccountSchema.partial();
export type UpdateAccountInput = z.infer<typeof UpdateAccountSchema>;

export const AccountIdParamSchema = z.object({
  id: z.string().uuid('Identifiant de compte invalide'),
});
export type AccountIdParam = z.infer<typeof AccountIdParamSchema>;
