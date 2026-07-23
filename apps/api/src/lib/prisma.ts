import { PrismaClient } from '@prisma/client';

/**
 * Instance unique (singleton) du client Prisma.
 *
 * Pourquoi un singleton ? Chaque instance de PrismaClient ouvre un pool
 * de connexions à la DB. En créer plusieurs = pool épuisé = crash.
 * On l'exporte une fois, on l'importe partout.
 */
export const prisma = new PrismaClient({
  log: process.env['NODE_ENV'] === 'development' ? ['warn', 'error'] : ['error'],
});

/**
 * Fermeture propre du client Prisma lors de l'arrêt de l'app.
 * Appelé depuis server.ts sur SIGTERM/SIGINT.
 */
export async function disconnectPrisma() {
  await prisma.$disconnect();
}