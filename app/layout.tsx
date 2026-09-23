import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './styles/tokens.css';
import './styles/hygie.css';
import { anton, hanken, jetbrains } from './fonts';
import { Audience } from '@/components/Audience';
import { BarreMobile } from '@/components/BarreMobile';
import { Cartes3D } from '@/components/Cartes3D';
import { Entree } from '@/components/Entree';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LogoLockup } from '@/components/LogoLockup';
import { RevealObserver } from '@/components/RevealObserver';
import { TransitionPage } from '@/components/TransitionPage';
import { imagePartage, photos } from '@/content/images';
import { actionPrincipale, menu } from '@/content/navigation';
import { site } from '@/content/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Hygie Sport Santé et Performance · Avon (77)',
    template: '%s · Hygie Sport Santé et Performance',
  },
  description: site.description,
  applicationName: site.nom,
  formatDetection: { telephone: false },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: site.nom,
    images: [imagePartage(photos.depart)],
  },
  twitter: { card: 'summary_large_image', images: [imagePartage(photos.depart).url] },
  alternates: { canonical: '/' },
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
};

export const viewport: Viewport = {
  themeColor: '#EEEFE9',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${anton.variable} ${hanken.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <body>
        {/* Avant le premier affichage : si l'entrée a déjà été vue dans cette visite, le rideau n'apparaît pas */}
        <Script
          id="entree-vue"
          strategy="beforeInteractive"
        >{`try{if(sessionStorage.getItem('hygie-entree')==='1')document.documentElement.classList.add('entree-vue')}catch(e){}`}</Script>
        {/* En tête du document : le rideau couvre la page dès le premier affichage */}
        <Entree />
        <a className="skip-link" href="#contenu">
          Aller au contenu
        </a>
        <Header
          logo={<LogoLockup preload compact />}
          links={menu}
          cta={actionPrincipale}
          telephone={{ affichage: site.telephone.affichage, lien: site.telephone.lien }}
        />
        {/* Rideau jaune des transitions entre les pages : hors écran, il ne traverse l'écran que pendant la transition */}
        <div className="rideau-page" aria-hidden="true" />
        <TransitionPage>
          <main id="contenu" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </TransitionPage>
        <BarreMobile />
        <RevealObserver />
        <Cartes3D />
        <Audience />
      </body>
    </html>
  );
}
