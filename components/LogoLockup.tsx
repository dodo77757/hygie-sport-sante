import Image from 'next/image';
import Link from 'next/link';
import wordmark from '@/assets/logos/hygie-wordmark.png';
import { Pill } from './ui/Primitives';

/* Bloc logo : la marque Hygie, suivie (hors header) des pastilles SPORT · SANTÉ · PERFORMANCE et de la signature AVON · 77. */
export function LogoLockup({ preload = false, compact = false }: { preload?: boolean; compact?: boolean }) {
  return (
    <Link href="/" className="hk-lockup" aria-label="Hygie Sport Santé et Performance, accueil">
      <Image className="hk-lockup__mark" src={wordmark} alt="" preload={preload} sizes="(max-width: 1023px) 160px, 200px" />
      {compact ? null : (
        <span className="hk-lockup__meta" aria-hidden="true">
          <span className="hk-lockup__pills">
            <Pill>Sport</Pill>
            <Pill>Santé</Pill>
            <Pill>Performance</Pill>
          </span>
          <span className="hk-lockup__sign">Avon · 77</span>
        </span>
      )}
    </Link>
  );
}
