/**
 * Routes HTTP pour `/api/accounts`.
 * Uniquement de la plomberie : validation Zod + appel au service. Toute la
 * logique métier vit dans `accounts.service.ts`.
 */

import type { FastifyInstance } from 'fastify';
import { DEMO_USER_ID } from '../lib/constants';
import { parseOrRespond } from '../lib/validate';
import { accountsService } from '../services/accounts.service';
import {
  AccountIdParamSchema,
  CreateAccountSchema,
  UpdateAccountSchema,
} from '../schemas/accounts.schemas';

export async function accountsRoutes(fastify: FastifyInstance) {
  fastify.get('/api/accounts', async () => {
    return accountsService.list(DEMO_USER_ID);
  });

  fastify.get<{ Params: { id: string } }>('/api/accounts/:id', async (request, reply) => {
    const params = parseOrRespond(AccountIdParamSchema, request.params, reply);
    if (!params) return;
    return accountsService.getById(DEMO_USER_ID, params.id);
  });

  fastify.post('/api/accounts', async (request, reply) => {
    const body = parseOrRespond(CreateAccountSchema, request.body, reply);
    if (!body) return;
    const account = await accountsService.create(DEMO_USER_ID, body);
    return reply.code(201).send(account);
  });

  fastify.patch<{ Params: { id: string } }>('/api/accounts/:id', async (request, reply) => {
    const params = parseOrRespond(AccountIdParamSchema, request.params, reply);
    if (!params) return;
    const body = parseOrRespond(UpdateAccountSchema, request.body, reply);
    if (!body) return;
    return accountsService.update(DEMO_USER_ID, params.id, body);
  });

  fastify.delete<{ Params: { id: string } }>('/api/accounts/:id', async (request, reply) => {
    const params = parseOrRespond(AccountIdParamSchema, request.params, reply);
    if (!params) return;
    await accountsService.delete(DEMO_USER_ID, params.id);
    return reply.code(204).send();
  });
}
