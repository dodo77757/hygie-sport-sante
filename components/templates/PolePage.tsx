import type { CSSProperties } from 'react';
import { Button } from '../ui/Button';
import { Entete, TitreLignes } from '../scenes/Entete';
import { SceneRail, ScenePile, Suite as BandeauSuite } from '../scenes/Scenes';
import { cheminSoin, poles, type CouleurPole, type Pole, type Soin } from '@/content/soins';
import { photos, type PhotoKey } from '@/content/images';
import { site } from '@/content/site';

export type CarteSupplementaire = { href: string; titre: string; extrait: string; meta: string; etiquette: string; couleur?: CouleurPole; photo?: PhotoKey };

export type Suite = {
  titre: string;
  texte: string;
  actions: Array<{ label: string; href: string; variant?: 'solid' | 'contour' | 'jaune' }>;
};

/* Bloc de texte après les cartes (page Sport : la préparation par discipline) */
export type Complement = { titre: string; texte: string; items: string[] };

export const actionsParDefaut: Suite['actions'] = [
  { label: 'Prendre rendez-vous', href: '/rendez-vous', variant: 'solid' },
  { label: `Appeler le ${site.telephone.affichage}`, href: site.telephone.lien },
];

const suiteParDefaut: Suite = {
  titre: 'Un doute sur le soin adapté ?',
  texte: 'Appelez-nous, nous vous orientons vers le bon praticien ou le bon bilan.',
  actions: actionsParDefaut,
};

/* Page d'un pôle (Santé, Sport, Récupération) ou de tous les soins, dans la langue de l'accueil :
   la carte photo en haut de page, puis la scène des soins (pile de cartes pour un pôle, une piste par pôle pour tous les soins),
   le complément éventuel, et le bandeau « et ensuite » avec la prise de rendez-vous. */
export function PolePage({
  titre,
  chapo,
  photo,
  liste,
  supplementaires = [],
  complement,
  suite = suiteParDefaut,
  parPole,
}: {
  titre: string;
  chapo: string;
  /** Conservé pour compatibilité : la couleur du pôle n'est plus affichée dans le titre */
  point?: CouleurPole;
  photo: PhotoKey;
  liste: Soin[];
  supplementaires?: CarteSupplementaire[];
  complement?: Complement;
  suite?: Suite;
  /** Tous les soins : une piste par pôle */
  parPole?: boolean;
}) {
  const ordre: Pole[] = ['sante', 'sport', 'recuperation', 'bilans'];

  return (
    <>
      <Entete id="titre-pole" titre={titre} chapo={chapo} photo={photos[photo]} />

      {parPole ? (
        ordre
          .filter((pole) => liste.some((s) => s.pole === pole))
          .map((pole) => (
            <SceneRail
              key={pole}
              id={`groupe-${pole}`}
              titre={poles[pole].nom}
              texte={poles[pole].chapo}
              lien={{ label: 'Voir le pôle', href: poles[pole].href }}
              items={liste
                .filter((s) => s.pole === pole)
                .map((s) => ({ href: cheminSoin(s), nom: s.carte.titre ?? s.nom, detail: s.carte.meta, photo: s.photo }))}
            />
          ))
      ) : (
        <ScenePile
          items={[
            ...liste.map((s) => ({ href: cheminSoin(s), nom: s.carte.titre ?? s.nom, sous: s.carte.meta, texte: s.carte.extrait, photo: s.photo })),
            ...supplementaires.map((c) => ({ href: c.href, nom: c.titre, sous: c.meta, texte: c.extrait, photo: c.photo })),
          ]}
        />
      )}

      {complement ? (
        <section className="e-plus obs accueil" aria-labelledby="titre-complement">
          <div>
            <h2 id="titre-complement" className="a-h2">
              <TitreLignes texte={complement.titre} max={18} />
            </h2>
            <p className="monte" style={{ '--n': 3 } as CSSProperties}>
              {complement.texte}
            </p>
          </div>
          <ul>
            {complement.items.map((item, i) => {
              const [tete, ...reste] = item.split(/\s:\s/);
              return (
                <li key={item} className="monte" style={{ '--n': Math.min(i + 2, 9) } as CSSProperties}>
                  {reste.length ? (
                    <>
                      <b>{tete}</b>
                      <span>{reste.join(' : ')}</span>
                    </>
                  ) : (
                    <span>{item}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      <BandeauSuite titre={suite.titre} texte={suite.texte}>
        {suite.actions.map((a) => (
          <Button key={a.href} href={a.href} variant={a.variant === 'solid' ? 'jaune' : (a.variant ?? 'contour')}>
            {a.label}
          </Button>
        ))}
      </BandeauSuite>
    </>
  );
}
