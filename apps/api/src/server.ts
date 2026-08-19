import Fastify from 'fastify';
import cors from '@fastify/cors';
import { SHARED_PACKAGE_VERSION } from '@finflow/shared';
import { prisma, disconnectPrisma } from './lib/prisma';
import { setDemoUserId } from './lib/constants';
import { AppError } from './lib/errors';
import { registerRoutes } from './routes/index';

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

/**
 * Handler d'erreur global : convertit les `AppError` métier (lancées depuis
 * les services) en réponses HTTP propres. Toute autre erreur devient un 500.
 * Doit être enregistré AVANT les routes : Fastify résout la chaîne de gestion
 * d'erreur d'une route au moment de son enregistrement.
 */
server.setErrorHandler((error, request, reply) => {
  if (error instanceof AppError) {
    return reply.code(error.statusCode).send({
      error: error.code,
      message: error.message,
    });
  }
  request.log.error(error);
  return reply.code(500).send({
    error: 'INTERNAL_ERROR',
    message: 'Une erreur inattendue est survenue',
  });
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

// ---- Routes métier ----
await server.register(registerRoutes);

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
    // Charge le userId démo depuis la DB (voir lib/constants.ts) — remplacé
    // par un vrai middleware d'auth à l'étape suivante.
    const demoUser = await prisma.user.findFirst({ where: { email: 'demo@finflow.com' } });
    if (!demoUser) {
      throw new Error("Utilisateur démo introuvable — lance d'abord `npm run db:seed`.");
    }
    setDemoUserId(demoUser.id);

    const port = Number(process.env['PORT'] ?? 3000);
    await server.listen({ port, host: '0.0.0.0' });
    server.log.info(`🚀 API prête sur http://localhost:${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();