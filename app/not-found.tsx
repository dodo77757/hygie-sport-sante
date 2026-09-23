import { Button } from '@/components/ui/Button';
import { Mots } from '@/components/ui/Mots';

export default function NotFound() {
  return (
    <section className="hk-hero page-404" aria-labelledby="titre-404">
      <p className="hk-hero__intro courant">Cette page n’existe pas ou a changé d’adresse avec le nouveau site.</p>
      <h1 id="titre-404" className="hk-hero__title titre-hero">
        <Mots texte="Page introuvable" />
      </h1>
      <div className="hk-hero__cta">
        <Button href="/">Retour à l’accueil</Button>
      </div>
    </section>
  );
}
