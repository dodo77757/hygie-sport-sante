import Link from 'next/link';
import { site } from '@/content/site';
import { liensLegaux, navigationPied } from '@/content/navigation';
import { ChangerCentre } from './ChangerCentre';
import { IconeReseau } from './IconesReseaux';
import { LogoTrace } from './LogoTrace';

/* Pied de page : bloc encre arrondi. « Rendez-vous chez » puis le logo en grand, qui se trace à l'arrivée
   (traits, puis les trois points), et le bouton de rendez-vous. Dessous : quatre colonnes d'informations. */
export function Footer() {
  const annee = new Date().getFullYear();
  return (
    <footer className="pied2">
      <div className="pied2__tete hk-reveal hk-reveal--direct">
        <h2 aria-label="Rendez-vous chez Hygie">
          <span className="pied2__sur">Rendez-vous chez</span>
          <LogoTrace className="pied2__logo" />
        </h2>
        <Link href="/rendez-vous" className="hk-btn hk-btn--jaune pied2__cta">
          <span className="hk-btn__label">Prendre rendez-vous</span>
        </Link>
      </div>
      <div className="pied2__grille">
        <div>
          <p className="pied2__texte">
            Santé, sport et récupération au même endroit, à Avon. Un parcours personnalisé, encadré par des professionnels de la santé et du sport.
          </p>
          <p className="pied2__titre">Suivez-nous</p>
          <ul className="pied2__reseaux">
            {site.reseaux.map((r) => (
              <li key={r.nom}>
                <a href={r.url} aria-label={`${r.nom} (nouvel onglet)`} title={r.nom} target="_blank" rel="noopener noreferrer">
                  <IconeReseau reseau={r.nom} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="pied2__titre">Horaires</p>
          <p className="pied2__liste">
            {site.horaires.map((h) => (
              <span key={h.jours}>
                {h.jours}
                <br />
                <strong>{h.heures}</strong>
                <br />
              </span>
            ))}
          </p>
          <p className="pied2__liste">
            <strong>Fontainebleau - Avon</strong> (Ouvert)
            <br />
            {site.adresse.rue}
            <br />
            {site.adresse.codePostal} {site.adresse.ville}
            <br />
            <br />
            <strong>Bondoufle</strong> (En construction)
            <br />
            Bondoufle (91) · Grand Paris Sud
          </p>
          <ChangerCentre />
        </div>
        <div>
          <p className="pied2__titre">Navigation</p>
          <ul className="pied2__liste pied2__nav">
            {navigationPied.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="pied2__titre">Contact</p>
          <address className="pied2__liste pied2__nav">
            <a href={site.telephone.lien}>{site.telephone.affichage}</a>
            <br />
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </address>
        </div>
      </div>
      <div className="pied2__bas">
        <span>
          © {site.anneeCreation}–{annee} {site.nom}
        </span>
        <span>
          {liensLegaux.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </span>
      </div>
    </footer>
  );
}
