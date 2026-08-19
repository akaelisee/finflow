/**
 * Routes HTTP pour `/api/transactions`.
 * Uniquement de la plomberie : validation Zod + appel au service. Toute la
 * logique métier (filtres, pagination, propriété) vit dans
 * `transactions.service.ts`.
 */

import type { FastifyInstance } from 'fastify';
import { DEMO_USER_ID } from '../lib/constants';
import { parseOrRespond } from '../lib/validate';
import { transactionsService } from '../services/transactions.service';
import {
  CreateTransactionSchema,
  TransactionIdParamSchema,
  TransactionQuerySchema,
  UpdateTransactionSchema,
} from '../schemas/transactions.schemas';

export async function transactionsRoutes(fastify: FastifyInstance) {
  fastify.get('/api/transactions', async (request, reply) => {
    const query = parseOrRespond(TransactionQuerySchema, request.query, reply);
    if (!query) return;
    return transactionsService.list(DEMO_USER_ID, query);
  });

  fastify.get<{ Params: { id: string } }>('/api/transactions/:id', async (request, reply) => {
    const params = parseOrRespond(TransactionIdParamSchema, request.params, reply);
    if (!params) return;
    return transactionsService.getById(DEMO_USER_ID, params.id);
  });

  fastify.post('/api/transactions', async (request, reply) => {
    const body = parseOrRespond(CreateTransactionSchema, request.body, reply);
    if (!body) return;
    const transaction = await transactionsService.create(DEMO_USER_ID, body);
    return reply.code(201).send(transaction);
  });

  fastify.patch<{ Params: { id: string } }>('/api/transactions/:id', async (request, reply) => {
    const params = parseOrRespond(TransactionIdParamSchema, request.params, reply);
    if (!params) return;
    const body = parseOrRespond(UpdateTransactionSchema, request.body, reply);
    if (!body) return;
    return transactionsService.update(DEMO_USER_ID, params.id, body);
  });

  fastify.delete<{ Params: { id: string } }>('/api/transactions/:id', async (request, reply) => {
    const params = parseOrRespond(TransactionIdParamSchema, request.params, reply);
    if (!params) return;
    await transactionsService.delete(DEMO_USER_ID, params.id);
    return reply.code(204).send();
  });
}
