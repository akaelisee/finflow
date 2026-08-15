/**
 * Service "Category" — logique métier : les catégories système
 * (`userId: null`, `isDefault: true`) sont en lecture seule ; seules les
 * catégories custom du user peuvent être modifiées ou supprimées.
 */

import { NotFoundError, ForbiddenError } from '../lib/errors';
import { pruneUndefined } from '../lib/object-utils';
import { categoriesRepository } from '../repositories/categories.repository';
import type { CreateCategoryInput, UpdateCategoryInput } from '../schemas/categories.schemas';

/** Vérifie que la catégorie existe, n'est pas système, et appartient à `userId`. */
async function assertEditableCategory(userId: string, id: string) {
  const category = await categoriesRepository.findById(id);
  if (!category) throw new NotFoundError('Catégorie introuvable');
  if (category.userId === null) {
    throw new ForbiddenError('Les catégories système ne peuvent pas être modifiées');
  }
  if (category.userId !== userId) throw new ForbiddenError('Cette catégorie ne vous appartient pas');
  return category;
}

export const categoriesService = {
  list(userId: string) {
    return categoriesRepository.findAllForUser(userId);
  },

  create(userId: string, input: CreateCategoryInput) {
    return categoriesRepository.create(userId, input);
  },

  async update(userId: string, id: string, input: UpdateCategoryInput) {
    await assertEditableCategory(userId, id);
    return categoriesRepository.update(id, pruneUndefined(input));
  },

  async delete(userId: string, id: string) {
    await assertEditableCategory(userId, id);
    await categoriesRepository.delete(id);
  },
};
