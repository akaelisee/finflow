/**
 * Retire les clés valant explicitement `undefined`.
 * Les schémas Zod optionnels/partiels typent leurs champs en `T | undefined`,
 * ce qui heurte `exactOptionalPropertyTypes` du tsconfig une fois passé à Prisma.
 */
export function pruneUndefined<T extends Record<string, unknown>>(
  obj: T,
): { [K in keyof T]: Exclude<T[K], undefined> } {
  const entries = Object.entries(obj).filter(([, value]) => value !== undefined);
  return Object.fromEntries(entries) as { [K in keyof T]: Exclude<T[K], undefined> };
}
