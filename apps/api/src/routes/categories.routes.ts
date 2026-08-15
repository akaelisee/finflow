/**
 * Routes HTTP pour `/api/categories`.
 * Uniquement de la plomberie : validation Zod + appel au service. Toute la
 * logique métier vit dans `categories.service.ts`.
 */

import type { FastifyInstance } from 'fastify';
import { DEMO_USER_ID } from '../lib/constants';
import { parseOrRespond } from '../lib/validate';
import { categoriesService } from '../services/categories.service';
import {
  CategoryIdParamSchema,
  CreateCategorySchema,
  UpdateCategorySchema,
} from '../schemas/categories.schemas';

export async function categoriesRoutes(fastify: FastifyInstance) {
  fastify.get('/api/categories', async () => {
    return categoriesService.list(DEMO_USER_ID);
  });

  fastify.post('/api/categories', async (request, reply) => {
    const body = parseOrRespond(CreateCategorySchema, request.body, reply);
    if (!body) return;
    const category = await categoriesService.create(DEMO_USER_ID, body);
    return reply.code(201).send(category);
  });

  fastify.patch<{ Params: { id: string } }>('/api/categories/:id', async (request, reply) => {
    const params = parseOrRespond(CategoryIdParamSchema, request.params, reply);
    if (!params) return;
    const body = parseOrRespond(UpdateCategorySchema, request.body, reply);
    if (!body) return;
    return categoriesService.update(DEMO_USER_ID, params.id, body);
  });

  fastify.delete<{ Params: { id: string } }>('/api/categories/:id', async (request, reply) => {
    const params = parseOrRespond(CategoryIdParamSchema, request.params, reply);
    if (!params) return;
    await categoriesService.delete(DEMO_USER_ID, params.id);
    return reply.code(204).send();
  });
}
