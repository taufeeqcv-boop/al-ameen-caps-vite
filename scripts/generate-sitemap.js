#!/usr/bin/env node
/**
 * Generates public/sitemap.xml from static pages + COLLECTION_PRODUCTS.
 * Run during build. Uses VITE_SITE_URL or fallback.
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { COLLECTION_PRODUCTS } from '../src/data/collection.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const baseUrl = (process.env.VITE_SITE_URL || process.env.VITE_APP_URL || 'https://al-ameen-caps-app.netlify.app').replace(/\/$/, '');

const staticPages = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/shop', changefreq: 'weekly', priority: '0.9' },
  { path: '/about', changefreq: 'monthly', priority: '0.7' },
  { path: '/contact', changefreq: 'monthly', priority: '0.7' },
  { path: '/shipping', changefreq: 'monthly', priority: '0.6' },
  { path: '/privacy', changefreq: 'yearly', priority: '0.4' },
  { path: '/terms', changefreq: 'yearly', priority: '0.4' },
];

const productPages = (COLLECTION_PRODUCTS || []).map((p) => ({
  path: `/product/${p.id}`,
  changefreq: 'weekly',
  priority: '0.8',
}));

const urls = [...staticPages, ...productPages];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${baseUrl}${u.path}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

const outDir = join(__dirname, '..', 'public');
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'sitemap.xml'), xml, 'utf8');
console.log('Generated sitemap.xml with', urls.length, 'URLs');
