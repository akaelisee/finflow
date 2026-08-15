# FinFlow API — Guide de test manuel

Base URL : `http://localhost:3000`

Aucune authentification pour l'instant : toutes les requêtes agissent au nom
de l'utilisateur démo créé par le seed (`demo@finflow.com`). Elle viendra à
l'étape suivante.

Tous les montants (`amount`, `initialBalance`, `spent`, …) sont en **centimes**
(ex : `2500` = 25,00 €).

## Codes d'erreur communs

| Code HTTP | `error` | Quand |
|-----------|---------|-------|
| 400 | `VALIDATION_ERROR` | Le body/query/params ne respecte pas le schéma Zod |
| 403 | `FORBIDDEN` | La ressource existe mais n'appartient pas au user, ou est en lecture seule (catégorie système) |
| 404 | `NOT_FOUND` | La ressource (ou une ressource liée, ex: `accountId`) n'existe pas |
| 409 | `CONFLICT` | Un budget existe déjà pour `(catégorie, mois)` |
| 500 | `INTERNAL_ERROR` | Erreur inattendue côté serveur |

Forme des réponses d'erreur :
```json
{ "error": "NOT_FOUND", "message": "Compte introuvable" }
```

Pour les 400, un champ `details` (sortie de `ZodError.flatten()`) est ajouté :
```json
{
  "error": "VALIDATION_ERROR",
  "message": "Données invalides",
  "details": { "formErrors": [], "fieldErrors": { "name": ["Le nom est requis"] } }
}
```

---

## 1. Accounts — `/api/accounts`

### `GET /api/accounts`
Liste les comptes du user (tri `createdAt DESC`), enrichis de `currentBalance`
et `transactionCount`.

**Réponse 200**
```json
[
  {
    "id": "58fb3452-...",
    "userId": "11111111-...",
    "name": "Compte courant BNP",
    "bank": "BNP Paribas",
    "type": "CHECKING",
    "initialBalance": 250000,
    "currency": "EUR",
    "color": "#378ADD",
    "createdAt": "2026-08-15T21:52:38.020Z",
    "updatedAt": "2026-08-15T21:52:38.020Z",
    "currentBalance": 1273190,
    "transactionCount": 125
  }
]
```

### `GET /api/accounts/:id`
Détail d'un compte. **404** si inexistant, **403** s'il n'appartient pas au user.

### `POST /api/accounts`
**Body**
```json
{
  "name": "Compte pro",
  "bank": "Qonto",
  "type": "CHECKING",
  "initialBalance": 500000,
  "color": "#378ADD"
}
```
`type`, `currency` (défaut `EUR`) et `color` sont optionnels.

**Réponse 201** : le compte créé (même forme que `GET /:id`).

### `PATCH /api/accounts/:id`
**Body** (tous les champs optionnels, au moins un attendu)
```json
{ "name": "Compte courant BNP — perso" }
```
**Réponse 200** : le compte mis à jour.

### `DELETE /api/accounts/:id`
Supprime le compte et ses transactions (cascade DB).
**Réponse 204** (pas de body).

---

## 2. Categories — `/api/categories`

### `GET /api/categories`
Catégories du user + catégories système (`userId: null`).

**Réponse 200**
```json
[
  {
    "id": "4c269ced-...",
    "userId": null,
    "name": "Alimentation",
    "color": "#D85A30",
    "icon": "shopping-cart",
    "isDefault": true,
    "createdAt": "2026-08-15T21:52:37.982Z"
  }
]
```

### `POST /api/categories`
Crée une catégorie custom (`userId` = user courant, `isDefault: false`).

**Body**
```json
{ "name": "Cadeaux Noël", "color": "#DB2777", "icon": "gift" }
```
**Réponse 201** : la catégorie créée.

### `PATCH /api/categories/:id`
Uniquement sur une catégorie **custom** du user. **403** si catégorie système
ou appartenant à un autre user.

**Body**
```json
{ "color": "#FF0000" }
```
**Réponse 200** : la catégorie mise à jour.

