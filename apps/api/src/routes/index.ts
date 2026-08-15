/**
 * Point d'entrée unique pour enregistrer toutes les routes métier sur
 * l'instance Fastify. Voir `server.ts` pour le branchement.
 */

import type { FastifyInstance } from 'fastify';
import { accountsRoutes } from './accounts.routes';
import { budgetsRoutes } from './budgets.routes';
import { categoriesRoutes } from './categories.routes';
import { transactionsRoutes } from './transactions.routes';

export async function registerRoutes(fastify: FastifyInstance) {
  await fastify.register(accountsRoutes);
  await fastify.register(categoriesRoutes);
  await fastify.register(transactionsRoutes);
  await fastify.register(budgetsRoutes);
}
