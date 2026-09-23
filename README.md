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

| Variable | Rôle |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Adresse publique, utilisée pour le sitemap, les liens canoniques et Open Graph. Par défaut `https://www.hygiesportsante.fr`. |
| `RESEND_API_KEY` | Clé [Resend](https://resend.com) pour recevoir les formulaires par e-mail. |
| `CONTACT_FROM` | Expéditeur, sur un domaine vérifié dans Resend, par exemple `Site Hygie <site@hygiesportsante.fr>`. |
| `CONTACT_TO` | Destinataire des demandes. Par défaut `contact@hygiesportsante.fr`. |

Sans clé Resend, les formulaires répondent « envoi impossible » en production et affichent le téléphone et l'e-mail. En développement, la demande s'affiche dans le terminal.

## Mise en ligne

Le plus simple est **Vercel** :
1. Poussez le projet sur GitHub.
2. Importez-le dans Vercel, qui reconnaît Next.js sans réglage.
3. Renseignez les variables ci-dessus.
4. Branchez le domaine `hygiesportsante.fr`.

**Netlify** fonctionne aussi, sans configuration particulière.

Les anciennes adresses du site Wix redirigent en 301 vers les nouvelles pages (`next.config.ts`). Cela vaut aussi pour les adresses accentuées, les articles et `/cryothérapie`, qui mène à Récupération. Une fois le domaine basculé, déclarez le sitemap (`/sitemap.xml`) dans la Search Console.

## Pages

| Adresse | Gabarit du design system | Contenu |
| --- | --- | --- |
| `/` | Accueil | hero, grande photo et carte en verre (bilans), Johan Pereira, trois pôles, panneau jaune entreprises, articles récents |
| `/methodologie` | À propos | les trois temps de la méthode, deux parcours, Johan Pereira, l'équipe sport, séance offerte (panneau bleu) |
| `/soins`, `/sante`, `/sport`, `/recuperation` | Journal | titre, une phrase, un soin par carte |
| `/sante/…`, `/sport/…`, `/recuperation/…`, `/bilans/…` | Article | 13 fiches : l'essentiel et l'action en tête, pour qui, déroulé, tarifs, praticiens, soins proches |
| `/bilans` | À propos | les quatre bilans, tarifs et réservation, clubs |
| `/entreprises`, `/clubs` | Contact | formulaire de devis, activités, forfaits, bilan salarié, questions fréquentes |
| `/rendez-vous` | Contact et onglets | praticiens (Doctolib ou agenda en ligne), bilans (agenda en ligne), sport et récupération (appel et formulaire), entreprises et clubs |
| `/journal`, `/journal/categorie/…`, `/journal/…` | Journal et Article | 10 articles réécrits |
| `/contact` | Contact | coordonnées, itinéraire, formulaire |
| `/mentions-legales`, `/confidentialite` | Mentions | colonne sans cadre |

**Navigation.** Le menu compte six entrées (Méthode, Santé, Sport, Récupération, Bilans, Entreprises) et un seul bouton, « Prendre rendez-vous », en jaune. Aucune page ne répète le menu : on revient au pôle par l'étiquette de couleur en haut de chaque fiche. Le journal, les clubs et le contact sont dans le pied de page et sur l'accueil.

**Couleurs.** Chaque pôle a la couleur d'un point du logo : Santé en bleu, Sport en jaune, Récupération en gris, Bilans en encre. Elle colore les étiquettes des cartes et le point qui termine le titre de la page.

`?motif=sante|bilans|sport|recuperation|pro` ouvre l'onglet voulu de `/rendez-vous`. `&objet=essai|coaching|sport-sante|cross-training|pressotherapie` présélectionne la demande.

## Modifier les contenus

Tous les textes sont dans `content/` :
- `site.ts` : coordonnées, horaires, réseaux, champs des mentions légales ;
- `praticiens.ts` : praticiens et liens de réservation ;
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
  - Mise en page et actions : `Row`/`Cell`, `Header` et menu mobile, `LogoLockup`, `Footer`, `Button`, `Tag`, `PointsLogo`.
  - Accueil et contenus : `Hero`, `HeroMedia`, `GlassCard`, `ArticleCard`, `Marquee`, `CoralPanel` (panneau jaune ou bleu), `Quote`, `PhotoImg`.
  - Formulaires : `Field`, `Checkbox`.
  - Entrées au défilement : `Reveal` et `RevealObserver`.
  - Spécifiques au site : `ContactForm`, `BookingTabs` (prise de rendez-vous), `Blocks` (fiches et articles), `templates/` (gabarits).
- `app/api/contact/route.ts` : validation, piège à robots (champ caché et délai minimal) et envoi par Resend.
- Référencement :
  - métadonnées et page canonique sur chaque page ;
  - `sitemap.xml` et `robots.txt` ;
  - image de partage (Open Graph) : la photo d'accueil recadrée en 1 200 × 630, ou celle de la fiche ou de l'article ;
  - données structurées : centre (HealthClub), fil d'Ariane des fiches, articles.

Mouvement : entrées « flottement » et « glissement », dérive de la carte en verre, bandeau à 317 px par seconde. Tout est coupé si le visiteur a choisi de réduire les animations.

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

**Réseaux sociaux** : les pastilles Fb, In et Ig sont provisoires. Utiliser les icônes officielles de chaque réseau.

**Police** : Hanken Grotesk remplace Alliance No.2. Pour l'original, achetez la licence web et ajoutez le fichier dans `app/fonts.ts`.

## Photos

Les photos de sport et de soins viennent d'[Unsplash](https://unsplash.com/license) : usage commercial gratuit, sans autorisation à demander. Leurs auteurs sont crédités automatiquement dans les mentions légales. Le portrait de Johan Pereira est la photo d'Hygie (`assets/photos/johan-pereira.jpg`).

Elles sont servies par le CDN d'Unsplash à la largeur utile, de 480 à 3 840 px selon l'écran, en AVIF ou WebP ; les originaux font de 3 000 à 7 900 px (`components/Photo.tsx`). La grande photo d'accueil et les photos de tête de page sont en qualité 85 et chargées en priorité. Pendant le chargement, chaque photo affiche sa couleur dominante.

Une photo supprimée d'Unsplash par son auteur disparaîtrait du site. Pour ne plus en dépendre, téléchargez les originaux dans `assets/photos/` et importez-les dans `content/images.ts`, comme le portrait de Johan.

Pour changer une photo, modifiez son entrée dans `content/images.ts` : identifiant Unsplash, dimensions, texte alternatif, couleur, auteur et cadrage (`position`, par exemple `'62% 45%'`). Les fiches et les articles désignent leur photo par sa clé (`photo: 'kine'`).

Une séance photo au centre reste la meilleure option à terme : l'équipe, les machines de bilan et les salles réelles.
