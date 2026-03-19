// astro.config.mjs
// Sitemap генерируется встроенной интеграцией — @astrojs/sitemap удалён.
// Причина: @astrojs/sitemap v3.x падает с "Cannot read properties of undefined
// (reading 'reduce')" на некоторых версиях Astro из-за бага в хуке
// astro:build:done. Решение: пишем интеграцию сами — 30 строк, 0 зависимостей.

import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import path from 'node:path';

const SITE = 'https://ratingtops.casino';

// Страницы сайта (без 404 — её индексировать не нужно)
// Поддерживается вручную: при добавлении нового кластера — добавьте строку сюда.
const PAGES = [
  { url: '/',                 priority: '1.0', changefreq: 'monthly' },
  { url: '/s-litsenziei/',    priority: '0.9', changefreq: 'monthly' },
  { url: '/mobilnye/',        priority: '0.9', changefreq: 'monthly' },
  { url: '/bystrye-vyplaty/', priority: '0.9', changefreq: 'monthly' },
  { url: '/min-depozit/',     priority: '0.9', changefreq: 'monthly' },
  { url: '/demo/',            priority: '0.9', changefreq: 'monthly' },
  { url: '/vysokiy-rtp/',     priority: '0.8', changefreq: 'monthly' },
];

// Кастомная Astro-интеграция: генерирует sitemap-index.xml + sitemap-0.xml
// после сборки, когда outDir уже заполнен готовыми HTML-файлами.
function customSitemap() {
  return {
    name: 'custom-sitemap',
    hooks: {
      'astro:build:done': ({ dir }) => {
        const outDir = dir?.pathname ?? dir;

        // Получаем актуальную дату сборки для <lastmod>
        const today = new Date().toISOString().split('T')[0];

        // ── sitemap-0.xml — сам список страниц ─────────────────────────────
        const urlset = PAGES.map(({ url, priority, changefreq }) => `
  <url>
    <loc>${SITE}${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('');

        const sitemap0 = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlset.trimStart()}
</urlset>`;

        // ── sitemap-index.xml — индексный файл, на него ссылается robots.txt
        const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE}/sitemap-0.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>`;

        fs.writeFileSync(path.join(outDir, 'sitemap-0.xml'), sitemap0, 'utf-8');
        fs.writeFileSync(path.join(outDir, 'sitemap-index.xml'), sitemapIndex, 'utf-8');

        console.log(`[custom-sitemap] ✓ sitemap-index.xml + sitemap-0.xml → ${outDir}`);
      },
    },
  };
}

export default defineConfig({
  output: 'static',
  site: SITE,
  outDir: './public_html',

  // trailingSlash: 'always' — Astro генерирует /mobilnye/index.html
  // и все внутренние ссылки заканчиваются на /
  // Синхронизирует поведение с .htaccess (trailing slash редирект)
  trailingSlash: 'always',

  integrations: [
    customSitemap(),
  ],
});
