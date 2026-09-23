import Link from 'next/link';
import { site } from '@/content/site';
import { liensLegaux, navigationPied } from '@/content/navigation';
import { LogoLockup } from './LogoLockup';

/* Pied de page : quatre colonnes filetées ; la deuxième reste vide, comme dans le template. */
export function Footer() {
  const annee = new Date().getFullYear();
  return (
    <footer className="hk-footer">
      <div className="hk-footer__col">
        <LogoLockup />
        <p className="hk-footer__tagline courant">
          Santé, sport et récupération au même endroit, à Avon. Un parcours personnalisé, encadré par des professionnels de la santé et du sport.
        </p>
      </div>

      <div className="hk-footer__col hk-footer__col--vide" aria-hidden="true" />

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
          {site.adresse.rue}
          <br />
          {site.adresse.codePostal} {site.adresse.ville}
          <br />
          <a href={site.telephone.lien}>{site.telephone.affichage}</a>
          <br />
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <br />
          {site.horaires.map((h) => (
            <span key={h.jours}>
              {h.court}
              <br />
            </span>
          ))}
        </address>
        <p className="titre-pied hk-footer__spaced">Suivez-nous</p>
        <ul className="hk-footer__socials">
          {site.reseaux.map((r) => (
            <li key={r.nom}>
              <a href={r.url} aria-label={`${r.nom} (nouvel onglet)`} title={r.nom} target="_blank" rel="noopener noreferrer">
                {r.court}
              </a>
            </li>
          ))}
        </ul>
        <p className="hk-footer__legal etiquette">
          © {site.anneeCreation}–{annee} Hygie
        </p>
      </div>
    </footer>
  );
}
