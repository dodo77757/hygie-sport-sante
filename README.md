# Hygie Sport Santé et Performance · site Next.js

Nouveau site d'Hygie (Avon, 77), construit avec le design system **Hygie Kinétique** : fond os, cadre de filets en quatre colonnes, titres Anton, texte Hanken Grotesk, boutons JetBrains Mono, bandeau défilant. Les couleurs viennent du logo : jaune pour l'action principale et les temps forts, bleu, gris.

Next.js 16 (App Router), React 19, TypeScript. Aucune dépendance en plus de Next et React. 50 pages générées en statique, plus une route serveur pour les formulaires.

## Démarrer

```bash
npm install
cp .env.example .env.local   # facultatif en local
npm run dev                  # http://localhost:3000
npm run build && npm start   # version de production
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
| `/` | Accueil | hero, grande photo et carte en verre (bilans), Johan Pereira, trois pôles, « Ils nous font confiance » (Maison Sport-Santé, partenaires, avis Google), panneau jaune entreprises, articles récents |
| `/methodologie` | À propos | les trois temps de la méthode, deux parcours, Johan Pereira, l'équipe sport, séance offerte (panneau bleu) |
| `/soins`, `/sante`, `/sport`, `/recuperation` | Journal | titre, une phrase, un soin par carte |
| `/sante/…`, `/sport/…`, `/recuperation/…`, `/bilans/…` | Article | 13 fiches : l'essentiel et l'action en tête, pour qui, déroulé, tarifs, cartes des praticiens, questions fréquentes, soins proches |
| `/bilans` | À propos | les quatre bilans, tarifs et réservation, clubs |
| `/entreprises`, `/clubs` | Contact | formulaire de devis, activités, forfaits, bilan salarié, questions fréquentes |
| `/rendez-vous` | Contact et onglets | praticiens (Doctolib ou agenda en ligne), bilans (agenda en ligne), sport et récupération (appel et formulaire), entreprises et clubs |
| `/journal`, `/journal/categorie/…`, `/journal/…` | Journal et Article | 10 articles réécrits |
| `/contact` | Contact | coordonnées, itinéraire, formulaire, plan d'accès OpenStreetMap |
| `/mentions-legales`, `/confidentialite` | Mentions | colonne sans cadre |

**Mise en page.** Chaque section suit le même ordre (`components/ui/Section.tsx`) : le titre dans la première colonne, puis le texte, les boutons, les cartes ou la photo empilés dans les trois colonnes de droite. Les pages de tête (accueil, pôles, journal, fiches, contact) gardent leur gabarit propre. La barre du header est collée en haut de l'écran, pleine largeur, séparée de la page par un filet. Le pied de page est un bloc encre, séparé de la page par un trait jaune : logo en traits clairs, horaires, navigation, contact et bouton de rendez-vous.

**Navigation.** Le menu compte six entrées (Méthode, Santé, Sport, Récupération, Bilans, Entreprises) et un seul bouton, « Prendre rendez-vous », en jaune. Aucune page ne répète le menu : on revient au pôle par l'étiquette de couleur en haut de chaque fiche. Le journal, les clubs et le contact sont dans le pied de page et sur l'accueil.

**Couleurs.** Chaque pôle a la couleur d'un point du logo : Santé en bleu, Sport en jaune, Récupération en gris, Bilans en encre. Elle colore les étiquettes des cartes et le point qui termine le titre de la page.

`?motif=sante|bilans|sport|recuperation|pro` ouvre l'onglet voulu de `/rendez-vous`. `&objet=essai|coaching|sport-sante|cross-training|pressotherapie` présélectionne la demande.

## Modifier les contenus

Tous les textes sont dans `content/` :
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

Règles de rédaction du design system :
- H1 de 3 à 5 mots, H2 de 2 à 4 mots ;
- paragraphes de section de deux phrases, 30 mots au plus ;
- vouvoiement, sans point d'exclamation ni superlatif ;
- le bénéfice avant la machine.

## Structure du code

- `app/styles/tokens.css` : variables du design system et unité fluide. Une unité vaut `100vw / 1280` sur ordinateur et `min(100vw, 700px) / 390` sous 1 024 px.
- `app/styles/hygie.css` : reprise de `bundle.css` à l'échelle fluide, plus les gabarits de pages.
- `components/` : les composants du design system en TSX.
  - Mise en page et actions : `Row`/`Cell`, `Section` (titre à gauche, reste à droite), `Header` et menu mobile, `LogoLockup`, `Footer`, `Button`, `Tag`, `PointsLogo`.
  - Accueil et contenus : `Hero`, `HeroMedia`, `GlassCard`, `ArticleCard`, `Marquee`, `CoralPanel` (panneau jaune ou bleu), `Quote`, `PhotoImg`, `Mots`.
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
- **Onglets** : un trait jaune glisse sous l'onglet actif, dans le menu comme dans la prise de rendez-vous ; les panneaux de rendez-vous glissent dans le sens du changement, rangée après rangée, avec un léger flou.
- **Titres** : chaque H1 monte mot par mot (`components/ui/Mots.tsx`).
- Entrées « flottement » et « glissement » au défilement, dérive de la carte en verre, bandeau à 90 px par seconde (pause au survol).

Tout est coupé si le visiteur a choisi de réduire les animations. Sans JavaScript, le rideau se lève quand même.

## À compléter avant la mise en ligne

**Mentions légales** (`content/site.ts`, champ `mentions`). Tant qu'ils sont vides, ces champs s'affichent « [à compléter] » :
- forme juridique, capital, SIRET, RCS et n° de TVA ;
- directeur de la publication ;
- hébergeur ;
- médiateur de la consommation.

**Choix faits sur des informations contradictoires. À confirmer.**
- **Forfait à 250 € par mois** : il s'appelle « Avancé » sur la page tarifs et « Passionné » à la caisse. « Avancé » est retenu.
- **Bilan d'entrée** : il est offert pour un engagement de trois mois, sinon facturé 145 €. La page de paiement indiquait « jusqu'à annulation ».
- **Bilan fonctionnel** : il coûte 60 € sur les pages tarifs et 80 € sur l'ancienne réservation Wix. 60 € est retenu.
- **Johan Pereira** : il est présenté comme « fondateur », comme sur l'accueil, alors que d'autres pages disaient « co-fondateur ».
  - Sportifs cités sur la page Méthodologie : Mekdès Woldu, Carole Zahi, Cheick Doucouré. Vérifier leur accord et l'orthographe.
- **Kinésithérapeutes**
  - Gauthier Arcache est écrit comme sur Doctolib ; l'ancien site écrivait « Gautier ».
  - Alexis Ballard n'a pas de lien Doctolib : son bouton propose d'appeler le centre.
- **Aubin Salmon**, étiopathe, n'apparaissait que sur une page brouillon. Confirmer qu'il consulte au centre.
- **Conseil en nutrition** : il est attribué à Malika Pereira. L'ancienne page était écrite à la première personne, sans nom.
- **Sport-santé**
  - Le tarif n'était pas affiché : la page indique « sur demande ».
  - Trois mentions ne figuraient que dans la description Google de l'ancienne page : « éducateurs APA », « sport sur ordonnance » et « partenaire de la Maison Sport-Santé de Fontainebleau ».
- **Pressothérapie**
  - Le site décrit des bottes de compression, comme la photo. Préciser l'appareil.
  - Les prix des cartes de 5 et 10 séances sont à renseigner.
- **Forfaits entreprises** : préciser la période de facturation et le HT ou TTC.
- **Questions fréquentes entreprises** : les réponses 2 à 5 ont été rédigées, car elles étaient illisibles sur l'ancien site. À valider.
- **Orthoptie**
  - Les durées de validité des ordonnances de lentilles ont été corrigées (1 an avant 16 ans, 3 ans après). L'ancien site écrivait deux fois « plus de 16 ans ». À faire valider par Marie Couineau.

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
- Les deux lignes de parcours et les spécialités sont rédigées d'après les présentations publiques des praticiens (Doctolib). À faire relire par chacun. Alexis Ballard, Aubin Salmon, Malika Pereira, Martin Tondeur et Jean-Etienne Boilot n'ont pas de présentation publique : leur parcours est à écrire.
- Les photos manquent : en attendant, chaque carte affiche des initiales. Déposer un portrait par praticien (cadrage 4/5, 800 px de large au moins, fond neutre) dans `assets/photos/`, le déclarer dans `content/images.ts` et renseigner `photo` dans `praticiens.ts`.

**Questions fréquentes des fiches** (`content/soins.ts`, blocs `faq`) : rédigées avec prudence (remboursement, durée, quoi apporter, ordonnance). À valider par les praticiens, en particulier les durées de séance (kinésithérapie, orthoptie) et les contre-indications (pressothérapie, massages).

**Partenaires** (`content/confiance.ts`) : la liste est vide. Ajouter les logos fournis par les clubs et entreprises partenaires dans `public/partenaires/`, avec leur accord. Aucun logo n'a été inventé.

**Réseaux sociaux** : les adresses des profils dans `content/site.ts` sont à vérifier. Les icônes viennent de Font Awesome Free (crédit dans les mentions légales).

**Police** : Hanken Grotesk remplace Alliance No.2. Pour l'original, achetez la licence web et ajoutez le fichier dans `app/fonts.ts`.

## Photos

Les photos de sport et de soins viennent d'[Unsplash](https://unsplash.com/license) : usage commercial gratuit, sans autorisation à demander. Leurs auteurs sont crédités automatiquement dans les mentions légales. Le portrait de Johan Pereira est la photo d'Hygie (`assets/photos/johan-pereira.jpg`).

Elles sont servies par le CDN d'Unsplash à la largeur utile, de 480 à 3 840 px selon l'écran, en AVIF ou WebP ; les originaux font de 3 000 à 7 900 px (`components/Photo.tsx`). La grande photo d'accueil et les photos de tête de page sont en qualité 85 et chargées en priorité. Pendant le chargement, chaque photo affiche sa couleur dominante.

Une photo supprimée d'Unsplash par son auteur disparaîtrait du site. Pour ne plus en dépendre, téléchargez les originaux dans `assets/photos/` et importez-les dans `content/images.ts`, comme le portrait de Johan.

Pour changer une photo, modifiez son entrée dans `content/images.ts` : identifiant Unsplash, dimensions, texte alternatif, couleur, auteur et cadrage (`position`, par exemple `'62% 45%'`). Les fiches et les articles désignent leur photo par sa clé (`photo: 'kine'`).

Une séance photo au centre reste la meilleure option à terme : l'équipe, les machines de bilan et les salles réelles.
