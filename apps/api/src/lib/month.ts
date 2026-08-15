/**
 * Utilitaires pour manipuler le format "YYYY-MM" utilisé par les budgets.
 */

/** Retourne le mois courant au format "YYYY-MM". */
export function getCurrentMonthKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

/**
 * Convertit "YYYY-MM" en bornes de dates [début du mois, début du mois suivant[.
 * Utilisé pour filtrer les transactions d'un mois donné (borne de fin exclusive).
 */
export function getMonthDateRange(month: string): { start: Date; end: Date } {
  const [yearStr, monthStr] = month.split('-');
  const year = Number(yearStr);
  const monthIndex = Number(monthStr) - 1;
  const start = new Date(Date.UTC(year, monthIndex, 1));
  const end = new Date(Date.UTC(year, monthIndex + 1, 1));
  return { start, end };
}
