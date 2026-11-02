/**
 * Classes d'erreurs métier custom.
 *
 * Ces classes permettent de lancer des erreurs typées depuis les services,
 * et le handler global (dans server.ts) les convertit en réponses HTTP propres.
 *
 * Exemple :
 *   throw new NotFoundError('Compte introuvable');
 *   → Le client reçoit un 404 avec le message
 */

export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly code?: string,
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

/** L'entité demandée n'existe pas. Renvoie 404. */
export class NotFoundError extends AppError {
  constructor(message = 'Ressource introuvable') {
    super(404, message, 'NOT_FOUND');
  }
}

/** L'utilisateur n'a pas le droit d'accéder à cette ressource. Renvoie 403. */
export class ForbiddenError extends AppError {
  constructor(message = 'Accès refusé') {
    super(403, message, 'FORBIDDEN');
  }
}

/** Erreur de validation métier. Renvoie 400. */
export class ValidationError extends AppError {
  constructor(message: string) {
    super(400, message, 'VALIDATION_ERROR');
  }
}

/** Conflit métier (ex: budget déjà défini). Renvoie 409. */
export class ConflictError extends AppError {
  constructor(message: string) {
    super(409, message, 'CONFLICT');
  }
}
