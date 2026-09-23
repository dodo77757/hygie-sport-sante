import { creneaux, effectifs, libelleDe, motifsSeance, typesDemande, type TypeDemande } from '@/content/formulaires';

/* Réception des formulaires : validation, filtre anti-robots (champ piège + délai), envoi par Resend.
   Variables : RESEND_API_KEY, CONTACT_FROM, CONTACT_TO (voir .env.example). */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function texte(v: unknown, max: number) {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

function reponse(body: Record<string, unknown>, status = 200) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
}

export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = (await request.json()) as Record<string, unknown>;
  } catch {
    return reponse({ ok: false, error: 'invalid' }, 400);
  }

  const type = texte(data.type, 20) as TypeDemande;
  if (!(type in typesDemande)) return reponse({ ok: false, error: 'invalid' }, 400);

  // Robots : champ piège rempli ou formulaire envoyé en moins de 2,5 s. Réponse positive, rien n'est envoyé.
  const duree = Number(data.duree);
  if (texte(data.site, 200) || !Number.isFinite(duree) || duree < 2500) return reponse({ ok: true });

  const champs = {
    nom: texte(data.nom, 120),
    structure: texte(data.structure, 160),
    email: texte(data.email, 160),
    telephone: texte(data.telephone, 40),
    motif: texte(data.motif, 40),
    creneau: texte(data.creneau, 40),
    effectif: texte(data.effectif, 40),
    message: texte(data.message, 3000),
    page: texte(data.page, 200),
  };

  const erreurs: string[] = [];
  if (data.consentement !== 'oui') erreurs.push('consentement');
  if (!EMAIL_RE.test(champs.email)) erreurs.push('email');
  if (type !== 'rappel' && !champs.nom) erreurs.push('nom');
  if ((type === 'entreprise' || type === 'club') && !champs.structure) erreurs.push('structure');
  if ((type === 'rendez-vous' || type === 'rappel') && champs.telephone.replace(/\D/g, '').length < 9) erreurs.push('telephone');
  if (type === 'rendez-vous' && !libelleDe(motifsSeance, champs.motif)) erreurs.push('motif');
  if (type === 'contact' && !champs.message) erreurs.push('message');
  if (erreurs.length) return reponse({ ok: false, error: 'invalid', champs: erreurs }, 400);

  const lignes = [
    `Type : ${typesDemande[type]}`,
    champs.nom && `Nom : ${champs.nom}`,
    champs.structure && `${type === 'club' ? 'Club' : 'Entreprise'} : ${champs.structure}`,
    `E-mail : ${champs.email}`,
    champs.telephone && `Téléphone : ${champs.telephone}`,
    type === 'rendez-vous' && `Demande : ${libelleDe(motifsSeance, champs.motif)}`,
    type === 'rendez-vous' && champs.creneau && `Créneau souhaité : ${libelleDe(creneaux, champs.creneau) ?? champs.creneau}`,
    type === 'entreprise' && champs.effectif && `Effectif : ${libelleDe(effectifs, champs.effectif) ?? champs.effectif}`,
    champs.message && `\nMessage :\n${champs.message}`,
    champs.page && `\nEnvoyé depuis : ${champs.page}`,
  ].filter(Boolean) as string[];

  const sujet = `[Site] ${typesDemande[type]} · ${champs.nom || champs.structure || champs.email}`;
  const cle = process.env.RESEND_API_KEY;

  if (!cle) {
    if (process.env.NODE_ENV !== 'production') {
      console.info(`[contact] Resend non configuré, message non envoyé (développement) :\n${sujet}\n${lignes.join('\n')}`);
      return reponse({ ok: true, dev: true });
    }
    console.error('[contact] RESEND_API_KEY manquante : la demande n\'a pas pu être transmise.');
    return reponse({ ok: false, error: 'not_configured' }, 503);
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${cle}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || 'Site Hygie <site@hygiesportsante.fr>',
        to: [process.env.CONTACT_TO || 'contact@hygiesportsante.fr'],
        reply_to: champs.email,
        subject: sujet,
        text: lignes.join('\n'),
      }),
    });
    if (!res.ok) {
      console.error('[contact] Resend a répondu', res.status);
      return reponse({ ok: false, error: 'send_failed' }, 502);
    }
  } catch (e) {
    console.error('[contact] Envoi impossible', e);
    return reponse({ ok: false, error: 'send_failed' }, 502);
  }

  return reponse({ ok: true });
}
