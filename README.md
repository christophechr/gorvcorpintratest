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
- `ghcr.io/christophechr/gorvcorpintratest:build-<numéro de run>.<tentative>`

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

Chaque push sur `main` publie aussi une release `build-<numéro de run>.<tentative>` contenant une archive telle que `gorvcorp-build-42.1-linux-amd64.tar.gz` : l’image complète pour Linux x86-64.

La release cible le commit construit. Une nouvelle tentative du workflow crée une release distincte. Le même tag identifie la release GitHub et l’image Docker. Par exemple, `build-42.1` correspond au run 42, première tentative. L’archive est exportée depuis cette image taguée.

Télécharger l’archive depuis [GitHub Releases](https://github.com/christophechr/gorvcorpintratest/releases), puis :

```sh
docker load -i gorvcorp-build-42.1-linux-amd64.tar.gz
docker run --rm -p 8080:80 ghcr.io/christophechr/gorvcorpintratest:build-42.1
```

Remplacer `build-42.1` par le tag de la release téléchargée. `docker load` accepte directement l’archive gzip ; aucun accès au registre GHCR n’est nécessaire pour la charger. L’image est destinée aux machines amd64 ; sur Apple Silicon, Docker nécessite l’émulation avec `--platform linux/amd64` au lancement.

## Déploiement automatique sur le VPS

Après la publication de la release, GitHub Actions transfère l’archive par SSH et déploie un nouveau conteneur `gorvcorp` dans `/home/debian/gorvcorp`, avec l’utilisateur `debian`. Nginx est inclus dans l’image ; aucune installation de Nginx ou Docker Compose sur le VPS n’est nécessaire.

Configurer dans **Settings → Secrets and variables → Actions** :

| Type                 | Nom               | Valeur                                          |
| -------------------- | ----------------- | ----------------------------------------------- |
| Secret               | `VPS_HOST`        | Adresse IP ou nom DNS du VPS                    |
| Secret               | `VPS_SSH_KEY`     | Clé privée SSH dédiée, sans passphrase          |
| Secret               | `VPS_KNOWN_HOSTS` | Entrée SSH connue du VPS (format `known_hosts`) |
| Variable facultative | `VPS_SSH_PORT`    | Port SSH, `22` par défaut                       |
| Variable facultative | `VPS_HTTP_PORT`   | Port HTTP publié, `80` par défaut               |

Ajouter la clé publique correspondante à `/home/debian/.ssh/authorized_keys`. L’utilisateur `debian` doit pouvoir exécuter Docker directement ou via `sudo -n docker`. Le VPS doit être Linux amd64 et son port HTTP doit être libre et accessible dans le pare-feu.

Pour obtenir l’entrée `known_hosts`, depuis une machine qui connaît déjà le VPS :

```sh
ssh-keygen -F ADRESSE_DU_VPS
# Pour un port SSH personnalisé :
ssh-keygen -F '[ADRESSE_DU_VPS]:PORT_SSH'
```

Copier la ligne de clé de l’hôte dans `VPS_KNOWN_HOSTS`. Cette authentification SSH est indépendante de la vérification d’archive SHA-256 supprimée.

Le déploiement teste `/healthz` dans un conteneur temporaire avant de remplacer le site. Une courte interruption accompagne le remplacement. Si le nouveau conteneur ne démarre pas correctement, le précédent est restauré. Le conteneur précédent est conservé arrêté sous `gorvcorp-previous` jusqu’à la mise à jour suivante ; l’archive transférée est supprimée après succès. Le tag actif est écrit dans `current-image.txt`.

L’application sera accessible en HTTP sur `http://ADRESSE_DU_VPS` (ou le port configuré). Le HTTPS et le nom de domaine ne sont pas configurés par ce workflow. Les releases restent disponibles même si le déploiement échoue.

## Lecteur Twitch

La section WebTV intègre le lecteur officiel de `GorvCorptv`, sans lecture automatique. Le paramètre Twitch `parent` utilise le nom d’hôte courant, sans port. En production, Twitch exige un domaine servi en HTTPS : le déploiement HTTP actuel du VPS devra donc recevoir un domaine et un certificat TLS pour la lecture intégrée.

Le lecteur conserve au moins 400 × 300 px ; sur les petits écrans qui ne permettent pas cette largeur, un lien ouvre Twitch. Le bouton externe reste disponible sur tous les écrans.
