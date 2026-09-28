'use client';

import Image, { type StaticImageData } from 'next/image';
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from 'react';
import type { Photo } from '@/content/images';
import { PhotoImg } from './Photo';
import squelette from '@/assets/anatomie/squelette.png';
import musclesEpaule from '@/assets/anatomie/muscles-epaule.png';
import musclesHanche from '@/assets/anatomie/muscles-hanche.png';
import musclesGenou from '@/assets/anatomie/muscles-genou.png';
import musclesMollet from '@/assets/anatomie/muscles-mollet.png';

/* Planche d'anatomie sur la photo d'accueil (photos.depart).
   Le squelette et les muscles viennent des planches du Dr Paul Richer (Anatomie artistique, 1890, domaine public),
   recalées os par os sur la pose de la sportive (calques de 2 400 × 1 600, même cadrage que la photo : 3/2, centré).
   Le squelette est toujours visible ; les muscles d'une zone s'allument au survol (souris), au toucher (mobile)
   ou au clavier (légende numérotée sous la photo). Coordonnées des repères : cadre de 1 500 × 1 000. */

type IdZone = 'epaule' | 'hanche' | 'genou' | 'mollet';
type Zone = {
  id: IdZone;
  nom: string;
  muscles: string;
  image: StaticImageData;
  /** Repère numéroté posé sur la zone */
  repere: [number, number];
  /** Zone sensible : centre x, y, demi-axes, rotation en degrés */
  ellipse: [number, number, number, number, number];
};

const ZONES: Zone[] = [
  {
    id: 'epaule',
    nom: 'Épaule et dos',
    muscles: 'Deltoïde, trapèze, grand dorsal',
    image: musclesEpaule,
    repere: [668, 428],
    ellipse: [670, 425, 150, 92, -25],
  },
  {
    id: 'hanche',
    nom: 'Hanche et fessiers',
    muscles: 'Grand et moyen fessiers, tenseur du fascia lata',
    image: musclesHanche,
    repere: [492, 522],
    ellipse: [515, 525, 115, 98, -30],
  },
  {
    id: 'genou',
    nom: 'Genou',
    muscles: 'Quadriceps, tendon rotulien, ischio-jambiers',
    image: musclesGenou,
    repere: [842, 596],
    ellipse: [808, 610, 150, 92, 5],
  },
  {
    id: 'mollet',
    nom: 'Mollet et cheville',
    muscles: 'Gastrocnémiens, soléaire, fibulaires, tendon d’Achille',
    image: musclesMollet,
    repere: [770, 792],
    ellipse: [772, 800, 78, 190, 17],
  },
];

const TAILLES = '(max-width: 1023px) 92vw, 64vw';

export function Anatomie({ photo, children, bouton }: { photo: Photo; children: ReactNode; bouton?: ReactNode }) {
  const [actif, setActif] = useState<IdZone | null>(null);
  const [balayage, setBalayage] = useState<'attente' | 'en-cours' | null>(null);
  const planche = useRef<HTMLElement>(null);
  const pointeur = useRef('');

  // Entrée : le squelette apparaît de gauche à droite, comme sous un scanner, quand la planche arrive à l'écran.
  useEffect(() => {
    const el = planche.current;
    if (!el || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.6) return;
    setBalayage('attente');
    const io = new IntersectionObserver(
      (entrees) => {
        if (entrees.some((e) => e.isIntersecting)) {
          setBalayage('en-cours');
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Souris : le survol allume la zone. Toucher : un appui allume ou éteint. Clavier : la zone suit le focus.
  const survol = (id: IdZone | null) => (e: PointerEvent) => {
    if (e.pointerType !== 'touch') setActif(id);
  };
  const appui = (e: PointerEvent) => {
    pointeur.current = e.pointerType;
  };
  const choisir = (id: IdZone) => {
    if (pointeur.current === 'touch') setActif((a) => (a === id ? null : id));
    else setActif(id);
    pointeur.current = '';
  };

  return (
    <section className="anatomie" aria-labelledby="titre-bilans">
      <div className="anatomie__texte">{children}</div>

      <figure ref={planche} className="anatomie__planche" data-zone={actif ?? undefined} data-balayage={balayage ?? undefined}>
        <div className="anatomie__cadre">
          <PhotoImg className="anatomie__calque" photo={photo} sizes={TAILLES} quality={85} style={{ objectPosition: '50% 50%' }} />
          <span className="anatomie__voile" aria-hidden="true" />
          <Image className="anatomie__calque anatomie__squelette" src={squelette} alt="" fill sizes={TAILLES} quality={85} />
          {ZONES.map((z) => (
            <Image key={z.id} className="anatomie__calque anatomie__muscles" data-z={z.id} src={z.image} alt="" fill sizes={TAILLES} quality={85} />
          ))}
          <svg className="anatomie__sensible" viewBox="0 0 1500 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
            {ZONES.map((z) => {
              const [cx, cy, rx, ry, a] = z.ellipse;
              return (
                <ellipse
                  key={z.id}
                  cx={cx}
                  cy={cy}
                  rx={rx}
                  ry={ry}
                  transform={`rotate(${a} ${cx} ${cy})`}
                  onPointerEnter={survol(z.id)}
                  onPointerLeave={survol(null)}
                  onPointerDown={appui}
                  onClick={() => choisir(z.id)}
                />
              );
            })}
          </svg>
          {ZONES.map((z, i) => (
            <span
              key={z.id}
              className="anatomie__repere"
              data-z={z.id}
              style={{ '--x': z.repere[0], '--y': z.repere[1] } as CSSProperties}
              aria-hidden="true"
              onPointerEnter={survol(z.id)}
              onPointerLeave={survol(null)}
              onPointerDown={appui}
              onClick={() => choisir(z.id)}
            >
              {i + 1}
            </span>
          ))}
        </div>
        <ol className="anatomie__liste">
          {ZONES.map((z, i) => (
            <li key={z.id}>
              <button
                type="button"
                className="anatomie__zone"
                aria-pressed={actif === z.id}
                onPointerEnter={survol(z.id)}
                onPointerLeave={survol(null)}
                onPointerDown={appui}
                onFocus={(e) => {
                  if (e.currentTarget.matches(':focus-visible')) setActif(z.id);
                }}
                onBlur={() => setActif((a) => (a === z.id ? null : a))}
                onClick={() => choisir(z.id)}
              >
                <span className="anatomie__num" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="anatomie__nom">{z.nom}</span>
                <span className="anatomie__detail">{z.muscles}</span>
              </button>
            </li>
          ))}
        </ol>
        <figcaption className="anatomie__credit">
          D’après les planches du Dr Paul Richer, <cite>Anatomie artistique</cite> (1890).
        </figcaption>
      </figure>

      {bouton ? <div className="anatomie__action">{bouton}</div> : null}
    </section>
  );
}
