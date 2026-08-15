/**
 * Service "Account" — logique métier : vérification de propriété et
 * enrichissement de la réponse avec `currentBalance` / `transactionCount`
 * (calculés à la volée, jamais stockés en DB).
 */

import type { Account } from '@prisma/client';
import { NotFoundError, ForbiddenError } from '../lib/errors';
import { pruneUndefined } from '../lib/object-utils';
import { accountsRepository } from '../repositories/accounts.repository';
import type { CreateAccountInput, UpdateAccountInput } from '../schemas/accounts.schemas';

/** Vérifie que le compte existe et appartient bien à `userId`. */
async function assertOwnedAccount(userId: string, id: string) {
  const account = await accountsRepository.findById(id);
  if (!account) throw new NotFoundError('Compte introuvable');
  if (account.userId !== userId) throw new ForbiddenError('Ce compte ne vous appartient pas');
  return account;
}

/** Ajoute le solde courant et le nombre de transactions à un compte. */
async function enrich(account: Account) {
  const stats = await accountsRepository.getTransactionStats(account.id);
  return {
    ...account,
    currentBalance: account.initialBalance + (stats._sum.amount ?? 0),
    transactionCount: stats._count,
  };
}

export const accountsService = {
  async list(userId: string) {
    const accounts = await accountsRepository.findAllByUser(userId);
    return Promise.all(accounts.map(enrich));
  },

  async getById(userId: string, id: string) {
    const account = await assertOwnedAccount(userId, id);
    return enrich(account);
  },

  async create(userId: string, input: CreateAccountInput) {
    const account = await accountsRepository.create(userId, input);
    return enrich(account);
  },

  async update(userId: string, id: string, input: UpdateAccountInput) {
    await assertOwnedAccount(userId, id);
    const updated = await accountsRepository.update(id, pruneUndefined(input));
    return enrich(updated);
  },

  async delete(userId: string, id: string) {
    await assertOwnedAccount(userId, id);
    await accountsRepository.delete(id);
  },
};
