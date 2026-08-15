/**
 * Constantes temporaires pour la période sans authentification (étapes 3-4).
 *
 * À l'étape 5 (auth JWT), on supprimera ce fichier et on récupérera
 * le userId depuis le token JWT via un middleware.
 */

/**
 * ⚠️ Temporaire — ID de l'utilisateur "Sarah Demo" créé par le seed.
 *
 * Cette constante est chargée depuis la DB au démarrage du serveur.
 * Voir server.ts pour l'initialisation.
 */
export let DEMO_USER_ID = '';

export function setDemoUserId(id: string) {
  DEMO_USER_ID = id;
}