# Cadence

Carnet d’habitudes personnel, désormais en **Next.js** avec **comptes multi-utilisateurs** (NextAuth) et **données stockées en base MariaDB / MySQL** pour chaque utilisateur.

## Stack

- Next.js 15 (App Router) · React 19 · TypeScript
- NextAuth v4 (credentials e-mail / mot de passe, sessions JWT, mots de passe hachés avec bcrypt)
- Prisma + MariaDB / MySQL (tables `User`, `Habit`, `Entry`)

## Démarrage local

```sh
cp .env.example .env          # puis définir NEXTAUTH_SECRET (openssl rand -base64 32)
docker compose up -d db       # MariaDB
npm install
npx prisma migrate deploy     # crée les tables
npm run dev                   # http://localhost:3000
```

Créez un compte sur `/register` : chaque utilisateur accède uniquement à son propre espace.

## Variables d’environnement

| Variable | Rôle |
|---|---|
| `DATABASE_URL` | URL MariaDB / MySQL |
| `NEXTAUTH_SECRET` | Secret de signature des sessions |
| `NEXTAUTH_URL` | URL publique de l’application |

## Déploiement 

Définir les 3 variables ci-dessus, puis exécuter `npx prisma migrate deploy` contre la base de production (build : `npm run build`).

## Organisation

- `src/app/` : pages (`/`, `/login`, `/register`) et API (`/api/auth`, `/api/register`, `/api/data`).
- `src/lib/cadence/model.js` : logique des habitudes et statistiques (partagée client/serveur pour la validation).
- `src/lib/cadence/engine.js` : interface historique de Cadence, branchée sur l’API au lieu du `localStorage`.
- `src/lib/data.ts` : lecture/écriture des données d’un utilisateur en base.
- `prisma/` : schéma et migrations.
- `public/` : icônes, polices, manifeste PWA, service worker (ressources statiques uniquement).

## Données

Chaque modification est synchronisée vers `/api/data` (validée côté serveur, isolée par utilisateur). L’export/import JSON reste disponible dans les paramètres ; l’import d’une ancienne sauvegarde locale la rattache au compte connecté. Les données sont rafraîchies quand l’onglet redevient actif (multi-appareils).