### `DELETE /api/categories/:id`
Même règle que `PATCH`. **Réponse 204**.

---

## 3. Transactions — `/api/transactions`

### `GET /api/transactions`
Liste filtrable et paginée.

**Query params** (tous optionnels)
- `accountId` (uuid)
- `categoryId` (uuid)
- `startDate` / `endDate` (ISO date)
- `search` (string, recherche insensible à la casse dans `label`)
- `page` (défaut `1`)
- `pageSize` (défaut `25`, max `100`)

Exemple : `GET /api/transactions?categoryId=4c269ced-...&page=2&pageSize=10`

**Réponse 200**
```json
{
  "data": [
    {
      "id": "ce3ea0a2-...",
      "accountId": "58fb3452-...",
      "categoryId": "b6aba3d5-...",
      "amount": -2940,
      "label": "Deliveroo",
      "transactionDate": "2026-08-24T00:00:00.000Z",
      "importedFrom": "MANUAL",
      "notes": null,
      "createdAt": "2026-08-15T21:52:38.040Z",
      "updatedAt": "2026-08-15T21:52:38.040Z",
      "category": { "id": "b6aba3d5-...", "name": "Restaurants", "...": "..." },
      "account": { "id": "58fb3452-...", "name": "Compte courant BNP", "...": "..." }
    }
  ],
  "pagination": { "page": 1, "pageSize": 5, "total": 153, "totalPages": 31 }
}
```

### `GET /api/transactions/:id`
Détail (avec `category` et `account` inclus). **404**/**403** comme les autres ressources.

### `POST /api/transactions`
**Body**
```json
{
  "accountId": "58fb3452-...",
  "categoryId": "4c269ced-...",
  "amount": -4500,
  "label": "Carrefour City",
  "transactionDate": "2026-08-15",
  "notes": "Courses de la semaine"
}
```
`categoryId` et `notes` sont optionnels (`null` accepté). `accountId` doit
appartenir au user (404 si le compte n'existe pas, 403 sinon) ; `categoryId`
(si fourni) doit être système ou appartenir au user.

**Réponse 201** : la transaction créée, avec `category`/`account` inclus.

### `PATCH /api/transactions/:id`
**Body** (partiel)
```json
{ "amount": -5200, "label": "Carrefour City (corrigé)" }
```
**Réponse 200** : la transaction mise à jour.

### `DELETE /api/transactions/:id`
**Réponse 204**.

---

## 4. Budgets — `/api/budgets`

### `GET /api/budgets?month=YYYY-MM`
Liste les budgets du mois donné (défaut : mois en cours), enrichis de
`spent`, `remaining`, `percentUsed`, `isExceeded`.

Exemple : `GET /api/budgets?month=2026-08`

**Réponse 200**
```json
[
  {
    "id": "4b0f3f9f-...",
    "userId": "11111111-...",
    "categoryId": "ef1a5803-...",
    "month": "2026-08",
    "amount": 70000,
    "createdAt": "2026-08-15T21:52:38.073Z",
    "category": { "id": "ef1a5803-...", "name": "Logement", "...": "..." },
    "spent": 73123,
    "remaining": -3123,
    "percentUsed": 104.46,
    "isExceeded": true
  }
]
```

### `POST /api/budgets`
**Body**
```json
{ "categoryId": "4c269ced-...", "month": "2026-09", "amount": 30000 }
```
**409 CONFLICT** si un budget existe déjà pour ce couple `(catégorie, mois)`.

**Réponse 201** : le budget créé (enrichi).

### `PATCH /api/budgets/:id`
Seul le montant peut être modifié.

**Body**
```json
{ "amount": 35000 }
```
**Réponse 200** : le budget mis à jour (enrichi).

### `DELETE /api/budgets/:id`
**Réponse 204**.

---

## Endpoints utilitaires (déjà existants)

- `GET /health` → `{ "status": "ok" }`
- `GET /` → infos de version
- `GET /api/db-health` → compte les lignes de chaque table (test de connexion DB)
