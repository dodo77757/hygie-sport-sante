/* Valeurs partagées par les formulaires (client) et la route /api/contact (serveur). */

export const typesDemande = {
  contact: 'Message',
  'rendez-vous': 'Demande de séance',
  entreprise: 'Offre entreprise',
  club: 'Offre club',
  rappel: 'Rappel entreprise',
} as const;

export type TypeDemande = keyof typeof typesDemande;

export const motifsSeance = [
  { value: 'essai', label: 'Séance d’essai offerte' },
  { value: 'coaching', label: 'Coaching individuel' },
  { value: 'sport-sante', label: 'Sport-santé' },
  { value: 'cross-training', label: 'Cross training' },
  { value: 'pressotherapie', label: 'Pressothérapie' },
  { value: 'autre', label: 'Autre demande' },
] as const;

export const creneaux = [
  { value: 'indifferent', label: 'Peu importe' },
  { value: 'matin', label: 'Le matin' },
  { value: 'midi', label: 'Le midi' },
  { value: 'apres-midi', label: 'L’après-midi' },
  { value: 'soir', label: 'En soirée' },
  { value: 'samedi', label: 'Le samedi matin' },
] as const;

export const effectifs = [
  { value: '2-8', label: '2 à 8 collaborateurs' },
  { value: '9-16', label: '9 à 16 collaborateurs' },
  { value: '17-24', label: '17 à 24 collaborateurs' },
  { value: '25+', label: '25 collaborateurs et plus' },
  { value: 'inconnu', label: 'Je ne sais pas encore' },
] as const;

export function libelleDe(liste: readonly { value: string; label: string }[], value: string | undefined) {
  return liste.find((o) => o.value === value)?.label;
}
