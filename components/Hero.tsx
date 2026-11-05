import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import type { Photo } from '@/content/images';
import { AfficheProfondeur } from './AfficheProfondeur';
import { Button } from './ui/Button';
import { PhotoImg } from './Photo';
import { Mots, nombreDeMots } from './ui/Mots';
import photoFond from '@/assets/hero/sprint-traineau.jpg';
import photoSujet from '@/assets/hero/sprint-traineau-detoure.webp';

/* Hero d'accueil, en affiche plein écran (la barre du haut n'arrive qu'au défilement, voir Header.tsx).
   Trois plans : la photo sombre (et, derrière, la même photo floutée qui remplit les côtés), « HYGIE » en lettres géantes,
   puis le sportif au premier plan, devant les lettres (la même photo, détourée : assets/hero/, posée au pixel près).
   Les lettres bougent à part (souris, défilement : AfficheProfondeur) et le sportif projette son ombre dessus : le relief.
   Autour, les petits textes de l'affiche : les trois pôles en haut à gauche, le H1 en bas à gauche,
   la signature du logo au centre, la séance d'essai offerte en bas à droite.
   Entrée : la photo se resserre, les lettres montent une à une derrière le sportif, puis les textes apparaissent. */
export function Hero({ titre, essai }: { titre: [string, string]; essai: string }) {
  const [l1, l2] = titre;
  return (
    <AfficheProfondeur className="une" labelledBy="titre-accueil">
      <div className="une__voile" aria-hidden="true">
        <Image src={photoFond} alt="" fill quality={60} sizes="40vw" />
      </div>
      <div className="une__plan une__plan--fond" aria-hidden="true">
        <Image src={photoFond} alt="" fill preload quality={85} sizes="(max-width: 1023px) 131vw, 116vh" />
      </div>
      <p className="une__marque" aria-hidden="true">
        {'HYGIE'.split('').map((l, i) => (
          <span key={i} className="une__lettre" style={{ '--i': i } as CSSProperties}>
            <span>{l}</span>
          </span>
        ))}
      </p>
      <div className="une__plan une__plan--sujet">
        <Image src={photoSujet} alt="Un sportif pousse un traîneau lesté, en pleine accélération" fill quality={85} sizes="(max-width: 1023px) 131vw, 116vh" />
      </div>

      <div className="une__gauche une__anime">
        <p className="une__poles">
          <span>santé</span> <span>/</span> <span>sport</span> <span>/</span> <span>récupération</span>
        </p>
        <span className="une__trait" aria-hidden="true" />
      </div>

      <h1 id="titre-accueil" className="une__titre">
        <span>
          <Mots texte={l1} />
        </span>{' '}
        <span>
          <Mots texte={l2} depart={nombreDeMots(l1)} />
        </span>
      </h1>

      <p className="une__signature une__anime">
        <span className="une__trait" aria-hidden="true" />
        Sport · Santé · Performance
      </p>

      <Link href={essai} className="une__essai une__anime">
        <span className="une__essai-heure">1h</span>
        <span className="une__essai-titre">
          Séance
          <br />
          d’essai
          <br />
          offerte
        </span>
        <span className="une__essai-detail">Une heure / vos objectifs / sans engagement</span>
      </Link>
    </AfficheProfondeur>
  );
}

/* Carte en verre posée sur la grande photo ; dérive de -130 px pendant la première moitié de sa traversée. */
export function GlassCard({ title, text, cta, drift = true }: { title: string; text?: ReactNode; cta?: { label: string; href: string }; drift?: boolean }) {
  return (
    <div className={`hk-glass${drift ? ' hk-glass--drift' : ''}`}>
      <h2 className="titre-bloc">{title}</h2>
      {text ? <p className="hk-glass__text courant">{text}</p> : null}
      {cta ? (
        <Button href={cta.href} variant="jaune">
          {cta.label}
        </Button>
      ) : null}
    </div>
  );
}

/* Grande photo d'accueil (1 200 × 657, portrait sur mobile) */
export function HeroMedia({ photo, card }: { photo: Photo; card?: { title: string; text?: ReactNode; cta?: { label: string; href: string } } }) {
  return (
    <section className="hk-hero-media" aria-label="À la une">
      <div className="hk-hero-media__cadre">
        <PhotoImg className="hk-hero-media__img" photo={photo} preload quality={85} sizes="(max-width: 1023px) 92vw, 94vw" />
      </div>
      {card ? <GlassCard {...card} /> : null}
    </section>
  );
}
