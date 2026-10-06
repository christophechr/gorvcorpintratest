# Product Requirements Document (PRD) & Brief de Projet
## Refonte de la Plateforme Web Officielle — GorvCorp

---

### 1. Synthèse Exécutive & Contexte du Projet

* **Client / Marque** : GorvCorp (Organisation Multigaming & Communauté Esport francophone fondée en 2019).
* **URL Actuelle de référence** : `https://www.gorvcorp.fr/`
* **Objectif Principal** : Moderniser l'image de marque de la GorvCorp à travers une interface web sobre, premium et responsive, tout en préservant l'ADN communautaire historique (humour décalé, culte du « meuporg », l'Individu Lambda) et en professionnalisant les canaux de conversion (recrutement compétitif, WebTV Twitch hebdomadaire, partenariats).
* **Anti-patterns identifiés (à proscrire)** : 
  * Éviter le piège du « template SaaS générique » cubique et aseptisé.
  * Éviter le look « vibe-codé » / néons criards, dégradés excessifs et accumulation de faux badges/voyants artificiels.
  * Privilégier un design authentique, mat, aéré et pérenne.

---

### 2. Cibles & Personas Utilisateurs

1. **Le Joueur Compétitif / Recrue Esport** :
   * *Besoin* : Identifier rapidement les line-ups actives (MMORPG/PVE HL, FPS tactique, Rocket League, Arcade), comprendre le processus de sélection transparent (« examen garanti sans sous-traitance ») et candidater facilement.
2. **Le Spectateur / Fan WebTV** :
   * *Besoin* : Connaître le rendez-vous phare du direct Twitch (tous les vendredis soir à 22h00), accéder immédiatement au live et aux rediffusions/réseaux sociaux.
3. **Le Partenaire / Sponsor / Organisateur d'événements** :
   * *Besoin* : Évaluer le sérieux et l'ancrage de la communauté, entrer en contact via un formulaire direct et catégorisé (sélection d'objet).
4. **Le Membre Communautaire** :
   * *Besoin* : Retrouver les délires cultes de la corporation, rejoindre le serveur Discord officiel et suivre l'actualité des équipes.

---

### 3. Direction Artistique & Charte UI/UX

* **Système Graphique de Référence** : *Electric Slate Esport*
* **Typographie** : 
  * Famille principale : `Plus Jakarta Sans` (ou police géométrique sans-serif sobre et lisible, avec de vraies graisses hiérarchisées).
  * Ton typographique : Lisible, fluide, professionnel, sans effets de dégradés sur le texte ni ombrages saturés.
* **Palette Chromatique** :
  * **Fond d'écran / Canvas** : Bleu nuit ardoise profond (`#0B1120` / `#0D1322`), mat, sans grands halos néon floutés.
  * **Surfaces de cartes & conteneurs** : Éléments sombres structurés (`#151B2B`), séparations nettes et fines (`border-white/10`).
  * **Couleur Primaire (Accent Cyan)** : `#00D2FF` — appliqué avec parcimonie sur les boutons d'action clés (CTA recrutement/contact) et repères interactifs.
  * **Couleur Secondaire (Jaune Or / Ambre)** : `#FACC15` / `#F59E0B` — en hommage au logo officiel, réservé aux éléments d'alerte positive (statut du Live Twitch, badge d'authenticité, distinctions).
* **Principes d'Interaction & Forme** :
  * Arrondis doux (`rounded-xl` à `rounded-2xl`).
  * Suppression des dégradés arc-en-ciel au profit d'aplats de couleur contrastés et élégants.
  * Épuration des micro-notifications décoratives non fonctionnelles.

---

### 4. Spécifications Fonctionnelles & Architecture des Contenus

#### 4.1. Navigation & En-tête (Header)
* **Composants** :
  * Logo vectoriel officiel GorvCorp (monogramme GC cyan & or).
  * Liens d'ancrage internes : *Page d'Accueil*, *Notre Équipe*, *Notre WebTV*, *Recrutement*, *Contact*.
  * Call-to-Action persistant : Bouton direct vers le serveur Discord officiel et indicateur sobre du créneau Live du vendredi.

