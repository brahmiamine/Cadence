# Cadence

Un carnet d’habitudes personnel, responsive et utilisable hors ligne, installable comme PWA.

Application publiée : https://mosaique-habitudes.brahmiamine.chatgpt.site

## Démarrage local

L’application utilise HTML, CSS et JavaScript natifs. Aucune compilation ni dépendance npm n’est nécessaire.

```sh
python3 -m http.server 8080 --directory dist
```

Ouvrir http://localhost:8080. Un serveur HTTP est nécessaire pour charger les modules JavaScript ; ouvrir directement `index.html` ne suffit pas.

## Organisation

- `dist/index.html` : structure de la page.
- `dist/app.js` : interface et interactions.
- `dist/model.js` : logique des habitudes et calcul des statistiques.
- `dist/style.css` : styles et adaptation aux écrans mobiles.
- `dist/sw.js` : cache et fonctionnement hors ligne.
- `dist/manifest.webmanifest` : configuration de la PWA.
- `dist/assets/` : icônes, écrans de démarrage et polices avec leur licence.
- `.openai/hosting.json` : configuration du site existant dans ChatGPT Sites.

## Données et installation

Les habitudes sont enregistrées dans le stockage local du navigateur. Les paramètres permettent d’exporter et d’importer une sauvegarde JSON. Un autre domaine ou navigateur utilise un stockage distinct.

Pour installer la PWA et utiliser le service worker, servir l’application en HTTPS ou sur `localhost`. Le mode hors ligne devient disponible après le premier chargement et la mise en cache.

## Provenance

Import de la version du dépôt source Sites au commit `12a8557`. Les fichiers de l’application sont conservés à l’identique.
