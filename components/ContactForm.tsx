'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { creneaux, effectifs, motifsSeance, type TypeDemande } from '@/content/formulaires';
import { Checkbox, Field } from './Fields';
import { Button } from './ui/Button';

type Etat = { etape: 'saisie' | 'envoi' | 'fait' | 'erreur'; message?: string };

const TELEPHONE = '01 84 74 34 20';
const EMAIL = 'contact@hygiesportsante.fr';

type Props = {
  type: TypeDemande;
  submitLabel?: string;
  /** Motif présélectionné (demande de séance) */
  motif?: string;
  /** Lit ?objet= dans l'adresse pour présélectionner le motif */
  motifDepuisUrl?: boolean;
  compact?: boolean;
};

/* Formulaire unique du site : contact, demande de séance, entreprise, club, rappel.
   Envoi vers /api/contact ; en cas d'échec, le téléphone et l'e-mail restent proposés. */
export function ContactForm({ type, submitLabel = 'Envoyer', motif, motifDepuisUrl, compact }: Props) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const [etat, setEtat] = useState<Etat>({ etape: 'saisie' });
  const [motifChoisi, setMotifChoisi] = useState(motif ?? 'essai');
  const debut = useRef<number>(0);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    debut.current = Date.now();
    if (!motifDepuisUrl) return;
    const objet = new URLSearchParams(window.location.search).get('objet');
    if (objet && motifsSeance.some((m) => m.value === objet)) setMotifChoisi(objet);
  }, [motifDepuisUrl]);

  const id = (name: string) => `f-${uid}-${name}`;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setEtat({ etape: 'envoi' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, type, duree: Date.now() - debut.current, page: window.location.pathname }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (res.ok && json.ok) {
        setEtat({ etape: 'fait' });
        form.reset();
      } else {
        setEtat({
          etape: 'erreur',
          message:
            json.error === 'invalid'
              ? 'Certains champs sont incomplets. Vérifiez votre saisie et réessayez.'
              : `L’envoi n’a pas abouti. Appelez-nous au ${TELEPHONE} ou écrivez à ${EMAIL}.`,
        });
      }
    } catch {
      setEtat({ etape: 'erreur', message: `L’envoi n’a pas abouti. Appelez-nous au ${TELEPHONE} ou écrivez à ${EMAIL}.` });
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  if (etat.etape === 'fait') {
    return (
      <div className="hk-form__done" role="status" tabIndex={-1} ref={statusRef}>
        <p className="titre-liste">Merci, votre demande est bien partie.</p>
        <p className="courant">
          {type === 'rappel' || type === 'rendez-vous'
            ? 'Nous vous rappelons rapidement pour convenir d’un créneau.'
            : 'Nous vous répondons rapidement.'}{' '}
          Pour une réponse immédiate : <a href="tel:+33184743420">{TELEPHONE}</a>.
        </p>
      </div>
    );
  }

  const consentement = (
    <Checkbox
      id={id('consentement')}
      name="consentement"
      required
      label={
        <>
          J’accepte que ces informations servent à traiter ma demande (<Link href="/confidentialite">confidentialité</Link>)
        </>
      }
    />
  );

  const hp = (
    <div className="hk-hp" aria-hidden="true">
      <label htmlFor={id('site')}>Ne pas remplir</label>
      <input id={id('site')} name="site" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );

  return (
    <form className={compact ? 'hk-form hk-form--compact' : 'hk-form'} onSubmit={onSubmit} noValidate={false}>
      {hp}

      {type === 'rappel' ? (
        <>
          <Field id={id('email')} name="email" type="email" label="E-mail professionnel" required autoComplete="email" variant="line" />
          <Field id={id('telephone')} name="telephone" type="tel" label="Téléphone" required autoComplete="tel" variant="line" />
        </>
      ) : (
        <>
          <Field id={id('nom')} name="nom" label="Nom et prénom" required autoComplete="name" />
          {type === 'entreprise' ? <Field id={id('structure')} name="structure" label="Entreprise" required autoComplete="organization" /> : null}
          {type === 'club' ? <Field id={id('structure')} name="structure" label="Club" required autoComplete="organization" /> : null}
          <Field id={id('email')} name="email" type="email" label={type === 'entreprise' ? 'E-mail professionnel' : 'E-mail'} required autoComplete="email" />
          <Field
            id={id('telephone')}
            name="telephone"
            type="tel"
            label="Téléphone"
            required={type === 'rendez-vous'}
            autoComplete="tel"
          />
          {type === 'rendez-vous' ? (
            <>
              <div className="hk-field">
                <label className="hk-field__label" htmlFor={id('motif')}>
                  Votre demande *
                </label>
                <select id={id('motif')} name="motif" className="hk-field__input" required value={motifChoisi} onChange={(e) => setMotifChoisi(e.target.value)}>
                  {motifsSeance.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>
              <Field id={id('creneau')} name="creneau" label="Créneau souhaité" options={creneaux} defaultValue="indifferent" />
            </>
          ) : null}
          {type === 'entreprise' ? <Field id={id('effectif')} name="effectif" label="Nombre de collaborateurs" options={effectifs} defaultValue="inconnu" /> : null}
          <Field
            id={id('message')}
            name="message"
            label={type === 'club' ? 'Votre projet (sport, effectif, période)' : 'Message'}
            multiline
            required={type === 'contact'}
          />
        </>
      )}

      {consentement}

      <div ref={statusRef} tabIndex={-1} aria-live="polite">
        {etat.etape === 'erreur' ? (
          <p className="hk-form__status" data-state="error">
            {etat.message}
          </p>
        ) : null}
      </div>

      <div className="hk-form__submit">
        <Button type="submit" variant="solid" form disabled={etat.etape === 'envoi'}>
          {etat.etape === 'envoi' ? 'Envoi…' : submitLabel}
        </Button>
      </div>
      {type !== 'rappel' ? <p className="hk-form__note">* Champs obligatoires</p> : null}
    </form>
  );
}
