/**
 * Schémas Zod pour la ressource "Category".
 *
 * Une catégorie est soit "système" (créée par le seed, `userId: null`,
 * `isDefault: true`), soit "custom" (créée par un utilisateur). Seules les
 * catégories custom peuvent être modifiées ou supprimées — voir
 * `categories.service.ts`.
 */

import { z } from 'zod';

const hexColorSchema = z
  .string()
  .regex(/^#[0-9A-Fa-f]{6}$/, 'Couleur invalide, format attendu : #RRGGBB');

export const CreateCategorySchema = z.object({
  name: z.string().trim().min(1, 'Le nom est requis').max(50),
  color: hexColorSchema,
  icon: z.string().trim().min(1, "L'icône est requise").max(50),
});
export type CreateCategoryInput = z.infer<typeof CreateCategorySchema>;

export const UpdateCategorySchema = CreateCategorySchema.partial();
export type UpdateCategoryInput = z.infer<typeof UpdateCategorySchema>;

export const CategoryIdParamSchema = z.object({
  id: z.string().uuid('Identifiant de catégorie invalide'),
});
export type CategoryIdParam = z.infer<typeof CategoryIdParamSchema>;
