import Fastify from 'fastify';
import cors from '@fastify/cors';
import { SHARED_PACKAGE_VERSION } from '@finflow/shared';

const server = Fastify({
  logger: {
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: { colorize: true, translateTime: 'HH:MM:ss' },
    },
  },
});

// Enregistrement du CORS — autorise le front à appeler l'API
await server.register(cors, {
  origin: ['http://localhost:5173'],
  credentials: true,
});

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