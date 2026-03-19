# Деплой на Beget — инструкция

## Структура на сервере

```
/home/s/shvetsx9/ratingtops.casino/   ← корень проекта
├── src/
├── public/
├── public_html/                       ← публичная директория (outDir)
├── autobuild.sh
├── package.json
└── astro.config.mjs
```

---

## Первый деплой (через SSH)

```bash
# 1. Подключиться по SSH
ssh shvetsx9@ratingtops.casino

# 2. Перейти в директорию проекта
cd /home/s/shvetsx9/ratingtops.casino/

# 3. Сделать скрипт исполняемым
chmod +x autobuild.sh

# 4. Запустить первую сборку вручную
./autobuild.sh
```

После выполнения папка `public_html/` будет содержать готовый статический сайт.

---

## Автоматическая пересборка (Cron)

Добавить задачу через панель Beget → **Планировщик задач (Cron)**:

**Команда:**
```bash
/home/s/shvetsx9/ratingtops.casino/autobuild.sh >> /home/s/shvetsx9/ratingtops.casino/autobuild.log 2>&1
```

**Рекомендуемое расписание:** `0 3 1 * *` — 1-го числа каждого месяца в 3:00.

> При каждой пересборке в HTML автоматически обновляются:
> - Текущий месяц и год в заголовках (`getBuildMonth()`, `getBuildYear()`)
> - Значения RTP в карточках казино (`generateRtp()`)
> - Мета-тег `dateModified` для сигнала свежести Яндексу

---

## Ручная пересборка (в любой момент)

```bash
cd /home/s/shvetsx9/ratingtops.casino/
./autobuild.sh
```

---

## Лог последней сборки

```bash
cat /home/s/shvetsx9/ratingtops.casino/autobuild.log
```
