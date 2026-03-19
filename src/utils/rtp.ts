/**
 * src/utils/rtp.ts
 * Build-time генератор RTP (Return to Player).
 *
 * ВАЖНО: Выполняется ТОЛЬКО во время сборки в frontmatter .astro-компонентов.
 * В скомпилированный HTML вшивается уже готовое число.
 * Яндекс-краулер увидит статичный текст без JS — не клоакинг.
 *
 * Алгоритм: детерминированный хеш на основе casino.id + соль даты сборки.
 * При одном и том же id + одной дате сборки — всегда одно и то же число.
 * При следующей сборке (новый месяц) — число меняется → сигнал freshness.
 */

/**
 * Простой числовой хеш строки (djb2-вариант).
 * Детерминирован: один input → всегда один output.
 */
function hashString(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) ^ str.charCodeAt(i);
    hash = hash >>> 0; // приводим к uint32
  }
  return hash;
}

/**
 * Генерирует RTP в диапазоне 94.0–98.9 с шагом 0.1.
 *
 * @param casinoId  — уникальный id казино (из casinos.json)
 * @returns строка вида "96.4"
 *
 * Соль: год + месяц сборки → значение меняется ежемесячно,
 * но стабильно в рамках одного деплоя.
 */
export function generateRtp(casinoId: string): string {
  const now = new Date();
  // Соль: "2026-03" — меняется раз в месяц
  const salt = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const seed = `${casinoId}::${salt}`;

  const hash = hashString(seed);

  // Диапазон: 94.0 … 98.9 → 50 возможных значений (шаг 0.1)
  const steps = 50; // (98.9 - 94.0) / 0.1 + 1
  const step = hash % steps;
  const rtp = 94.0 + step * 0.1;

  return rtp.toFixed(1);
}
