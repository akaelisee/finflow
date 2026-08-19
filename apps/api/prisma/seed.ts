/**
 * ============================================================================
 * FinFlow — Script de seed
 * ============================================================================
 * Peuple la base de données avec des données de test réalistes.
 *
 * Utilisation :
 *   npm run db:seed         # Ajoute les données (ou les met à jour)
 *   npm run db:reset        # Reset la DB puis re-seed automatiquement
 * ============================================================================
 */

import { PrismaClient } from '@prisma/client';
import { subMonths } from 'date-fns';

const prisma = new PrismaClient();

// ----------------------------------------------------------------------------
// DÉFINITIONS
// ----------------------------------------------------------------------------

const DEFAULT_CATEGORIES = [
  { name: 'Alimentation', color: '#D85A30', icon: 'shopping-cart' },
  { name: 'Logement',     color: '#378ADD', icon: 'home' },
  { name: 'Transports',   color: '#1D9E75', icon: 'car' },
  { name: 'Loisirs',      color: '#BA7517', icon: 'movie' },
  { name: 'Santé',        color: '#D4537E', icon: 'heart' },
  { name: 'Restaurants',  color: '#E24B4A', icon: 'chef-hat' },
  { name: 'Vêtements',    color: '#7F77DD', icon: 'shirt' },
  { name: 'Éducation',    color: '#5C82A8', icon: 'book' },
  { name: 'Abonnements',  color: '#8B5CF6', icon: 'device-mobile' },
  { name: 'Impôts',       color: '#374151', icon: 'file-invoice' },
  { name: 'Épargne',      color: '#639922', icon: 'pig-money' },
  { name: 'Cadeaux',      color: '#DB2777', icon: 'gift' },
  { name: 'Voyages',      color: '#0891B2', icon: 'plane' },
  { name: 'Animaux',      color: '#92400E', icon: 'paw' },
  { name: 'Revenus',      color: '#059669', icon: 'trending-up' },
];

const GROCERY_MERCHANTS = ['Carrefour City', 'Franprix', 'Monoprix', 'Intermarché'];
const TRANSPORT_MERCHANTS = ['SNCF Voyageurs', 'Uber', 'RATP - Navigo', 'Total Access'];
const RESTAURANT_MERCHANTS = ['Uber Eats', 'Deliveroo', 'Le Bistrot Parisien', 'Sushi Shop'];

const MISC_EXPENSES = [
  { label: 'Amazon', category: 'Vêtements', min: 3_000, max: 15_000 },
  { label: 'Pharmacie du Centre', category: 'Santé', min: 800, max: 4_500 },
  { label: 'Décathlon', category: 'Loisirs', min: 2_000, max: 9_000 },
  { label: 'Cinéma UGC', category: 'Loisirs', min: 900, max: 3_500 },
];

// Nombre de mois (dont le mois courant) sur lesquels générer les transactions.
const MONTHS_BACK = 6;

// ----------------------------------------------------------------------------
// HELPERS
// ----------------------------------------------------------------------------

/** Entier aléatoire entre `min` et `max` inclus. */
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(items: T[]): T {
  const item = items[randomInt(0, items.length - 1)];
  if (item === undefined) throw new Error('Liste vide');
  return item;
}

