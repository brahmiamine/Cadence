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

### Production sur le VPS avec Docker et Caddy

1. Créer un fichier `.env` à partir de `.env.example` avec `NEXTAUTH_URL=https://cadence.clubika.com`, un `NEXTAUTH_SECRET` aléatoire et les identifiants MariaDB de production. Le fichier reste hors de Git et de l’image Docker.
2. Pour la base MariaDB de l’hôte, utiliser le socket `/run/mysqld/mysqld.sock` dans `DATABASE_URL`, comme indiqué dans `.env.example`. Le conteneur monte le répertoire du socket.
3. Le conteneur Caddy et Cadence doivent partager le réseau Docker `clubika_internal`. Définir `PROXY_NETWORK` dans `.env` si le réseau porte un autre nom.
4. Construire et démarrer Cadence :

   ```sh
   docker compose -f docker-compose.prod.yml up -d --build --wait
   ```

   Le démarrage applique les migrations Prisma avant de lancer Next.js. Le contrôle de santé vérifie l’application et sa connexion à MariaDB via `/api/health`.
5. Faire pointer le DNS de `cadence.clubika.com` vers le VPS. Ajouter le bloc de `deploy/Caddyfile` au Caddyfile partagé du serveur, puis valider et recharger Caddy :

   ```sh
   docker exec clubika-caddy-1 caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile
   docker exec clubika-caddy-1 caddy reload --config /etc/caddy/Caddyfile --adapter caddyfile
   ```

   Caddy obtient et renouvelle automatiquement le certificat HTTPS. Sur ce VPS, le Caddyfile partagé est `/opt/clubika/deploy/Caddyfile` ; le bloc Cadence s’ajoute aux domaines existants.
6. Vérifier `https://cadence.clubika.com/login` et `https://cadence.clubika.com/api/health` (réponse attendue : `{"ok":true}`). Les pages de connexion et d’inscription sont publiques ; les données exigent une session authentifiée.

## Organisation

- `src/app/` : pages (`/`, `/login`, `/register`) et API (`/api/auth`, `/api/register`, `/api/data`).
- `src/lib/cadence/model.js` : logique des habitudes et statistiques (partagée client/serveur pour la validation).
- `src/lib/cadence/engine.js` : interface historique de Cadence, branchée sur l’API au lieu du `localStorage`.
- `src/lib/data.ts` : lecture/écriture des données d’un utilisateur en base.
- `prisma/` : schéma et migrations.
- `public/` : icônes, polices, manifeste PWA, service worker (ressources statiques uniquement).

## Données

Chaque modification est synchronisée vers `/api/data` (validée côté serveur, isolée par utilisateur). L’export/import JSON reste disponible dans les paramètres ; l’import d’une ancienne sauvegarde locale la rattache au compte connecté. Les données sont rafraîchies quand l’onglet redevient actif (multi-appareils).
