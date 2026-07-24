/** Formate un montant en centimes (ex: 4280) en devise lisible (ex: "42,80 €"). */
export function formatMoney(cents, currency = 'EUR') {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency }).format(cents / 100);
}
