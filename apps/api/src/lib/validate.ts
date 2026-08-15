/**
 * Petit helper de validation Zod partagé par toutes les routes.
 *
 * Valide `data` avec `schema` ; en cas d'échec, envoie directement une
 * réponse 400 standardisée et retourne `undefined`. La route appelante doit
 * alors arrêter son exécution (`if (!parsed) return;`).
 */

import type { FastifyReply } from 'fastify';
import type { ZodType, ZodTypeDef } from 'zod';

export function parseOrRespond<T>(
  // `Input = any` force l'inférence de `T` sur le type de SORTIE du schéma
  // (celui où `.default()` a déjà été appliqué), pas sur son type d'entrée.
  schema: ZodType<T, ZodTypeDef, any>,
  data: unknown,
  reply: FastifyReply,
): T | undefined {
  const result = schema.safeParse(data);
  if (!result.success) {
    reply.code(400).send({
      error: 'VALIDATION_ERROR',
      message: 'Données invalides',
      details: result.error.flatten(),
    });
    return undefined;
  }
  return result.data;
}
