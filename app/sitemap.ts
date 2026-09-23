import type { MetadataRoute } from 'next';
import { articles, categories } from '@/content/journal';
import { cheminSoin, soins } from '@/content/soins';
import { site } from '@/content/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: '/', priority: 1 },
    { path: '/methodologie', priority: 0.8 },
    { path: '/soins', priority: 0.8 },
    { path: '/sante', priority: 0.9 },
    { path: '/sport', priority: 0.9 },
    { path: '/recuperation', priority: 0.9 },
    { path: '/bilans', priority: 0.9 },
    { path: '/entreprises', priority: 0.8 },
    { path: '/clubs', priority: 0.7 },
    { path: '/rendez-vous', priority: 0.9 },
    { path: '/contact', priority: 0.7 },
    { path: '/journal', priority: 0.6 },
    { path: '/mentions-legales', priority: 0.2 },
    { path: '/confidentialite', priority: 0.2 },
  ];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p.path === '/' ? '' : p.path}`, changeFrequency: 'monthly' as const, priority: p.priority })),
    ...soins.map((s) => ({ url: `${site.url}${cheminSoin(s)}`, changeFrequency: 'monthly' as const, priority: 0.8 })),
    ...Object.keys(categories).map((c) => ({ url: `${site.url}/journal/categorie/${c}`, changeFrequency: 'monthly' as const, priority: 0.4 })),
    ...articles.map((a) => ({ url: `${site.url}/journal/${a.slug}`, lastModified: a.date, changeFrequency: 'yearly' as const, priority: 0.5 })),
  ];
}
