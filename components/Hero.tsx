import type { ReactNode } from 'react';
import type { Photo } from '@/content/images';
import { Button } from './ui/Button';
import { PhotoImg } from './Photo';
import { PointsLogo } from './ui/Primitives';

/* Hero d'accueil : intro à gauche, H1 italique centré, bouton à droite. Pas d'entrée animée. */
export function Hero({ title, intro, cta }: { title: string; intro: string; cta?: { label: string; href: string } }) {
  return (
    <section className="hk-hero" aria-labelledby="titre-accueil">
      <div className="hk-hero__intro">
        <PointsLogo />
        <p className="courant">{intro}</p>
      </div>
      <h1 id="titre-accueil" className="hk-hero__title titre-hero titre-hero--serre">
        {title}
      </h1>
      {cta ? (
        <div className="hk-hero__cta">
          <Button href={cta.href}>{cta.label}</Button>
        </div>
      ) : (
        <div />
      )}
    </section>
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
      <PhotoImg className="hk-hero-media__img" photo={photo} preload quality={85} sizes="(max-width: 1023px) 92vw, 94vw" />
      {card ? <GlassCard {...card} /> : null}
    </section>
  );
}
