# Casino SEO Aggregator — Этап 1: Каркас и Данные

## Принцип "Сайт как База Данных"

Вся информация о казино хранится в одном файле:
```
src/data/casinos.json
```

**Смена любого значения в `casinos.json` мгновенно отражается на всех страницах.**

---

## Быстрый старт

```bash
npm install
npm run dev
```

Откройте http://localhost:4321

---

## Структура проекта

```
src/
├── data/
│   └── casinos.json          ← ЕДИНЫЙ ИСТОЧНИК ДАННЫХ (правим только здесь)
├── components/
│   ├── CasinoCard.astro      ← Карточка казино (принимает casino из JSON)
│   ├── Header.astro          ← Шапка с навигацией
│   ├── Footer.astro          ← Подвал с дисклеймером
│   └── FAQ.astro             ← Аккордеон FAQ (schema.org)
├── layouts/
│   └── BaseLayout.astro      ← HTML-обёртка + мета-теги
├── pages/
│   ├── index.astro           ← Все казино, сортировка по рейтингу
│   ├── min-depozit.astro     ← Фильтр: min_deposit <= 100
│   ├── mobilnye.astro        ← Фильтр: is_mobile_friendly = true
│   ├── s-litsenziei.astro    ← Фильтр: has_license = true
│   └── demo-bez-registracii.astro ← Фильтр: no_registration_demo = true
└── styles/
    └── global.css            ← Базовые стили каркаса
```

---

## Поля casinos.json

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | string | Уникальный slug (используется в HTML id) |
| `name` | string | Название казино |
| `logo` | string | Путь к логотипу |
| `rating` | number | Рейтинг 0–5 (сортировка по убыванию) |
| `min_deposit` | number | Мин. депозит в рублях |
| `bonus_text` | string | Текст бонусного предложения |
| `features` | string[] | Массив тегов-преимуществ |
| `go_link` | string | Партнёрская ссылка (rel=nofollow sponsored) |
| `is_mobile_friendly` | boolean | Кластер: мобильные казино |
| `has_license` | boolean | Кластер: лицензированные |
| `no_registration_demo` | boolean | Кластер: демо без регистрации |

---

## Добавление нового казино

Открыть `src/data/casinos.json` и добавить объект в массив:

```json
{
  "id": "new-casino",
  "name": "New Casino",
  "logo": "/images/logo-placeholder.svg",
  "rating": 4.1,
  "min_deposit": 50,
  "bonus_text": "100% + 20 FS",
  "features": ["Быстрый вывод"],
  "go_link": "https://example.com/go/new-casino",
  "is_mobile_friendly": true,
  "has_license": true,
  "no_registration_demo": false
}
```

Сохранить — казино появится на всех релевантных страницах автоматически.

---

## Добавление нового кластера

1. Создать `src/pages/noviy-klaster.astro`
2. Импортировать `casinos.json`
3. Добавить `.filter(c => c.ваш_флаг === true)`
4. Добавить ссылку в `Header.astro` и `Footer.astro`

---

## Следующие этапы

- Этап 2: Дизайн и стилизация компонентов
- Этап 3: Индивидуальные страницы казино (`/kazino/[id]`)
- Этап 4: SEO-оптимизация, sitemap, robots.txt
