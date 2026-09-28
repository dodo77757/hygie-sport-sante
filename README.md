# Hygie Sport Santé et Performance · site Next.js

Nouveau site d'Hygie (Avon, 77), construit avec le design system **Hygie Kinétique** : fond os, cadre de filets en quatre colonnes, titres Anton, texte Hanken Grotesk, boutons JetBrains Mono, bandeau défilant. Les couleurs viennent du logo : jaune pour l'action principale et les temps forts, bleu, gris.

Next.js 16 (App Router), React 19, TypeScript. Aucune dépendance en plus de Next et React. 52 pages générées en statique, plus une route serveur pour les formulaires.

## Démarrer

```bash
npm install
cp .env.example .env.local   # facultatif en local
npm run dev                  # http://localhost:3000
npm run build && npm start   # version de production
npm run controle             # après un build : titres, descriptions, notes de travail, liens internes
```

Node 20.9 ou plus récent.

## Variables d'environnement

Copiez `.env.example` en `.env.local` (jamais commité) ; sur Vercel, déclarez les mêmes noms dans *Settings → Environment Variables*. Aucune clé ne va dans le code.

| Variable | Rôle |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Adresse publique, utilisée pour le sitemap, les liens canoniques et Open Graph. Par défaut `https://www.hygiesportsante.fr`. |
| `RESEND_API_KEY` | Clé [Resend](https://resend.com) pour recevoir les formulaires par e-mail. |
| `CONTACT_FROM` | Expéditeur, sur un domaine vérifié dans Resend, par exemple `Site Hygie <site@hygiesportsante.fr>`. |
| `CONTACT_TO` | Destinataire des demandes. Par défaut `contact@hygiesportsante.fr`. |
| `GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID` | Avis Google sur l'accueil (voir plus bas). Sans ces deux valeurs, le bloc ne s'affiche pas. |
| `NEXT_PUBLIC_UMAMI_SRC`, `NEXT_PUBLIC_UMAMI_ID` ou `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Mesure d'audience sans cookies. Sans variable, aucun script n'est chargé. |
| `GOOGLE_SITE_VERIFICATION` | Contenu de la balise de vérification de la Search Console, si vous choisissez cette méthode. |

**Formulaires (à faire avant la mise en ligne).** Sans clé Resend, les formulaires répondent « envoi impossible » en production et affichent le téléphone et l'e-mail ; en développement, la demande s'affiche dans le terminal.
1. Créez un compte sur [resend.com](https://resend.com) (gratuit jusqu'à 3 000 e-mails par mois).
2. *Domains → Add domain* : `hygiesportsante.fr`, puis ajoutez chez votre registrar les enregistrements DNS indiqués (DKIM, SPF). Attendez le statut *Verified*.
3. *API Keys → Create* : une clé « Sending access », limitée à ce domaine. Copiez-la dans `RESEND_API_KEY`.
4. `CONTACT_FROM` doit être une adresse de ce domaine ; `CONTACT_TO` l'adresse qui reçoit les demandes.
5. Testez chaque formulaire sur le site en ligne (contact, rendez-vous, entreprises, clubs, rappel). Le message contient l'e-mail du demandeur en *reply-to* : on lui répond directement depuis sa boîte.

**Avis Google.** Les avis sont lus par le serveur via l'API Places (New), mis en cache un jour, et affichés tels quels avec le nom de leur auteur et le lien vers la fiche. Aucun script Google chez le visiteur.
1. Dans [Google Cloud Console](https://console.cloud.google.com), créez un projet, activez *Places API (New)* et créez une clé d'API restreinte à cette API (restriction d'application : aucune, la clé reste côté serveur).
2. `GOOGLE_PLACES_API_KEY=<la clé>` dans `.env.local`, puis `npm run place-id` : le script affiche l'identifiant de la fiche du centre. Copiez-le dans `GOOGLE_PLACE_ID`.
3. Google renvoie au plus cinq avis, choisis par lui (« les plus pertinents »). Le bloc en affiche quatre, sans modification, avec la note moyenne et le nombre total d'avis.

Conditions Google : les avis ne doivent pas être modifiés ni stockés plus de trente jours (le cache dure un jour), et la page doit mentionner Google comme source, ce que fait le bloc.

**Mesure d'audience.** [Umami](https://umami.is) (gratuit auto-hébergé, ou Umami Cloud) et [Plausible](https://plausible.io) ne déposent aucun cookie et ne suivent pas les visiteurs d'un site à l'autre : ils sont exemptés de bandeau de consentement par la CNIL, à condition de ne pas activer d'autres fonctions de suivi. Renseignez soit les deux variables Umami (adresse du script et identifiant du site), soit le domaine Plausible. La page Confidentialité adapte son texte.

## Mise en ligne

Le plus simple est **Vercel** :
1. Poussez le projet sur GitHub.
2. Importez-le dans Vercel, qui reconnaît Next.js sans réglage.
3. Renseignez les variables ci-dessus.
4. Branchez le domaine `hygiesportsante.fr`.

**Netlify** fonctionne aussi, sans configuration particulière.

Les anciennes adresses du site Wix redirigent en 308 vers les nouvelles pages (`content/redirections.ts`, lu par `next.config.ts`). Cela vaut aussi pour les adresses accentuées, les articles et `/cryothérapie`, qui mène à Récupération.

## Après la mise en ligne

1. **Search Console** : ajoutez la propriété `hygiesportsante.fr` (vérification par DNS, ou par balise avec `GOOGLE_SITE_VERIFICATION`), puis *Sitemaps → ajouter* `https://www.hygiesportsante.fr/sitemap.xml`. Demandez l'indexation de l'accueil.
2. **Redirections** : `npm run redirections -- https://www.hygiesportsante.fr` teste chaque ancienne adresse Wix et signale les écarts. À relancer si vous retrouvez d'anciennes adresses dans la Search Console (*Pages → Non trouvée (404)*).
3. **Fiche Google Business** : remplacez l'adresse du site par la nouvelle, vérifiez le téléphone, les horaires et la catégorie, et ajoutez les liens de rendez-vous (`https://www.hygiesportsante.fr/rendez-vous`). C'est aussi la fiche dont le site affiche les avis.
4. **Réseaux sociaux** : mettez à jour le lien du site dans les profils Facebook, LinkedIn et Instagram (`content/site.ts`, `reseaux`, pour les adresses affichées dans le pied de page).
5. **Wix** : gardez l'abonnement du domaine le temps du transfert, puis résiliez le site une fois les redirections vérifiées. Le DNS du domaine doit pointer vers Vercel (`A 76.76.21.21` et `CNAME cname.vercel-dns.com` pour `www`, valeurs rappelées dans Vercel).
6. **Formulaires** : testez-les en ligne (étape Resend ci-dessus) et vérifiez que les avis Google s'affichent.

## Pages

| Adresse | Gabarit du design system | Contenu |
| --- | --- | --- |
| `/` | Accueil | hero en texte seul sur tout le premier écran (H1 en très grand, calé sur la largeur), planche d'anatomie des bilans (la sportive au départ, son squelette dessiné sur la photo, les muscles de quatre zones au survol ou au toucher, légende numérotée), trois pôles, Johan Pereira (portrait en colonne 4), panneau sombre « Ils nous font confiance » (quatre preuves, avis Google, partenaires), panneau jaune entreprises, articles récents |
| `/methodologie` | À propos | les trois piliers, le bilan de départ en cinq mesures, deux parcours, objectifs, pourquoi Hygie, Johan Pereira (parcours et formation), les sportifs qu'il suit, l'équipe sport, séance offerte (panneau bleu) |
| `/soins`, `/sante`, `/sport`, `/recuperation` | Journal | titre, une phrase, un soin par carte sur trois colonnes (`/soins` : une grille par pôle ; `/sport` : la carte Clubs sportifs et la préparation par discipline), puis une rangée « Et ensuite » avec la prise de rendez-vous |
| `/sante/…`, `/sport/…`, `/recuperation/…`, `/bilans/…` | Article | 15 fiches, dont Réathlétisation (`/sport/reathletisation`) et Bilan aérobie PNOE (`/bilans/aerobie`) : l'essentiel et l'action en tête, pour qui, déroulé, tarifs, cartes des praticiens, questions fréquentes, soins proches |
| `/bilans` | À propos | quel bilan choisir (situation et bilan conseillé), les fiches, ce que vous recevez, tarifs (huit bilans) et réservation, bilan d'entrée, clubs |
| `/entreprises`, `/clubs` | Contact | formulaire de devis ; entreprises : trois façons de travailler, activités, forfaits, bilan salarié, campagnes de prévention des TMS, questions fréquentes ; clubs : bilans de saison, stages, préparation physique, jeunes |
| `/rendez-vous` | Contact et onglets | praticiens (Doctolib ou agenda en ligne), bilans (agenda en ligne), sport et récupération (appel et formulaire), entreprises et clubs |
| `/journal`, `/journal/categorie/…`, `/journal/…` | Journal et Article | 10 articles réécrits |
| `/contact` | Contact | coordonnées, itinéraire, formulaire, plan d'accès OpenStreetMap |
| `/mentions-legales`, `/confidentialite` | Mentions | colonne sans cadre |

**Mise en page.** Chaque section suit le même ordre (`components/ui/Section.tsx`) : le titre dans la première colonne, puis le texte, les boutons, les cartes ou la photo empilés dans les trois colonnes de droite. Un numéro d'étape (`numero`) peut précéder le titre (les trois piliers de la méthode). Les pages de tête (accueil, pôles, journal, fiches, contact) gardent leur gabarit propre. Chaque page de pôle se termine par une rangée « Et ensuite » (rendez-vous, téléphone), et `/soins` regroupe les cartes par pôle. Les praticiens sont présentés en grille de cartes identiques, côte à côte (sur les fiches, le bloc sort de la colonne de lecture pour tenir sur une ou deux lignes), et dans un ordre tiré au hasard à chaque visite (`components/Melange.tsx`) : aucun praticien n'est toujours en tête ni toujours en bas. La barre du header est collée en haut de l'écran, pleine largeur, séparée de la page par un filet. Le pied de page est un bloc encre, séparé de la page par un trait jaune : logo en traits clairs, horaires, navigation, contact et bouton de rendez-vous.

**Navigation.** Le menu compte six entrées (Méthode, Santé, Sport, Récupération, Bilans, Entreprises) et un seul bouton, « Prendre rendez-vous », en jaune. Aucune page ne répète le menu : on revient au pôle par l'étiquette de couleur en haut de chaque fiche. Le journal, les clubs et le contact sont dans le pied de page et sur l'accueil.

**Couleurs.** Chaque pôle a la couleur d'un point du logo : Santé en bleu, Sport en jaune, Récupération en gris, Bilans en encre. Elle colore les étiquettes des cartes et le point qui termine le titre de la page.

`?motif=sante|bilans|sport|recuperation|pro` ouvre l'onglet voulu de `/rendez-vous`. `&objet=essai|coaching|sport-sante|cross-training|pressotherapie` présélectionne la demande.

## Modifier les contenus

Les textes des pages suivent le document « Hygie — Textes du site, page par page » (25 septembre 2026), repris mot pour mot. Ses notes de travail (« À valider », « Proposition : », « texte actuel conservé »…) ne vont jamais sur le site : `npm run controle` les cherche dans les pages générées, avec les titres de plus de 60 caractères, les descriptions de plus de 155, les liens internes vers une page absente et les `?motif=` sans onglet.

Tous les textes sont dans `content/` :
- `valeurs.ts` : les valeurs encore vides des textes du site (liens de réservation, prix, durées, nombre de bilans clubs), voir « À compléter » ;
- `site.ts` : coordonnées, position sur la carte, horaires, réseaux, champs des mentions légales ;
- `praticiens.ts` : praticiens et préparateurs, fonction, deux lignes de parcours, spécialités, langues, photo, lien de réservation ;
- `confiance.ts` : partenariat Maison Sport-Santé et logos des partenaires ;
- `redirections.ts` : anciennes adresses Wix ;
- `soins.ts` : pôles et fiches ;
- `bilans.ts` : tarifs des bilans et liens de réservation ;
- `journal.ts` : articles ;
- `images.ts` : photos, cadrage et textes alternatifs.

Dans les textes, `[libellé](/adresse)` crée un lien.

Après une modification, lancez `npm run typo`. Le script pose les espaces insécables (avant « : ; ? ! », dans les guillemets, les montants, les heures et les numéros de téléphone) et les apostrophes typographiques. Il ne touche qu'aux textes, jamais au code, et peut être relancé sans risque.

Règles de rédaction du design system (les textes du site priment : ils ne sont pas raccourcis pour les suivre) :
- H1 de 3 à 5 mots, H2 de 2 à 4 mots ;
- paragraphes de section de deux phrases, 30 mots au plus ;
- vouvoiement, sans point d'exclamation ni superlatif ;
- le bénéfice avant la machine.

## Structure du code

- `app/styles/tokens.css` : variables du design system et unité fluide. Une unité vaut `100vw / 1280` sur ordinateur et `min(100vw, 700px) / 390` sous 1 024 px.
- `app/styles/hygie.css` : reprise de `bundle.css` à l'échelle fluide, plus les gabarits de pages.
- `components/` : les composants du design system en TSX.
  - Mise en page et actions : `Row`/`Cell`, `Section` (titre à gauche, reste à droite), `Header` et menu mobile, `LogoLockup`, `Footer`, `Button`, `Tag`, `PointsLogo`.
  - Accueil et contenus : `Hero` (texte seul, en très grand), `Anatomie` (planche d'anatomie des bilans, composant client), `ArticleCard`, `Marquee`, `CoralPanel` (panneau jaune ou bleu), `Quote`, `PhotoImg`, `Mots`. `HeroMedia` et `GlassCard` (grande photo et carte en verre qui dérive) restent disponibles ; l'accueil ne les utilise plus.
  - Mouvement : `Entree` et `LogoTrace` (rideau d'entrée), `TransitionPage` (transitions entre les pages).
  - Formulaires : `Field`, `Checkbox`.
  - Entrées au défilement : `Reveal` et `RevealObserver`.
  - Spécifiques au site : `ContactForm`, `BookingTabs` (prise de rendez-vous), `Blocks` (fiches et articles), `CartesPraticiens`, `AvisGoogle`, `PlanAcces` (OpenStreetMap), `BarreMobile` (bouton fixé en bas sur mobile), `Audience` (Umami ou Plausible), `IconesReseaux`, `templates/` (gabarits).
- `app/api/contact/route.ts` : validation, piège à robots (champ caché et délai minimal) et envoi par Resend.
- Référencement :
  - métadonnées et page canonique sur chaque page ;
  - `sitemap.xml` et `robots.txt` ;
  - image de partage (Open Graph) : la photo d'accueil recadrée en 1 200 × 630, ou celle de la fiche ou de l'article ;
  - données structurées : centre (HealthClub, avec ses coordonnées), fil d'Ariane et questions fréquentes (FAQPage) des fiches, articles.

**Mouvement**
- **Rideau d'entrée** (`components/Entree.tsx`, `components/LogoTrace.tsx`) : à l'arrivée sur le site, le logo se trace trait par trait sur fond encre (2,1 s), les trois points et les pastilles apparaissent, le logo respire un instant, puis le rideau se lève (encre, puis jaune, à 3,4 s) et le titre de la page monte mot par mot. 4,5 s en tout, à chaque chargement du site (rechargement compris), jamais en passant d'une page à l'autre. Le logo tracé est redessiné en traits d'après le fichier d'origine.
- **Transitions entre les pages** (`components/TransitionPage.tsx`, composant `ViewTransition` de React, `content/pages.ts`) : un rideau à la couleur de la page d'arrivée (Santé bleu, Sport jaune, Récupération gris, Bilans encre…) balaie l'écran de bas en haut, s'arrête un instant avec le nom de l'onglet dans la typographie des titres de page (Anton italique, point de couleur), puis découvre la nouvelle page, dont le titre entre mot par mot ; la page quittée a reculé et s'est effacée sous lui, la barre du header reste en place au-dessus. 1,3 s. Chrome, Edge, Safari 18 et Firefox récents ; ailleurs, la page change sans animation.
  Le nom tient toujours dans l'écran, du téléphone au grand écran : `TransitionPage` mesure la largeur de son mot le plus long (point compris, en em) et `.rideau-page__nom` en déduit la taille, plafonnée à celle des grands titres et à 40 % de la hauteur visible (téléphone à l'horizontale) ; un nom de plusieurs mots (« Mentions légales ») passe sur deux lignes entre les mots. Il est centré dans la partie visible, sous la barre du header (`--hauteur-header`), avec une petite compensation de l'oblique. Sur téléphone, la barre du bas (rendez-vous, appel) reste en place sous le rideau. `.page` ne laisse rien dépasser en largeur : sur téléphone, un débordement pendant une animation (panneaux de rendez-vous) élargissait la fenêtre et annulait la transition vers `/rendez-vous`.
- **Onglets** : un trait jaune glisse sous l'onglet actif, dans le menu comme dans la prise de rendez-vous ; les panneaux de rendez-vous glissent dans le sens du changement, rangée après rangée, avec un léger flou.
- **Titres** : chaque H1 monte mot par mot (`components/ui/Mots.tsx`).
- **Planche d'anatomie** (accueil) : quand elle arrive à l'écran, le squelette apparaît de gauche à droite, comme sous un scanner, derrière un trait corail (1,8 s) ; les muscles d'une zone s'allument au survol, au toucher ou au clavier.
- Entrées « flottement » et « glissement » au défilement, bandeau à 90 px par seconde (pause au survol) ; dérive de la carte en verre (`GlassCard`, disponible).

Tout est coupé si le visiteur a choisi de réduire les animations. Sans JavaScript, le rideau se lève quand même.

## À compléter avant la mise en ligne

**Valeurs à renseigner** (`content/valeurs.ts`). Elles sont vides dans les textes du site : rien n'est inventé. Un prix se saisit avec son symbole (`'60 €'`) ; la phrase ou la cellule apparaît dès que la valeur est renseignée.

| Valeur | Ce que le site affiche en attendant |
| --- | --- |
| Lien de réservation de la séance d'essai | Les boutons d'essai (accueil, méthode, sport, coaching, cross training, préparateurs) mènent au formulaire de rappel, `/rendez-vous?motif=sport&objet=essai`, qui reste l'action principale de l'onglet Séances de sport. |
| Liens de réservation des bilans (isocinétique, forces musculaires, fonctionnel, sauts, force-vitesse, aérobie, bilan d'entrée) | Chaque bilan garde son lien actuel (agenda de Johan Pereira). Le bilan aérobie, sans lien, propose d'appeler l'accueil. Le bilan d'entrée mène à la demande de coaching, `/rendez-vous?motif=sport&objet=coaching`. |
| Prix de la consultation d'étiopathie | La phrase « Consultation : … » n'apparaît pas. |
| Prix du sport-santé | La phrase du tarif n'apparaît pas ; reste « Contactez-nous pour les prochains créneaux. » |
| Prix des cartes de 5 et 10 séances de pressothérapie | « Sur demande » dans le tableau. |
| Durée et prix des quatre massages | Tableau sans durée, prix « Sur demande ». |
| Prix du conseil en nutrition (premier rendez-vous, suivi) | La phrase du tarif n'apparaît pas. |
| Prix et durée du bilan aérobie PNOE | « Sur demande » dans le tableau et sur la carte, sans durée ; la phrase du tarif de la fiche n'apparaît pas. |
| Durées du bilan des sauts, du profil force-vitesse et du bilan d'entrée | Pas de durée dans le tableau. |
| Nombre de bilans compris dans les 290 € (clubs) | « À partir de 290 € par sportif pour la saison », sans « soit … bilans ». |

**Mentions légales** (`content/site.ts`, champ `mentions`) : capital, SIRET, numéro RCS (Melun), numéro de TVA et médiateur de la consommation (nom, adresse, site). Tant qu'ils sont vides, la page affiche « [à compléter] », comme les textes du site. La date de la politique de confidentialité (`confidentialiteMiseAJour`) est à mettre au jour de la publication.

**À trancher dans les textes du site** (textes repris tels quels, sans modification)
- **Clubs sportifs** : la carte de la page Sport dit « Sur devis », la page Clubs « à partir de 290 € par sportif ».
- **Formule Performance** : elle promet un « accès prioritaire aux praticiens du centre », alors que les kinésithérapeutes sont indépendants.
- **« Un même dossier »** (accueil) et **« partagent l'information »** (méthode) : partager des informations de santé avec les préparateurs physiques demande le consentement du patient.
- **Maison Sport-Santé et sport sur ordonnance** : le partenariat avec la Maison Sport-Santé de Fontainebleau et l'accueil dans le cadre du sport sur ordonnance sont à confirmer.

**Contradictions relevées, laissées en place** (textes conservés ou absents des textes du site)
- **Kinésithérapie**, question « Les séances sont-elles remboursées ? » (texte conservé) : « Les kinésithérapeutes du centre pratiquent des dépassements d'honoraires », alors que le bloc Honoraires et la page de rendez-vous disent « certains ».
- **Pressothérapie**, questions fréquentes (texte conservé) : « l'accord de votre médecin est demandé », alors que « Avant votre séance » dit « peut être demandé ».
- **Journal**, article « Le sport en entreprise » : « des bilans réalisés par nos kinésithérapeutes », alors que le bilan salarié passe par « nous ».
- **Cartes des bilans** : « Un diagnostic de votre mobilité… » (bilan fonctionnel ; la fiche dit « Un état des lieux ») ; « les équipements VALD » (forces musculaires ; la fiche cite VALD et KINVENT).
- **Pied de page** : « encadré par des professionnels de la santé et du sport », alors que la règle des textes du site préfère « praticiens » quand l'étiopathe est inclus.
- **Orthoptie** : page inchangée, mais sa description dépassait les 155 caractères ; « au centre Hygie d'Avon » y devient « à Avon ».

**Choix faits sur des informations contradictoires. À confirmer.**
- **Forfait à 250 € par mois** : « Avancé » sur le site, comme dans les textes du site, « Passionné » à la caisse. Aligner le site et la facturation.
- **Bilan d'entrée** : offert pour un engagement de trois mois, alors que l'abonnement est mensuel, à tacite reconduction.
- **Aubin Salmon**, étiopathe : masqué (`masque: true` dans `content/praticiens.ts`), les textes du site ne présentant qu'un étiopathe, Johan Pereira. Ses données restent ; retirer `masque` le fait réapparaître partout (cartes, rendez-vous, nombre de praticiens).
- **Conseil en nutrition** : il est attribué à Malika Pereira sur sa carte. Les textes du site parlent de « la conseillère en nutrition », sans nom.
- **Carte de Malika Pereira** : sa spécialité « Drainages lymphatiques » reste, alors que la page Massages dit « drainage esthétique ».
- **Sport-santé** : les questions fréquentes (texte actuel conservé) parlent d'« éducateurs » ; la qualification des encadrants est à préciser.
- **Forfaits entreprises** : « par collaborateur et par mois » selon les textes du site ; préciser HT ou TTC.

**Retiré avec les textes du site** (25 septembre 2026) : l'ancien ciblage « femmes dès 40 ans, hommes dès 35 ans » (bilan des forces musculaires) ; la question « Pourquoi proposer un bilan santé en entreprise ? » ; les phrases, sous-titres et étiquettes absents des textes du site dans les sections qu'ils réécrivent (« Objectif : » des deux parcours, sous-titre et étiquettes des preuves de l'accueil…). Les sections, boutons et liens que les textes du site n'abordent pas restent en place (section « Nos bilans », boutons de demande des fiches, liens vers le journal ou la méthode…).

**Retiré volontairement**
- **Cryothérapie** : la page, l'article, les textes, les textes alternatifs et le mode froid Game Ready. Les anciennes adresses redirigent vers Récupération.
- **Questionnaire de pressothérapie (Google Forms)**
  - Il portait sur le mode froid et collectait des données de santé sur un service tiers.
  - Le site annonce un questionnaire à remplir avant la première séance ; il reste à le refaire (compression seule) sur un outil conforme.
- **Carte cadeau, paiement en ligne des forfaits et réservation Wix.** Les séances passent par l'appel ou le formulaire, les praticiens et les bilans par leur agenda en ligne.
- **Pages cachées** : coaching à distance (WhatsApp, Hexfit), webinaire, test de forme, pages de modèle Wix.
- **Préparateur mental** : seul un nom figurait dans un texte alternatif.
- **Articles**
  - Retirés : l'article sur la cryothérapie et le billet « Nouveau sur Hygie ».
  - Supprimés des autres articles : les chiffres non sourcés (12 %, 20 %, 30 %), les témoignages anonymes et les allégations de santé (« détox », perte de poids, immunité).
- **PDF « exemple de bilan complet »** : il est hébergé chez Wix et contient peut-être des données personnelles. Le placer dans `public/` une fois anonymisé.

**Praticiens** (`content/praticiens.ts`)
- Kinésithérapeutes : bio courte et spécialités des textes du site, validées par chaque kiné. Johan Pereira : présentation des textes du site (étiopathe et préparateur physique). Martin Tondeur et Jean-Étienne Boilot : fonction et spécialités seulement, leur courte bio reste à écrire (diplômes, spécialités). Malika Pereira : présentation actuelle conservée.
- Théo Borragini a quitté le centre : retiré.
- Le bouton des praticiens dit « Prendre rendez-vous » (Doctolib ou agenda en ligne) ; « Réserver l'essai » pour la séance de sport offerte ; le numéro pour les rendez-vous par téléphone (Malika Pereira : l'accueil).
- Portraits : tous les praticiens ont leur photo (`assets/photos/equipe/`). Onze viennent du site actuel, en haute définition (Marie Couineau, Pierre Becker et Thomas Crasson n'existaient qu'en petit format : agrandis par super-résolution, à remplacer par les originaux). Alexis Ballard, Antoine Gras et Jérémy Escriva : leur photo de profil Doctolib (originaux en haute définition ; Antoine Gras agrandi). Malika Pereira : la présentation de l'équipe publiée par Hygie sur Instagram (janvier 2026), fond uniformisé et agrandie. À faire valider par chacun. Pour changer un portrait : déposer le fichier (cadrage 2/3 ou 4/5, 1 200 px de large au moins) dans `assets/photos/equipe/` et mettre à jour `content/images.ts`.
- À vérifier avec le centre, d'après la présentation de l'équipe publiée par Hygie en janvier 2026 : Kévin Vautier (kinésithérapeute) et Charlotte Jeleff (préparatrice physique) n'apparaissent pas encore sur le site ; Aubin Salmon n'apparaît pas dans cette présentation ; Jean-Étienne Boilot y est écrit « Etienne Boillot » et présenté aussi comme préparateur mental.

**Sportifs suivis par Johan Pereira** (`content/athletes.ts`)
- La liste vient de la page Étiopathe du site actuel (orthographes vérifiées : Carolle Zahi, Cheick Doucouré, Marie-Divine Kouamé). Les mentions sont limitées à ce qui est vérifiable.
- Photos des publications Instagram d'Hygie : Mekdes Woldu (au centre, avril 2026), Bobo Sacko (ceinture WBC, story « Bobo Sacko » du centre), Oualy Tandia (image de la vidéo publiée avec Hygie, « By @discipline.management & @footkorner »), Trey Vimalin (image de la vidéo « Début de la prise en charge de @letvims », avril 2024), Leila Hadji (séance photo au centre, photographe @paollla.pix, publication commune d'avril 2024). Le centre les a déjà publiées ; confirmer l'accord des sportifs et, pour Oualy Tandia et Bobo Sacko, celui des auteurs des images.
- Photos de Wikimedia Commons, sous licence libre (CC0 ou CC BY-SA 4.0) : Cheick Doucouré, Marie-Divine Kouamé, Carolle Zahi, créditées sous la galerie et dans les mentions légales. Ces licences couvrent le droit d'auteur des photographes, pas le droit à l'image des sportifs. Hygie a aussi publié des vidéos de Carolle Zahi et de Marie-Divine Kouamé au centre : une image de ces vidéos, ou une photo du centre, peut les remplacer.
- Sans photo pour l'instant : Diana Iscaye (aucune photo libre ni publication d'Hygie la concernant). Les photos de presse (Alamy, Maxppp), de la fédération ou de la Police nationale sont protégées et ne sont pas utilisées. Elle figure dans la liste « Également suivis », sous la galerie ; une photo renseignée la fait passer dans la galerie.
- Noms corrigés d'après la FFA et Wikipédia : Diana Iscaye (et non « Iscaye Diana »), Leila Hadji.

**Questions fréquentes des fiches** (`content/soins.ts`, blocs `faq`) : celles des textes du site sont reprises telles quelles. Les autres sont les textes actuels, conservés (kinésithérapie, orthoptie, sport-santé, cross training, pressothérapie, bilans) : à valider par les praticiens, en particulier les durées de séance et les contre-indications.

**Partenaires** (`content/confiance.ts`) : la liste est vide. Ajouter les logos fournis par les clubs et entreprises partenaires dans `public/partenaires/`, avec leur accord. Aucun logo n'a été inventé.

**Réseaux sociaux** : les adresses des profils dans `content/site.ts` sont à vérifier. Les icônes viennent de Font Awesome Free (crédit dans les mentions légales).

**Police** : Hanken Grotesk remplace Alliance No.2. Pour l'original, achetez la licence web et ajoutez le fichier dans `app/fonts.ts`.

## Photos

Les photos de sport et de soins viennent d'[Unsplash](https://unsplash.com/license) : usage commercial gratuit, sans autorisation à demander. Leurs auteurs sont crédités automatiquement dans les mentions légales. Les portraits de l'équipe sont les photos d'Hygie (`assets/photos/johan-pereira.jpg`, `assets/photos/equipe/`), optimisées par `next/image` (formats modernes, tailles adaptées, flou de chargement). Les photos des sportifs suivis sont dans `assets/photos/athletes/` (voir plus haut).

Elles sont servies par le CDN d'Unsplash à la largeur utile, de 480 à 3 840 px selon l'écran, en AVIF ou WebP ; les originaux font de 3 000 à 7 900 px (`components/Photo.tsx`). La grande photo d'accueil et les photos de tête de page sont en qualité 85 et chargées en priorité. Pendant le chargement, chaque photo affiche sa couleur dominante.

Une photo supprimée d'Unsplash par son auteur disparaîtrait du site. Pour ne plus en dépendre, téléchargez les originaux dans `assets/photos/` et importez-les dans `content/images.ts`, comme le portrait de Johan.

Pour changer une photo, modifiez son entrée dans `content/images.ts` : identifiant Unsplash, dimensions, texte alternatif, couleur, auteur et cadrage (`position`, par exemple `'62% 45%'`). Les fiches et les articles désignent leur photo par sa clé (`photo: 'kine'`).

Une séance photo au centre reste la meilleure option à terme : l'équipe, les machines de bilan et les salles réelles.

### Planche d'anatomie de l'accueil

Le squelette et les muscles dessinés sur la photo de la sportive (`photos.depart`) viennent des planches du Dr Paul Richer, *Anatomie artistique* (1890), dans le domaine public ([Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:Anatomie_artistique_(Paul_Richer))) : squelette et muscles de la tête et du tronc, du membre supérieur et du membre inférieur, vus de profil. Chaque os a été recalé sur la pose de la sportive (hanche, genou, cheville, épaule, coude, poignet, colonne, crâne), puis découpé à sa silhouette. Ce ne sont pas des images générées.

Les calques sont dans `assets/anatomie/` (2 400 × 1 600, transparents, même cadrage que la photo) : `squelette.png` (traits blancs), et `muscles-epaule.png`, `muscles-hanche.png`, `muscles-genou.png`, `muscles-mollet.png` (traits corail). Ils sont calés au pixel sur cette photo et ce cadrage (3/2, centré ; carré centré sur mobile) : si la photo change, il faut les refaire. Les zones sensibles et les repères numérotés sont dans `components/Anatomie.tsx` (coordonnées d'un cadre de 1 500 × 1 000), le crédit dans les mentions légales.
