'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { actionPrincipale } from '@/content/navigation';
import { site } from '@/content/site';

/* Sur mobile, barre fixée en bas de l'écran : « Prendre rendez-vous » (jaune) et « Appeler ».
   Masquée sur la page de rendez-vous, où l'on y est déjà. Le pied de page reçoit une marge basse (body:has(.barre-mobile)). */
export function BarreMobile() {
  const pathname = usePathname();
  if (pathname === actionPrincipale.href) return null;

  return (
    <div className="barre-mobile">
      <a className="barre-mobile__appel" href={site.telephone.lien}>
        Appeler
      </a>
      <Link className="barre-mobile__rdv" href={actionPrincipale.href}>
        {actionPrincipale.label}
      </Link>
    </div>
  );
}
