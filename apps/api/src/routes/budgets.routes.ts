/**
 * Routes HTTP pour `/api/budgets`.
 * Uniquement de la plomberie : validation Zod + appel au service. Toute la
 * logique métier (unicité, calcul de `spent`/`remaining`) vit dans
 * `budgets.service.ts`.
 */

import type { FastifyInstance } from 'fastify';
import { DEMO_USER_ID } from '../lib/constants';
import { parseOrRespond } from '../lib/validate';
import { budgetsService } from '../services/budgets.service';
import {
  BudgetIdParamSchema,
  BudgetQuerySchema,
  CreateBudgetSchema,
  UpdateBudgetSchema,
} from '../schemas/budgets.schemas';

export async function budgetsRoutes(fastify: FastifyInstance) {
  fastify.get('/api/budgets', async (request, reply) => {
    const query = parseOrRespond(BudgetQuerySchema, request.query, reply);
    if (!query) return;
    return budgetsService.list(DEMO_USER_ID, query.month);
  });

  fastify.post('/api/budgets', async (request, reply) => {
    const body = parseOrRespond(CreateBudgetSchema, request.body, reply);
    if (!body) return;
    const budget = await budgetsService.create(DEMO_USER_ID, body);
    return reply.code(201).send(budget);
  });

  fastify.patch<{ Params: { id: string } }>('/api/budgets/:id', async (request, reply) => {
    const params = parseOrRespond(BudgetIdParamSchema, request.params, reply);
    if (!params) return;
    const body = parseOrRespond(UpdateBudgetSchema, request.body, reply);
    if (!body) return;
    return budgetsService.update(DEMO_USER_ID, params.id, body.amount);
  });

  fastify.delete<{ Params: { id: string } }>('/api/budgets/:id', async (request, reply) => {
    const params = parseOrRespond(BudgetIdParamSchema, request.params, reply);
    if (!params) return;
    await budgetsService.delete(DEMO_USER_ID, params.id);
    return reply.code(204).send();
  });
}
