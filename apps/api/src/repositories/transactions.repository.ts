/**
 * Repository "Transaction" — uniquement des appels Prisma, aucune logique métier.
 * Ne lance jamais d'erreur : retourne `null` si la ressource n'existe pas.
 */

import type { Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma';

const withRelations = { category: true, account: true } as const;

export const transactionsRepository = {
  findMany(where: Prisma.TransactionWhereInput, skip: number, take: number) {
    return prisma.transaction.findMany({
      where,
      include: withRelations,
      orderBy: [{ transactionDate: 'desc' }, { createdAt: 'desc' }],
      skip,
      take,
    });
  },

  count(where: Prisma.TransactionWhereInput) {
    return prisma.transaction.count({ where });
  },

  findById(id: string) {
    return prisma.transaction.findUnique({ where: { id }, include: withRelations });
  },

  create(data: Prisma.TransactionUncheckedCreateInput) {
    return prisma.transaction.create({ data, include: withRelations });
  },

  update(id: string, data: Prisma.TransactionUncheckedUpdateInput) {
    return prisma.transaction.update({ where: { id }, data, include: withRelations });
  },

  delete(id: string) {
    return prisma.transaction.delete({ where: { id } });
  },
};
