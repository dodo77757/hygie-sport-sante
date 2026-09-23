import Image from 'next/image';
import { preload as precharger } from 'react-dom';
import type { CSSProperties } from 'react';
import type { Photo } from '@/content/images';

/* Largeurs proposées au navigateur pour les photos Unsplash : il choisit selon la place occupée et la densité de l'écran. */
const LARGEURS = [480, 640, 828, 1080, 1280, 1600, 1920, 2400, 3200, 3840];

/* Photo Unsplash redimensionnée par le CDN d'Unsplash, en AVIF ou WebP selon le navigateur. */
export function urlUnsplash(base: string, largeur: number, qualite: number) {
  return `${base}?auto=format&fit=max&w=${largeur}&q=${qualite}`;
}

/* Photo du site : photo Unsplash en haute définition (couleur dominante pendant le chargement)
   ou fichier local optimisé par next/image (flou de chargement). Recadrage réglé par photo.position. */
export function PhotoImg({
  photo,
  className,
  sizes,
  preload,
  quality,
  decorative,
  style,
}: {
  photo: Photo;
  className?: string;
  sizes: string;
  preload?: boolean;
  quality?: 75 | 85;
  decorative?: boolean;
  style?: CSSProperties;
}) {
  const alt = decorative ? '' : photo.alt;
  const s: CSSProperties = { objectPosition: photo.position, backgroundColor: photo.couleur, color: 'transparent', ...style };

  if (typeof photo.src === 'string') {
    const base = photo.src;
    const q = quality ?? 75;
    const max = photo.width ?? 3840;
    const largeurs = LARGEURS.filter((l) => l <= max);
    if (max < 3840 && largeurs[largeurs.length - 1] !== max) largeurs.push(max);
    const srcSet = largeurs.map((l) => `${urlUnsplash(base, l, q)} ${l}w`).join(', ');
    const src = urlUnsplash(base, Math.min(1600, max), q);
    // Photo de tête de page : téléchargée en priorité, avant les scripts.
    if (preload) precharger(src, { as: 'image', imageSrcSet: srcSet, imageSizes: sizes, fetchPriority: 'high' });
    return (
      <img
        className={className}
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        width={photo.width}
        height={photo.height}
        loading={preload ? 'eager' : 'lazy'}
        fetchPriority={preload ? 'high' : undefined}
        decoding="async"
        style={s}
      />
    );
  }

  return <Image className={className} src={photo.src} alt={alt} placeholder="blur" sizes={sizes} preload={preload} quality={quality ?? 75} style={s} />;
}
