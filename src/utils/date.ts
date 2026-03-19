/**
 * src/utils/date.ts
 * Build-time утилита для генерации актуальных дат.
 *
 * ВАЖНО: Этот модуль импортируется ТОЛЬКО в frontmatter (.astro-файлах)
 * и выполняется исключительно во время сборки (npm run build).
 * Клиентский JS не получает эти функции — Яндекс видит готовый HTML.
 */

/**
 * Возвращает текущий месяц и год на русском языке.
 * Пример: "Март 2026"
 */
export function getBuildMonth(): string {
  return new Date().toLocaleDateString('ru-RU', {
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Возвращает текущий год.
 * Пример: 2026
 */
export function getBuildYear(): number {
  return new Date().getFullYear();
}

/**
 * Возвращает дату последнего обновления для тегов schema.org / sitemap.
 * Формат ISO 8601: "2026-03-19"
 */
export function getBuildDateISO(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Возвращает полную дату в читаемом формате.
 * Пример: "19 марта 2026"
 */
export function getBuildDateFull(): string {
  return new Date().toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
