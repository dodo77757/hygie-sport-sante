import Link from 'next/link';
import { site } from '@/content/site';
import { liensLegaux, navigationPied } from '@/content/navigation';
import { IconeReseau } from './IconesReseaux';
import { LogoTrace } from './LogoTrace';
import { Pill } from './ui/Primitives';

/* Pied de page : bloc encre nettement séparé de la page par un trait jaune, texte clair, logo en traits clairs.
   Quatre colonnes filetées : marque, horaires, navigation, contact. */
export function Footer() {
  const annee = new Date().getFullYear();
  return (
    <footer className="hk-footer-cadre">
      <div className="hk-footer">
        <div className="hk-footer__col">
          <Link href="/" className="hk-footer__logo" aria-label="Hygie, accueil">
            <LogoTrace className="hk-footer__marque" />
            <span className="hk-lockup__meta">
              <span className="hk-lockup__pills">
                <Pill>Sport</Pill>
                <Pill>Santé</Pill>
                <Pill>Performance</Pill>
              </span>
              <span className="hk-lockup__sign">Avon · 77</span>
            </span>
          </Link>
          <p className="hk-footer__tagline courant">
            Santé, sport et récupération au même endroit, à Avon. Un parcours personnalisé, encadré par des professionnels de la santé et du sport.
          </p>
        </div>

        <div className="hk-footer__col">
          <p className="titre-pied">Horaires</p>
          <p className="hk-footer__list courant">
            {site.horaires.map((h) => (
              <span key={h.jours}>
                {h.jours}
                <br />
                <strong>{h.heures}</strong>
                <br />
              </span>
            ))}
          </p>
          <p className="hk-footer__list courant">
            {site.adresse.rue}
            <br />
            {site.adresse.codePostal} {site.adresse.ville}
          </p>
        </div>

        <div className="hk-footer__col">
          <p className="titre-pied">Navigation</p>
          <ul className="hk-footer__list courant">
            {navigationPied.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
          <p className="hk-footer__legal etiquette">
            {liensLegaux.map((l, i) => (
              <span key={l.href}>
                {i ? <br /> : null}
                <Link href={l.href}>{l.label}</Link>
              </span>
            ))}
          </p>
        </div>

        <div className="hk-footer__col">
          <p className="titre-pied">Contact</p>
          <address className="hk-footer__list courant" style={{ fontStyle: 'normal' }}>
            <a href={site.telephone.lien}>{site.telephone.affichage}</a>
            <br />
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </address>
          <Link href="/rendez-vous" className="hk-btn hk-btn--jaune hk-footer__cta">
            Prendre rendez-vous
          </Link>
          <p className="titre-pied hk-footer__spaced">Suivez-nous</p>
          <ul className="hk-footer__socials">
            {site.reseaux.map((r) => (
              <li key={r.nom}>
                <a href={r.url} aria-label={`${r.nom} (nouvel onglet)`} title={r.nom} target="_blank" rel="noopener noreferrer">
                  <IconeReseau reseau={r.nom} />
                </a>
              </li>
            ))}
          </ul>
          <p className="hk-footer__legal etiquette">
            © {site.anneeCreation}–{annee} Hygie
          </p>
        </div>
      </div>
    </footer>
  );
}
