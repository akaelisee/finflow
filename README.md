# 🚀 FinFlow

> Gestionnaire de finances personnelles — projet fullstack React + TypeScript + Fastify + PostgreSQL.

## Structure

finflow/
├── apps/
│ ├── api/ # Back-end Fastify + Prisma
│ └── web/ # Front-end React + Vite
├── packages/
│ └── shared/ # Types + schémas Zod partagés
└── docker-compose.yml

## Démarrage rapide

```bash
# 1. Cloner
git clone git@github.com:USERNAME/finflow.git
cd finflow

# 2. Copier les variables d'environnement
cp .env.example .env

# 3. Lancer TOUT (db + api + front)
npm run dev
```

Tu verras :
- 🎨 Front  → http://localhost:5173
- 🔌 API    → http://localhost:3000
- 🗄️ DB     → localhost:5432 (accessible avec DBeaver)

## Commandes utiles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance tout via Docker Compose |
| `npm run dev:down` | Stoppe les containers |
| `npm run dev:clean` | Stoppe + supprime le volume DB (reset complet) |
| `npm run dev:logs` | Suit les logs en temps réel |

## État du projet

- [x] Étape 1 : Cahier des charges
- [x] Étape 2 : Monorepo + Docker Compose
- [ ] Étape 3 : Prisma + migrations
- [ ] Étape 4 : API REST + Zod
- [ ] Étape 5 : Authentification JWT
- [ ] Étape 6 : Front auth + shell
- [ ] Étape 7 : Comptes + transactions
- [ ] Étape 8 : Import CSV
- [ ] Étape 9 : Dashboard
- [ ] Étape 10 : Tests + CI/CD + deploy