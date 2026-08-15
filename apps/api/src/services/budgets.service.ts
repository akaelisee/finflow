/**
 * Service "Budget" — logique métier : un budget est unique par
 * (user, catégorie, mois), et chaque budget renvoyé est enrichi avec le
 * montant dépensé (`spent`), le reste (`remaining`), le pourcentage utilisé
 * et le dépassement — calculés à partir des transactions du mois.
 */

import type { Budget, Category } from '@prisma/client';
import { ConflictError, ForbiddenError, NotFoundError } from '../lib/errors';
import { getCurrentMonthKey, getMonthDateRange } from '../lib/month';
import { budgetsRepository } from '../repositories/budgets.repository';
import { categoriesRepository } from '../repositories/categories.repository';
import type { CreateBudgetInput } from '../schemas/budgets.schemas';

async function assertCategoryAccessible(userId: string, categoryId: string) {
  const category = await categoriesRepository.findById(categoryId);
  if (!category) throw new NotFoundError('Catégorie introuvable');
  if (category.userId !== null && category.userId !== userId) {
    throw new ForbiddenError('Cette catégorie ne vous appartient pas');
  }
}

async function assertOwnedBudget(userId: string, id: string) {
  const budget = await budgetsRepository.findById(id);
  if (!budget) throw new NotFoundError('Budget introuvable');
  if (budget.userId !== userId) throw new ForbiddenError('Ce budget ne vous appartient pas');
  return budget;
}

/** Calcule `spent` / `remaining` / `percentUsed` / `isExceeded` pour un budget. */
async function enrich(userId: string, budget: Budget & { category: Category }) {
  const { start, end } = getMonthDateRange(budget.month);
  const spent = await budgetsRepository.sumSpentForCategory(userId, budget.categoryId, start, end);
  return {
    ...budget,
    spent,
    remaining: budget.amount - spent,
    percentUsed: budget.amount === 0 ? 0 : (spent / budget.amount) * 100,
    isExceeded: spent > budget.amount,
  };
}

export const budgetsService = {
  async list(userId: string, month: string | undefined) {
    const targetMonth = month ?? getCurrentMonthKey();
    const budgets = await budgetsRepository.findAllByUserAndMonth(userId, targetMonth);
    return Promise.all(budgets.map((budget) => enrich(userId, budget)));
  },

  async create(userId: string, input: CreateBudgetInput) {
    await assertCategoryAccessible(userId, input.categoryId);

    const existing = await budgetsRepository.findByUserCategoryMonth(
      userId,
      input.categoryId,
      input.month,
    );
    if (existing) {
      throw new ConflictError('Un budget existe déjà pour cette catégorie sur ce mois');
    }

    const budget = await budgetsRepository.create(userId, input);
    return enrich(userId, budget);
  },

  async update(userId: string, id: string, amount: number) {
    const budget = await assertOwnedBudget(userId, id);
    const updated = await budgetsRepository.updateAmount(budget.id, amount);
    return enrich(userId, updated);
  },

  async delete(userId: string, id: string) {
    await assertOwnedBudget(userId, id);
    await budgetsRepository.delete(id);
  },
};