function monthKey(year: number, month: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}`;
}

// ----------------------------------------------------------------------------
// MAIN
// ----------------------------------------------------------------------------

async function main() {
  console.log('🌱 Seed démarré…\n');

  // ---- 1. Nettoyer la DB (ordre important à cause des FK) ----
  console.log('🧹 Nettoyage des tables…');
  await prisma.transaction.deleteMany();
  await prisma.budget.deleteMany();
  await prisma.category.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  // ---- 2. Créer l'utilisateur de test ----
  console.log('👤 Création de l\'utilisateur de test…');
  const user = await prisma.user.create({
    data: {
      // Id fixe pour matcher TEMP_USER_ID (apps/api/src/lib/constants.ts) tant qu'il n'y a pas d'auth
      id: '11111111-1111-1111-1111-111111111111',
      email: 'demo@finflow.com',
      // ⚠️ Password hardcodé pour le dev. À l'étape 5 on utilisera bcrypt.
      passwordHash: '$2b$10$placeholder.hash.will.be.replaced.at.step.5',
      name: 'Sarah Demo',
    },
  });
  console.log(`   ✓ ${user.email}`);

  // ---- 3. Créer les catégories par défaut ----
  console.log('🏷️  Création des catégories par défaut…');
  const categories = await Promise.all(
    DEFAULT_CATEGORIES.map((cat) =>
      prisma.category.create({
        data: {
          ...cat,
          isDefault: true,
          userId: null, // système
        },
      }),
    ),
  );
  console.log(`   ✓ ${categories.length} catégories créées`);

  // Petit helper pour retrouver une catégorie par nom
  const catByName = (name: string) => {
    const found = categories.find((c) => c.name === name);
    if (!found) throw new Error(`Catégorie introuvable : ${name}`);
    return found;
  };

  // ---- 4. Créer 3 comptes bancaires ----
  console.log('💳 Création des comptes bancaires…');
  const bnpAccount = await prisma.account.create({
    data: {
      userId: user.id,
      name: 'Compte courant BNP',
      bank: 'BNP Paribas',
      type: 'CHECKING',
      initialBalance: 250_000, // 2 500,00 €
      color: '#378ADD',
    },
  });
  const livretAccount = await prisma.account.create({
    data: {
      userId: user.id,
      name: 'Livret A',
      bank: 'BNP Paribas',
      type: 'SAVINGS',
      initialBalance: 700_000, // 7 000,00 €
      color: '#1D9E75',
    },
  });
  const boursoramaAccount = await prisma.account.create({
    data: {
      userId: user.id,
      name: 'Compte Boursorama',
      bank: 'Boursorama Banque',
      type: 'CHECKING',
      initialBalance: 85_000, // 850,00 €
      color: '#E24B4A',
    },
  });
  console.log(`   ✓ ${bnpAccount.name}`);
  console.log(`   ✓ ${livretAccount.name}`);
  console.log(`   ✓ ${boursoramaAccount.name}`);

  /** La majorité des dépenses courantes tombent sur le compte courant BNP. */
  function pickCurrentAccountId(): string {
    const roll = Math.random();
    if (roll < 0.75) return bnpAccount.id;
    if (roll < 0.95) return boursoramaAccount.id;
    return livretAccount.id;
  }

  // ---- 5. Générer les transactions sur les 6 derniers mois ----
  console.log('💸 Génération des transactions…');

  type TransactionDraft = {
    date: Date;
    amount: number;
    label: string;
    category: string;
    accountId: string;
  };

  const drafts: TransactionDraft[] = [];
  const now = new Date();

  for (let monthsAgo = MONTHS_BACK - 1; monthsAgo >= 0; monthsAgo--) {
    const monthDate = subMonths(now, monthsAgo);
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const dayInMonth = (day: number) => new Date(year, month, day);

    // Salaire, le 1er
    drafts.push({
      date: dayInMonth(1),
      amount: 320_000,
      label: 'VIR ACME CORP SALAIRE',
      category: 'Revenus',
      accountId: bnpAccount.id,
    });

    // Loyer, le 3
    drafts.push({
      date: dayInMonth(3),
      amount: -68_500,
      label: 'Loyer appartement',
      category: 'Logement',
      accountId: bnpAccount.id,
    });

    // Facture d'énergie, autour du 6
    drafts.push({
      date: dayInMonth(6),
      amount: -randomInt(4_500, 7_000),
      label: 'EDF',
      category: 'Logement',
      accountId: bnpAccount.id,
    });

    // Abonnements récurrents
    drafts.push({
      date: dayInMonth(5),
      amount: -1_599,
      label: 'Netflix',
      category: 'Abonnements',
      accountId: bnpAccount.id,
    });
    drafts.push({
      date: dayInMonth(15),
      amount: -1_299,
      label: 'Spotify Premium',
      category: 'Abonnements',
      accountId: bnpAccount.id,
    });

    // Courses (6 à 8 fois par mois)
    const groceryCount = randomInt(6, 8);
    for (let g = 0; g < groceryCount; g++) {
      drafts.push({
        date: dayInMonth(randomInt(1, 28)),
        amount: -randomInt(3_000, 6_000),
        label: pick(GROCERY_MERCHANTS),
        category: 'Alimentation',
        accountId: pickCurrentAccountId(),
      });
    }

    // Transports (4 à 6 fois par mois)
    const transportCount = randomInt(4, 6);
    for (let t = 0; t < transportCount; t++) {
      drafts.push({
        date: dayInMonth(randomInt(1, 28)),
        amount: -randomInt(1_200, 9_000),
        label: pick(TRANSPORT_MERCHANTS),
        category: 'Transports',
        accountId: pickCurrentAccountId(),
      });
    }

    // Restaurants / livraison (4 à 6 fois par mois)
    const restaurantCount = randomInt(4, 6);
    for (let r = 0; r < restaurantCount; r++) {
      drafts.push({
        date: dayInMonth(randomInt(1, 28)),
        amount: -randomInt(1_500, 7_000),
        label: pick(RESTAURANT_MERCHANTS),
        category: 'Restaurants',
        accountId: pickCurrentAccountId(),
      });
    }

    // Dépenses diverses (2 à 4 fois par mois)
    const miscCount = randomInt(2, 4);
    for (let m = 0; m < miscCount; m++) {
      const expense = pick(MISC_EXPENSES);
      drafts.push({
        date: dayInMonth(randomInt(1, 28)),
        amount: -randomInt(expense.min, expense.max),
        label: expense.label,
        category: expense.category,
        accountId: pickCurrentAccountId(),
      });
    }

    // Versement épargne, un mois sur deux
    if (monthsAgo % 2 === 0) {
      drafts.push({
        date: dayInMonth(2),
        amount: randomInt(10_000, 30_000),
        label: 'Versement mensuel épargne',
        category: 'Épargne',
        accountId: livretAccount.id,
      });
    }
  }

  const transactionsData = drafts.map((draft) => ({
    accountId: draft.accountId,
    categoryId: catByName(draft.category).id,
    amount: draft.amount,
    label: draft.label,
    transactionDate: draft.date,
    importedFrom: 'MANUAL' as const,
  }));

  await prisma.transaction.createMany({ data: transactionsData });
  console.log(`   ✓ ${transactionsData.length} transactions créées sur ${MONTHS_BACK} mois`);

  // ---- 6. Créer des budgets sur le mois en cours et le mois précédent ----
  console.log('🎯 Création des budgets…');

  const currentMonthKey = monthKey(now.getFullYear(), now.getMonth());
  const previousMonthDate = subMonths(now, 1);
  const previousMonthKey = monthKey(previousMonthDate.getFullYear(), previousMonthDate.getMonth());

  const budgetsData = [
    // Mois courant — certains montants sont volontairement serrés pour
    // tester l'UI de dépassement (loyer + énergie dépassent souvent 70 000).
    { month: currentMonthKey, category: 'Logement', amount: 70_000 },
    { month: currentMonthKey, category: 'Alimentation', amount: 25_000 },
    { month: currentMonthKey, category: 'Transports', amount: 20_000 },
    { month: currentMonthKey, category: 'Restaurants', amount: 20_000 },
    { month: currentMonthKey, category: 'Loisirs', amount: 15_000 },

    // Mois précédent
    { month: previousMonthKey, category: 'Logement', amount: 75_000 },
    { month: previousMonthKey, category: 'Alimentation', amount: 25_000 },
    { month: previousMonthKey, category: 'Transports', amount: 20_000 },
    { month: previousMonthKey, category: 'Abonnements', amount: 3_500 },
    { month: previousMonthKey, category: 'Santé', amount: 5_000 },
  ];

  for (const b of budgetsData) {
    await prisma.budget.create({
      data: {
        userId: user.id,
        categoryId: catByName(b.category).id,
        month: b.month,
        amount: b.amount,
      },
    });
  }
  console.log(`   ✓ ${budgetsData.length} budgets créés (${previousMonthKey} et ${currentMonthKey})`);

  console.log('\n✅ Seed terminé avec succès !\n');
  console.log('📊 Résumé :');
  console.log(`   👤 1 utilisateur : demo@finflow.com`);
  console.log(`   🏷️  ${categories.length} catégories`);
  console.log(`   💳 3 comptes bancaires`);
  console.log(`   💸 ${transactionsData.length} transactions`);
  console.log(`   🎯 ${budgetsData.length} budgets`);
  console.log('\n💡 Ouvre Prisma Studio pour voir les données :');
  console.log('   npm run db:studio\n');
}

main()
  .catch((e) => {
    console.error('❌ Erreur pendant le seed :', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
