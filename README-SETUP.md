# Знаторика — MVP Setup Guide

## Требования
- Node.js 18+ (установи через brew)
- PostgreSQL 14+ (для БД)

## Быстрый старт

### 1. Установи зависимости
```bash
npm install
```

### 2. Настрой окружение
Скопируй `.env.example` в `.env.local` и заполни:
```bash
cp .env.example .env.local
```

Отредактируй `.env.local`:
```
DATABASE_URL="postgresql://user:password@localhost:5432/znatorika"
JWT_SECRET="your_random_string_here"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 3. Создай БД и миграции
```bash
npx prisma migrate dev --name init
```

### 4. Запусти проект
```bash
npm run dev
```

Откройся на [http://localhost:3000](http://localhost:3000)

## Структура проекта

```
znatorika/
├── app/                    # Next.js приложение (App Router)
│   ├── layout.tsx         # Главный layout
│   ├── page.tsx           # Главная страница
│   ├── (auth)/            # Авторизация
│   ├── generator/         # Генераторы
│   ├── trenazher/         # Тренажеры
│   ├── podpiska/          # Подписка
│   ├── admin/             # Админка
│   └── api/               # API endpoints
├── components/             # React компоненты
├── lib/                    # Утилиты (auth, db, generator)
├── styles/                 # CSS (Tailwind)
├── prisma/                 # БД схема
└── public/                 # Статические файлы
```

## Команды

```bash
# Запуск в dev режиме
npm run dev

# Build для продакшена
npm run build
npm run start

# Просмотр БД
npx prisma studio

# Миграции
npx prisma migrate dev --name feature_name
npx prisma db push
```

## Features в MVP

✅ Главная страница с поиском
✅ Регистрация и логин
✅ Админка (базовая)
✅ Генератор примеров
✅ Страница подписки
✅ API endpoints для авторизации
✅ Структура для тренажеров

⏳ (Coming soon):
- Интеграция ЮKassa (платежи)
- Встроенные тренажеры
- Полная админка
- Разделы по возрастам/предметам

## Development Tips

1. **Добавить новую страницу:**
   - Создай `app/new-page/page.tsx`
   - Используй layout из `app/layout.tsx`

2. **Добавить API endpoint:**
   - Создай `app/api/path/route.ts`
   - Используй `db` из `lib/db.ts`

3. **Стили:**
   - Используй Tailwind классы
   - CSS переменные в `styles/globals.css`

## Деплой на Vercel

1. Push на GitHub
2. Импортируй репо на [vercel.com](https://vercel.com)
3. Добавь переменные окружения в Vercel settings
4. Deploy

## Проблемы?

**Ошибка БД:**
```bash
npx prisma db push --skip-generate
```

**Не устанавливаются зависимости:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Порт 3000 занят:**
```bash
npm run dev -- -p 3001
```

---

**Дата:** 2026-07-03
**Версия:** MVP (v0.1.0)
**Статус:** Готово к разработке
