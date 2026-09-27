/* Coordonnées et informations générales du centre.
   Les champs des mentions à null sont affichés « [à compléter] » dans les mentions légales. */

export const site = {
  nom: 'Hygie Sport Santé et Performance',
  nomCourt: 'Hygie',
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.hygiesportsante.fr').replace(/\/$/, ''),
  accroche: 'Santé, sport et récupération au même endroit, à Avon.',
  description:
    'Centre de santé, de sport et de récupération à Avon : kinésithérapie, étiopathie, orthoptie, coaching, bilans physiologiques, pressothérapie et massages.',
  adresse: {
    rue: '9, rue de la Petite Vitesse',
    codePostal: '77210',
    ville: 'Avon',
    pays: 'FR',
  },
  itineraire: 'https://www.google.com/maps/search/?api=1&query=9+rue+de+la+Petite+Vitesse+77210+Avon',
  /* Coordonnées du centre (WGS 84), pour le plan d'accès et les données structurées */
  coordonnees: { lat: 48.416892, lon: 2.727875 },
  plans: {
    google: 'https://www.google.com/maps/search/?api=1&query=9+rue+de+la+Petite+Vitesse+77210+Avon',
    apple: 'https://maps.apple.com/?daddr=9+rue+de+la+Petite+Vitesse,+77210+Avon,+France',
    openstreetmap: 'https://www.openstreetmap.org/?mlat=48.416892&mlon=2.727875#map=17/48.416892/2.727875',
  },
  /* Accès en train : gare voisine et ligne */
  acces: 'À deux pas de la gare de Fontainebleau-Avon (ligne R du Transilien, une quarantaine de minutes depuis Paris-Gare de Lyon). Parking à proximité.',
  telephone: { affichage: '01 84 74 34 20', lien: 'tel:+33184743420', international: '+33 1 84 74 34 20' },
  email: 'contact@hygiesportsante.fr',
  horaires: [
    {
      jours: 'Du lundi au vendredi',
      heures: '8 h – 20 h',
      court: 'Lun.–ven. 8 h – 20 h',
      schema: { jours: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], ouvre: '08:00', ferme: '20:00' },
    },
    { jours: 'Le samedi', heures: '9 h – 13 h', court: 'Sam. 9 h – 13 h', schema: { jours: ['Saturday'], ouvre: '09:00', ferme: '13:00' } },
  ],
  /** Les horaires en une phrase (rendez-vous, contact) */
  horairesPhrase: 'du lundi au vendredi de 8 h à 20 h, le samedi de 9 h à 13 h',
  reseaux: [
    { nom: 'Facebook', court: 'Fb', url: 'https://www.facebook.com/hygiesportsanteetperformance' },
    { nom: 'LinkedIn', court: 'In', url: 'https://www.linkedin.com/company/hygie-sport-sant%C3%A9-et-performance/' },
    { nom: 'Instagram', court: 'Ig', url: 'https://www.instagram.com/hygiesportsanteperformance/' },
  ],
  anneeCreation: 2022,
  mentions: {
    raisonSociale: 'LJ Concept',
    formeJuridique: 'SAS',
    /** Capital social, sans le symbole € (affiché après) */
    capital: null as string | null,
    siret: null as string | null,
    /** Numéro au RCS de Melun */
    rcs: null as string | null,
    /** Numéro de TVA intracommunautaire, sans le préfixe FR (affiché avant) */
    tva: null as string | null,
    directeurPublication: 'Johan Pereira, président.',
    /* Adresse vérifiée sur vercel.com/legal (septembre 2026) */
    hebergeur: 'Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis — vercel.com.',
    /** Médiateur de la consommation : nom, adresse et site */
    mediateur: null as string | null,
  },
  /** Date de la dernière mise à jour de la politique de confidentialité */
  confidentialiteMiseAJour: '27 septembre 2026',
} as const;
