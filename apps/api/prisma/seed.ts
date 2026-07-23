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

  // Petits helpers pour retrouver une catégorie par nom
  const catByName = (name: string) => {
    const found = categories.find((c) => c.name === name);
    if (!found) throw new Error(`Catégorie introuvable : ${name}`);
    return found;
  };

  // ---- 4. Créer 2 comptes bancaires ----
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
  console.log(`   ✓ ${bnpAccount.name}`);
  console.log(`   ✓ ${livretAccount.name}`);

  // ---- 5. Créer ~30 transactions sur 2 mois ----
  console.log('💸 Création des transactions…');

  // On génère les 2 derniers mois complets
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const dateInMonth = (year: number, month: number, day: number) =>
    new Date(year, month, day);

  const transactionsData = [
    // ---- Mois -1 ----
    { date: dateInMonth(currentYear, currentMonth - 1, 1),  amount: 320_000,  label: 'VIR ACME CORP SALAIRE',    category: 'Revenus' },
    { date: dateInMonth(currentYear, currentMonth - 1, 3),  amount: -55_000,  label: 'EDF',                        category: 'Logement' },
    { date: dateInMonth(currentYear, currentMonth - 1, 5),  amount: -68_500,  label: 'Loyer',                      category: 'Logement' },
    { date: dateInMonth(currentYear, currentMonth - 1, 8),  amount: -4_280,   label: 'CARREFOUR CITY',            category: 'Alimentation' },
    { date: dateInMonth(currentYear, currentMonth - 1, 10), amount: -8_950,   label: 'SNCF Voyageurs',            category: 'Transports' },
    { date: dateInMonth(currentYear, currentMonth - 1, 12), amount: -3_200,   label: 'Uber Eats',                 category: 'Restaurants' },
    { date: dateInMonth(currentYear, currentMonth - 1, 15), amount: -1_599,   label: 'Netflix',                    category: 'Abonnements' },
    { date: dateInMonth(currentYear, currentMonth - 1, 18), amount: -2_430,   label: 'Pharmacie',                  category: 'Santé' },
    { date: dateInMonth(currentYear, currentMonth - 1, 20), amount: -12_050,  label: 'Amazon',                     category: 'Vêtements' },
    { date: dateInMonth(currentYear, currentMonth - 1, 22), amount: -5_680,   label: 'Restaurant chinois',        category: 'Restaurants' },
    { date: dateInMonth(currentYear, currentMonth - 1, 25), amount: -1_850,   label: 'Uber',                       category: 'Transports' },
    { date: dateInMonth(currentYear, currentMonth - 1, 27), amount: -3_490,   label: 'Franprix',                   category: 'Alimentation' },
    { date: dateInMonth(currentYear, currentMonth - 1, 28), amount: -9_990,   label: 'Décathlon',                  category: 'Loisirs' },
    { date: dateInMonth(currentYear, currentMonth - 1, 30), amount: -1_299,   label: 'Spotify Premium',           category: 'Abonnements' },

    // ---- Mois courant ----
    { date: dateInMonth(currentYear, currentMonth, 1),  amount: 320_000,  label: 'VIR ACME CORP SALAIRE',    category: 'Revenus' },
    { date: dateInMonth(currentYear, currentMonth, 2),  amount: -1_599,   label: 'Netflix',                    category: 'Abonnements' },
    { date: dateInMonth(currentYear, currentMonth, 3),  amount: -68_500,  label: 'Loyer',                      category: 'Logement' },
    { date: dateInMonth(currentYear, currentMonth, 4),  amount: -8_950,   label: 'SNCF Voyageurs',            category: 'Transports' },
    { date: dateInMonth(currentYear, currentMonth, 5),  amount: -4_820,   label: 'CARREFOUR CITY',            category: 'Alimentation' },
    { date: dateInMonth(currentYear, currentMonth, 7),  amount: -3_150,   label: 'Deliveroo',                  category: 'Restaurants' },
    { date: dateInMonth(currentYear, currentMonth, 9),  amount: -1_850,   label: 'Uber',                       category: 'Transports' },
    { date: dateInMonth(currentYear, currentMonth, 11), amount: -2_990,   label: 'Franprix',                   category: 'Alimentation' },
    { date: dateInMonth(currentYear, currentMonth, 13), amount: -6_720,   label: 'Restaurant italien',        category: 'Restaurants' },
    { date: dateInMonth(currentYear, currentMonth, 15), amount: -1_299,   label: 'Spotify Premium',           category: 'Abonnements' },
    { date: dateInMonth(currentYear, currentMonth, 17), amount: -3_480,   label: 'Monoprix',                   category: 'Alimentation' },
    { date: dateInMonth(currentYear, currentMonth, 18), amount: -55_000,  label: 'EDF',                        category: 'Logement' },
    { date: dateInMonth(currentYear, currentMonth, 20), amount: -2_490,   label: 'Uber Eats',                  category: 'Restaurants' },
    { date: dateInMonth(currentYear, currentMonth, 22), amount: -1_500,   label: 'Métro RATP',                category: 'Transports' },
    { date: dateInMonth(currentYear, currentMonth, 24), amount: -8_500,   label: 'Cinéma UGC',                 category: 'Loisirs' },
  ];

  for (const t of transactionsData) {
    await prisma.transaction.create({
      data: {
        accountId: bnpAccount.id,
        categoryId: catByName(t.category).id,
        amount: t.amount,
        label: t.label,
        transactionDate: t.date,
        importedFrom: 'MANUAL',
      },
    });
  }
  console.log(`   ✓ ${transactionsData.length} transactions créées`);

  // ---- 6. Créer quelques budgets pour le mois en cours ----
  console.log('🎯 Création des budgets…');
  const currentMonthKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`;
  const budgetsData = [
    { category: 'Alimentation', amount: 50_000 },
    { category: 'Logement',     amount: 130_000 },
    { category: 'Transports',   amount: 15_000 },
    { category: 'Restaurants',  amount: 20_000 },
    { category: 'Loisirs',      amount: 10_000 },
  ];

  for (const b of budgetsData) {
    await prisma.budget.create({
      data: {
        userId: user.id,
        categoryId: catByName(b.category).id,
        month: currentMonthKey,
        amount: b.amount,
      },
    });
  }
  console.log(`   ✓ ${budgetsData.length} budgets créés pour ${currentMonthKey}`);

  console.log('\n✅ Seed terminé avec succès !\n');
  console.log('📊 Résumé :');
  console.log(`   👤 1 utilisateur : demo@finflow.com`);
  console.log(`   🏷️  ${categories.length} catégories`);
  console.log(`   💳 2 comptes bancaires`);
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