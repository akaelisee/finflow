/**
 * Service "Transaction" — logique métier : une transaction appartient à un
 * compte qui doit appartenir au user ; la catégorie (si fournie) doit être
 * système ou appartenir au user. Gère aussi le filtrage et la pagination.
 */

import type { Prisma } from '@prisma/client';
import { NotFoundError, ForbiddenError } from '../lib/errors';
import { pruneUndefined } from '../lib/object-utils';
import { accountsRepository } from '../repositories/accounts.repository';
import { categoriesRepository } from '../repositories/categories.repository';
import { transactionsRepository } from '../repositories/transactions.repository';
import type {
  CreateTransactionInput,
  TransactionQuery,
  UpdateTransactionInput,
} from '../schemas/transactions.schemas';

async function assertAccountOwnership(userId: string, accountId: string) {
  const account = await accountsRepository.findById(accountId);
  if (!account) throw new NotFoundError('Compte introuvable');
  if (account.userId !== userId) throw new ForbiddenError('Ce compte ne vous appartient pas');
}

/** Une catégorie est accessible si elle est système, ou si elle appartient au user. */
async function assertCategoryAccessible(userId: string, categoryId: string) {
  const category = await categoriesRepository.findById(categoryId);
  if (!category) throw new NotFoundError('Catégorie introuvable');
  if (category.userId !== null && category.userId !== userId) {
    throw new ForbiddenError('Cette catégorie ne vous appartient pas');
  }
}

async function assertTransactionOwnership(userId: string, id: string) {
  const transaction = await transactionsRepository.findById(id);
  if (!transaction) throw new NotFoundError('Transaction introuvable');
  if (transaction.account.userId !== userId) {
    throw new ForbiddenError('Cette transaction ne vous appartient pas');
  }
  return transaction;
}

function buildWhere(userId: string, query: TransactionQuery): Prisma.TransactionWhereInput {
  const where: Prisma.TransactionWhereInput = { account: { userId } };
  if (query.accountId) where.accountId = query.accountId;
  if (query.categoryId) where.categoryId = query.categoryId;
  if (query.search) where.label = { contains: query.search, mode: 'insensitive' };
  if (query.startDate || query.endDate) {
    where.transactionDate = pruneUndefined({ gte: query.startDate, lte: query.endDate });
  }
  return where;
}

export const transactionsService = {
  async list(userId: string, query: TransactionQuery) {
    if (query.accountId) await assertAccountOwnership(userId, query.accountId);
    if (query.categoryId) await assertCategoryAccessible(userId, query.categoryId);

    const where = buildWhere(userId, query);
    const skip = (query.page - 1) * query.pageSize;

    const [data, total] = await Promise.all([
      transactionsRepository.findMany(where, skip, query.pageSize),
      transactionsRepository.count(where),
    ]);

    return {
      data,
      pagination: {
        page: query.page,
        pageSize: query.pageSize,
        total,
        totalPages: total === 0 ? 0 : Math.ceil(total / query.pageSize),
      },
    };
  },

  getById(userId: string, id: string) {
    return assertTransactionOwnership(userId, id);
  },

  async create(userId: string, input: CreateTransactionInput) {
    await assertAccountOwnership(userId, input.accountId);
    if (input.categoryId) await assertCategoryAccessible(userId, input.categoryId);

    return transactionsRepository.create({
      accountId: input.accountId,
      categoryId: input.categoryId ?? null,
      amount: input.amount,
      label: input.label,
      transactionDate: input.transactionDate,
      notes: input.notes ?? null,
      importedFrom: 'MANUAL',
    });
  },

  async update(userId: string, id: string, input: UpdateTransactionInput) {
    await assertTransactionOwnership(userId, id);
    if (input.accountId) await assertAccountOwnership(userId, input.accountId);
    if (input.categoryId) await assertCategoryAccessible(userId, input.categoryId);

    return transactionsRepository.update(id, pruneUndefined(input));
  },

  async delete(userId: string, id: string) {
    await assertTransactionOwnership(userId, id);
    await transactionsRepository.delete(id);
  },
};
