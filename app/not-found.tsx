import { Button } from '@/components/ui/Button';
import { Mots } from '@/components/ui/Mots';

/* Page introuvable : même gabarit que le haut de l'accueil (titre en très grand, texte et bouton en bas). */
export default function NotFound() {
  return (
    <section className="hk-hero page-404" aria-labelledby="titre-404">
      <h1 id="titre-404" className="hk-hero__title titre-hero titre-hero--serre">
        <Mots texte="Page introuvable" />
      </h1>
      <div className="hk-hero__bas">
        <p className="chapo hk-hero__intro">Cette page n’existe pas ou a changé d’adresse avec le nouveau site.</p>
        <div className="hk-hero__cta">
          <Button href="/">Retour à l’accueil</Button>
        </div>
      </div>
    </section>
  );
}
