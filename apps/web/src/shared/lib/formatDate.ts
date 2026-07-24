export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const parsed = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(
    'fr-FR',
    options ?? { day: '2-digit', month: 'short', year: 'numeric' },
  ).format(parsed);
}

/** "2026-07" -> "juillet 2026" */
export function formatMonth(month: string): string {
  const [year, monthIndex] = month.split('-');
  const parsed = new Date(Number(year), Number(monthIndex) - 1, 1);
  return new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(parsed);
}

/** Mois courant au format "YYYY-MM". */
export function currentMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}
