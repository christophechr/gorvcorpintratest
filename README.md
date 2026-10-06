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

## Docker et publication automatique

Chaque push sur `main` construit l’application Angular en production et publie son image Nginx sur GitHub Container Registry :

- `ghcr.io/christophechr/gorvcorpintratest:latest`
- `ghcr.io/christophechr/gorvcorpintratest:sha-<SHA complet du commit>`

Le workflow `.github/workflows/docker-publish.yml` utilise le `GITHUB_TOKEN` automatique avec les permissions `packages: write` (registre) et `contents: write` (releases). Aucun secret supplémentaire n’est nécessaire. GitHub Actions doit être activé sur le dépôt ; les éventuelles politiques de l’organisation doivent autoriser la publication de packages. Le workflow peut aussi être lancé manuellement sur `main`.

```sh
docker build -t gorvcorp:local .
docker run --rm -p 8080:80 gorvcorp:local
```

Ouvrir http://localhost:8080. L’image sert le front-end CSR existant et expose `/healthz` pour vérifier son état.

Pour utiliser l’image publiée :

```sh
docker pull ghcr.io/christophechr/gorvcorpintratest:latest
docker run --rm -p 8080:80 ghcr.io/christophechr/gorvcorpintratest:latest
```

Si le package est privé, s’authentifier à GHCR avec un compte autorisé et un jeton disposant de `read:packages` avant le téléchargement.

## Télécharger une image depuis les releases

Chaque push sur `main` publie aussi une release `docker-<numéro de run>-<tentative>` contenant :

- `gorvcorp-<SHA du commit>-linux-amd64.tar.gz` : image complète pour Linux x86-64.
- Le fichier `.sha256` associé pour vérifier son intégrité.

La release cible le commit construit. Une nouvelle tentative du workflow crée une release distincte. L’archive est exportée à partir du digest de l’image publiée, pour garantir qu’elle correspond à ce build.

Télécharger les deux fichiers depuis [GitHub Releases](https://github.com/christophechr/gorvcorpintratest/releases), puis :

```sh
sha256sum -c gorvcorp-<SHA du commit>-linux-amd64.tar.gz.sha256
docker load -i gorvcorp-<SHA du commit>-linux-amd64.tar.gz
docker run --rm -p 8080:80 ghcr.io/christophechr/gorvcorpintratest:sha-<SHA du commit>
```

Remplacer `<SHA du commit>` par le SHA figurant dans le nom du fichier. `docker load` accepte directement l’archive gzip ; aucun accès au registre GHCR n’est nécessaire pour la charger. Sur macOS, utiliser `shasum -a 256 -c` pour vérifier l’intégrité. L’image est destinée aux machines amd64 ; sur Apple Silicon, Docker nécessite l’émulation avec `--platform linux/amd64` au lancement.
