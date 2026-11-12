import type { Metadata, Viewport } from 'next';
import './styles/tokens.css';
import './styles/hygie.css';
import './styles/refonte.css';
import { anton, bodoni, hanken, jetbrains } from './fonts';
import { Audience } from '@/components/Audience';
import { BandeauCentre } from '@/components/BandeauCentre';
import { BarreMobile } from '@/components/BarreMobile';
import { Entree } from '@/components/Entree';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Mouvement } from '@/components/Mouvement';
import { RevealObserver } from '@/components/RevealObserver';
import { SelecteurCentreModal } from '@/components/SelecteurCentreModal';
import { TransitionPage } from '@/components/TransitionPage';
import { CentreProvider } from '@/context/CentreContext';
import { imagePartage, photos } from '@/content/images';
import { actionPrincipale, menu } from '@/content/navigation';
import { site } from '@/content/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Hygie Sport Santé et Performance · Avon (77)',
    /* Pages sans titre complet (journal, tous les soins) ; les autres pages donnent leur titre complet (textes du site) */
    template: '%s · Hygie',
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
    <html lang="fr" className={`${anton.variable} ${hanken.variable} ${jetbrains.variable} ${bodoni.variable}`} suppressHydrationWarning>
      <body>
        <CentreProvider>
          {/* En tête du document : le rideau couvre la page dès le premier affichage */}
          <Entree />
          <SelecteurCentreModal />
          {/* Forme à encoche des cartes photo (accueil, scènes, sections) */}
          <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
            <clipPath id="encoche" clipPathUnits="objectBoundingBox">
              <path
                transform="scale(.0033333 .0025)"
                d="M30 0H196Q226 0 226 30V32Q226 58 252 58H270Q300 58 300 88V370Q300 400 270 400H106Q76 400 76 370V368Q76 342 50 342H30Q0 342 0 312V30Q0 0 30 0Z"
              />
            </clipPath>
          </svg>
          <a className="skip-link" href="#contenu">
            Aller au contenu
          </a>
          <BandeauCentre />
          <Header links={menu} cta={actionPrincipale} telephone={{ affichage: site.telephone.affichage, lien: site.telephone.lien }} />
          <TransitionPage>
            <main id="contenu" tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </TransitionPage>
          <BarreMobile />
          <RevealObserver />
          <Mouvement />
          <Audience />
        </CentreProvider>
      </body>
    </html>
  );
}
