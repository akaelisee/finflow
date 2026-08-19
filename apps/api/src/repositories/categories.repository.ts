/**
 * Repository "Category" — uniquement des appels Prisma, aucune logique métier.
 * Ne lance jamais d'erreur : retourne `null` si la ressource n'existe pas.
 */

import type { Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma';
import type { CreateCategoryInput } from '../schemas/categories.schemas';

export const categoriesRepository = {
  /** Catégories du user + catégories système (`userId: null`). */
  findAllForUser(userId: string) {
    return prisma.category.findMany({
      where: { OR: [{ userId }, { userId: null }] },
      orderBy: [{ isDefault: 'desc' }, { name: 'asc' }],
    });
  },

  findById(id: string) {
    return prisma.category.findUnique({ where: { id } });
  },

  create(userId: string, data: CreateCategoryInput) {
    return prisma.category.create({ data: { ...data, userId, isDefault: false } });
  },

  update(id: string, data: Prisma.CategoryUpdateInput) {
    return prisma.category.update({ where: { id }, data });
  },

  delete(id: string) {
    return prisma.category.delete({ where: { id } });
  },
};
