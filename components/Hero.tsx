import type { ReactNode } from 'react';
import type { Photo } from '@/content/images';
import { Button } from './ui/Button';
import { PhotoImg } from './Photo';
import { PointsLogo } from './ui/Primitives';
import { Mots, nombreDeMots } from './ui/Mots';

type Lien = { label: string; href: string; variant?: 'solid' | 'contour' | 'jaune' };

/* Hero d'accueil : le texte seul, en très grand, sur tout le premier écran.
   Surtitre en haut ; le H1 sur toute la largeur (deux lignes sur ordinateur, trois sur mobile) ; sous-titre et boutons en bas.
   La taille du H1 est calculée pour que « en mouvement », la ligne la plus longue, remplisse la largeur du cadre. */
export function Hero({ surtitre, titre, intro, ctas = [] }: { surtitre?: string; titre: [string, string]; intro: string; ctas?: Lien[] }) {
  const [l1, l2] = titre;
  return (
    <section className="hk-hero" aria-labelledby="titre-accueil">
      <div className="hk-hero__haut">
        <PointsLogo />
        {surtitre ? <p className="etiquette hk-hero__surtitre">{surtitre}</p> : null}
      </div>
      <h1 id="titre-accueil" className="hk-hero__title titre-hero titre-hero--serre">
        <span className="hk-hero__ligne">
          <Mots texte={l1} />
        </span>{' '}
        <span className="hk-hero__ligne">
          <Mots texte={l2} depart={nombreDeMots(l1)} />
        </span>
      </h1>
      <div className="hk-hero__bas">
        <p className="chapo hk-hero__intro">{intro}</p>
        {ctas.length ? (
          <div className="hk-hero__cta">
            {ctas.map((c) => (
              <Button key={c.href} href={c.href} variant={c.variant}>
                {c.label}
              </Button>
            ))}
          </div>
        ) : null}
      </div>
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
      <div className="hk-hero-media__cadre">
        <PhotoImg className="hk-hero-media__img" photo={photo} preload quality={85} sizes="(max-width: 1023px) 92vw, 94vw" />
      </div>
      {card ? <GlassCard {...card} /> : null}
    </section>
  );
}
