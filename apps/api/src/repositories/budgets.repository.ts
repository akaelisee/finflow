/**
 * Repository "Budget" — uniquement des appels Prisma, aucune logique métier.
 * Ne lance jamais d'erreur : retourne `null` si la ressource n'existe pas.
 */

import { prisma } from '../lib/prisma';
import type { CreateBudgetInput } from '../schemas/budgets.schemas';

export const budgetsRepository = {
  findAllByUserAndMonth(userId: string, month: string) {
    return prisma.budget.findMany({
      where: { userId, month },
      include: { category: true },
      orderBy: { createdAt: 'asc' },
    });
  },

  findById(id: string) {
    return prisma.budget.findUnique({ where: { id }, include: { category: true } });
  },

  findByUserCategoryMonth(userId: string, categoryId: string, month: string) {
    return prisma.budget.findUnique({
      where: { userId_categoryId_month: { userId, categoryId, month } },
    });
  },

  create(userId: string, data: CreateBudgetInput) {
    return prisma.budget.create({
      data: { ...data, userId },
      include: { category: true },
    });
  },

  updateAmount(id: string, amount: number) {
    return prisma.budget.update({ where: { id }, data: { amount }, include: { category: true } });
  },

  delete(id: string) {
    return prisma.budget.delete({ where: { id } });
  },

  /** Somme des dépenses (montants négatifs, en valeur absolue) d'une catégorie sur une période, pour les comptes d'un user. */
  async sumSpentForCategory(userId: string, categoryId: string, start: Date, end: Date) {
    const result = await prisma.transaction.aggregate({
      where: {
        categoryId,
        amount: { lt: 0 },
        transactionDate: { gte: start, lt: end },
        account: { userId },
      },
      _sum: { amount: true },
    });
    return Math.abs(result._sum.amount ?? 0);
  },
};
