# GorvCorp — draft Angular

Page d’accueil responsive inspirée de `DESIGN.md`, réalisée avec Angular 22 et des composants standalone.

## Démarrage

```sh
npm install
npm start
```

Ouvrir http://localhost:4200.

```sh
npm run build
```

La version de production est générée dans `dist/gorvcorp/browser`.

## Périmètre du draft

- Accueil, line-ups, WebTV, recrutement et contact.
- Navigation mobile, liens d’ancrage et formulaire avec validation native.
- Logo fourni converti en WebP sans perte : `public/gc-logo.webp` (10 630 octets, contre 13 266 pour le PNG).
- Le formulaire simule la validation et affiche explicitement qu’aucun message n’est envoyé. Aucun backend ni stockage de données personnelles.
- Le statut Twitch n’est pas simulé : seul le rendez-vous du vendredi est annoncé, en heure de Paris.
- Les liens Discord/YouTube et les pages juridiques sont à ajouter lorsque leurs destinations officielles seront fournies.
- Photos d’illustration Unsplash et police Google Fonts chargées à distance, à remplacer ou héberger localement avant production.
