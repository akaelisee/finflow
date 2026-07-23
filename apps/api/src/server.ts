import Fastify from 'fastify';
import cors from '@fastify/cors';
import { SHARED_PACKAGE_VERSION } from '@finflow/shared';
import { prisma, disconnectPrisma } from './lib/prisma';

const server = Fastify({
  logger: {
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: { colorize: true, translateTime: 'HH:MM:ss' },
    },
  },
});

// ---- CORS ----
await server.register(cors, {
  origin: ['http://localhost:5173'],
  credentials: true,
});

// ---- Routes ----

server.get('/', async () => {
  return {
    status: 'ok',
    service: 'finflow-api',
    version: '0.1.0',
    sharedVersion: SHARED_PACKAGE_VERSION,
    timestamp: new Date().toISOString(),
  };
});

server.get('/health', async () => {
  return { status: 'ok' };
});

/**
 * Endpoint qui vérifie que la DB répond bien.
 * Utile pour tester la connexion Prisma.
 */
server.get('/api/db-health', async () => {
  // On compte le nombre d'utilisateurs — requête toute simple qui hit la DB
  const userCount = await prisma.user.count();
  const categoryCount = await prisma.category.count();
  const accountCount = await prisma.account.count();
  const transactionCount = await prisma.transaction.count();

  return {
    status: 'ok',
    database: 'connected',
    counts: {
      users: userCount,
      categories: categoryCount,
      accounts: accountCount,
      transactions: transactionCount,
    },
  };
});

// ---- Arrêt propre ----
const shutdown = async (signal: string) => {
  server.log.info(`Signal ${signal} reçu, fermeture propre en cours…`);
  await server.close();
  await disconnectPrisma();
  process.exit(0);
};
process.on('SIGTERM', () => void shutdown('SIGTERM'));
process.on('SIGINT', () => void shutdown('SIGINT'));

// ---- Démarrage ----
const start = async () => {
  try {
    const port = Number(process.env['PORT'] ?? 3000);
    await server.listen({ port, host: '0.0.0.0' });
    server.log.info(`🚀 API prête sur http://localhost:${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();