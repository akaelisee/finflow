/**
 * Repository "Account" — uniquement des appels Prisma, aucune logique métier.
 * Ne lance jamais d'erreur : retourne `null` si la ressource n'existe pas.
 */

import type { Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma';
import type { CreateAccountInput } from '../schemas/accounts.schemas';

export const accountsRepository = {
  findAllByUser(userId: string) {
    return prisma.account.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  },

  findById(id: string) {
    return prisma.account.findUnique({ where: { id } });
  },

  create(userId: string, data: CreateAccountInput) {
    return prisma.account.create({ data: { ...data, userId } });
  },

  update(id: string, data: Prisma.AccountUpdateInput) {
    return prisma.account.update({ where: { id }, data });
  },

  delete(id: string) {
    return prisma.account.delete({ where: { id } });
  },

  /** Somme des montants + nombre de transactions liées à ce compte. */
  getTransactionStats(accountId: string) {
    return prisma.transaction.aggregate({
      where: { accountId },
      _sum: { amount: true },
      _count: true,
    });
  },
};