#### 4.2. Hero Section (Manifeste de Marque)
* **Titre principal** : « Bienvenue sur le site de la GorvCorp ! »
* **Accroche verbatim** : « Existante depuis 2019, l'élite de la nation s'est rassemblée autour d'un même but : conquérir les internets et les meuporgs. »
* **Actions** :
  * Bouton principal : *Découvrir notre équipe* (ancrage).
  * Bouton secondaire : *Rejoindre l'aventure* (redirection Discord / Recrutement).

#### 4.3. Pôle Recrutement & Compétitions
* **Philosophie** : Recrutement transparent et rigoureux (« examen garanti sans sous-traitance »).
* **Line-ups mises en avant** :
  * *Meuporgs & MMORPG* (Raids HL, optimisation PvE & PvP).
  * *FPS & Tactical* (Valorant, CS, tournois nationaux & scrims).
  * *Rocket League & Arcade* (Ligue 3v3, entraînements structurés).
  * *WebTV & Casters* (Animation, modération, régie streaming).
* **Le Clin d'œil « Individu Lambda »** :
  * Intégration textuelle subtile de la citation culte d'origine (*« Comme cette personne qui n'existe pas (vous pouvez vérifier), rejoignez-nous ! »*) sans artifices visuels kitsch.
* **Délai d'engagement** : Dossier traité sous 48h par le directoire.

#### 4.4. Espace WebTV & Streaming Twitch
* **Créneau officiel** : Tous les vendredis soir à partir de 22h00 CET en direct.
* **Fonctionnalités** :
  * Lecteur / Aperçu visuel optimisé sans fausses métriques tape-à-l'œil.
  * Points clés du programme : Plateau multigaming interactif, débats communautaires sans filtre, chat dynamique et giveaways.
  * CTA externe : *Regarder sur Twitch* avec redirection vérifiée vers `https://twitch.tv/GorvCorptv`.

#### 4.5. Pôle Contact & Partenariat (Formulaire Avancé)
* **Objectif** : Canal unique de prise de contact (remplaçant les anciens formulaires d'inscription dispersés).
* **Champs obligatoires** :
  * *Nom complet ou pseudo*
  * *Adresse e-mail*
  * *Numéro de téléphone* (facultatif / secondaire)
  * *Objet du message* (Sélecteur déroulant : **Candidature**, **Partenariat**, **Autre**)
  * *Corps du message* (Textarea étendu)
  * Bouton de soumission explicite (*Envoyer le message*).
* **Canaux alternatifs intégrés** :
  * Liens directs vers les réseaux certifiés : Twitter/X (`@Gorvcorp`), Twitch (`GorvCorptv`), Discord (`Discord Club`), YouTube (`GorvCorp YT`).

#### 4.6. Pied de Page (Footer)
* **Composants** :
  * Rappel du logo officiel et de la mission de l'organisation.
  * Navigation secondaire : Line-ups, WebTV, Tryouts, Mentions Légales, CGU / Confidentialité.
  * Mention légale et copyright : `Copyright © 2019-2025 GorvCorp. Tous droits réservés.`

---

### 5. Exigences Techniques & Performance

* **Format du code** : HTML5 sémantique, Tailwind CSS (classes utilitaires maîtrisées, sans chaînes redondantes de gradient/shadow), JavaScript vanilla léger.
* **Accessibilité (a11y)** :
  * Ratio de contraste supérieur à 4.5:1 sur l'ensemble des textes et boutons interactifs.
  * Balises `label` et attributs d'accessibilité sur tous les champs de formulaires.
* **Responsive Design** :
  * Desktop (>= 1280px) : Grille multi-colonnes aérée avec disposition côte à côte sur le live Twitch et le formulaire de contact.
  * Mobile & Tablette : Empilement linéaire fluide, burger menu simplifié, navigation tactile ergonomique.

---

### 6. Roadmap & Prochaines Étapes Conseillées

1. **Phase 1 (Actuelle)** : Validation du design de la Landing Page d'accueil épurée.
2. **Phase 2** : Déclinaison de la page dédiée **« Notre Équipe / Roster »** avec fiches joueurs détaillées et palmarès.
3. **Phase 3** : Page **« Galerie & Médias »** intégrant les temps forts des compétitions et clips Twitch.
4. **Phase 4** : Module d'intégration de l'API Twitch en temps réel pour détecter le statut ON/OFF du live du vendredi 22h.