import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',

  // Финальный домен на хостинге Beget
  site: 'https://ratingtops.casino',

  // Готовая статика складывается в public_html — публичную директорию Beget.
  // При npm run build dist/ НЕ создаётся; весь HTML и ассеты идут сюда.
  outDir: './public_html',
});
