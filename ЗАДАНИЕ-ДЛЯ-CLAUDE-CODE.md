# ЗАДАНИЕ ДЛЯ CLAUDE CODE — ЗНАТОРИКА

**Срок:** 7 дней (MVP)  
**Язык:** TypeScript + Next.js 14  
**БД:** PostgreSQL + Prisma  
**Хостинг:** Vercel

---

## ДЕНЬ 1-2: ИНИЦИАЛИЗАЦИЯ И СТРУКТУРА

### Задача 1: Создать Next.js проект

```bash
cd /Users/olgalapina/Projects/My-site-Znatorica
rm -rf .next node_modules package-lock.json (если есть старые файлы)

npx create-next-app@latest . --typescript --tailwind --app --eslint
```

**При подсказках:**
- TypeScript: Yes
- ESLint: Yes
- Tailwind: Yes
- App Router: Yes
- Src directory: No
- Git: Yes

### Задача 2: Установить зависимости

```bash
npm install prisma @prisma/client
npm install jsonwebtoken bcryptjs
npm install yookassa-sdk
npm install recharts
npm install -D @types/jsonwebtoken
```

### Задача 3: Инициализировать Prisma

```bash
npx prisma init
```

Отредактировать `.env.local`:
```
DATABASE_URL="postgresql://user:password@localhost:5432/znatorika"
JWT_SECRET="generate_random_string_here"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### Задача 4: Создать структуру БД (prisma/schema.prisma)

Скопировать схему из ТЗ-ДЛЯ-РАЗРАБОТКИ.md (раздел "БАЗА ДАННЫХ").

```bash
npx prisma migrate dev --name init
```

### Задача 5: Настроить Tailwind CSS

**tailwind.config.js:**
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'violet': '#7C3AED',
        'violet-mid': '#6B21A8',
        'orange': '#F97316',
        'bg': '#0A0812',
        'bg-card': '#16102A',
      },
    },
  },
}
```

### Задача 6: Создать папки

```
app/
├── (auth)/
│   ├── layout.tsx
│   ├── register/
│   │   └── page.tsx
│   └── login/
│       └── page.tsx
├── [segment]/
│   ├── page.tsx
│   └── [subject]/
│       └── [topic]/
│           └── page.tsx
├── trenazher/
│   ├── page.tsx
│   └── [subject]/
│       └── [id]/
│           └── page.tsx
├── generator/
│   ├── page.tsx
│   └── [type]/
│       └── page.tsx
├── plakaty/
│   └── page.tsx
├── podpiska/
│   └── page.tsx
├── admin/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── payments/
│   │   └── page.tsx
│   └── users/
│       └── page.tsx
├── api/
│   ├── auth/
│   │   ├── register/
│   │   │   └── route.ts
│   │   └── login/
│   │       └── route.ts
│   ├── payment/
│   │   └── webhook/
│   │       └── route.ts
│   ├── content/
│   │   └── topics/
│   │       └── route.ts
│   └── generator/
│       └── create/
│           └── route.ts
├── layout.tsx (главный)
└── page.tsx (главная)

components/
├── Navbar.tsx
├── Footer.tsx
├── SearchBar.tsx
├── TopicCard.tsx
├── TabsFormat.tsx
├── SubscriptionBlock.tsx
└── trainers/
    ├── AlphabetTrainer.tsx
    ├── CountTrainer.tsx
    └── ColorTrainer.tsx

lib/
├── db.ts
├── auth.ts
├── validators.ts
├── constants.ts
└── generator.ts

styles/
└── globals.css
```

---

## ДЕНЬ 3: АВТОРИЗАЦИЯ И ОСНОВНЫЕ КОМПОНЕНТЫ

### Задача 7: Создать lib/auth.ts

```typescript
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { db } from './db';

export function generateToken(userId: string) {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '30d' });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
  } catch {
    return null;
  }
}

export async function hashPassword(password: string) {
  return bcryptjs.hash(password, 10);
}

export async function comparePassword(password: string, hash: string) {
  return bcryptjs.compare(password, hash);
}

export async function getUserFromToken(token: string) {
  const decoded = verifyToken(token);
  if (!decoded) return null;
  return db.user.findUnique({ where: { id: decoded.userId } });
}
```

### Задача 8: Создать API регистрации (app/api/auth/register/route.ts)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { hashPassword, generateToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email и пароль обязательны' },
        { status: 400 }
      );
    }

    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Пользователь уже существует' },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(password);
    const user = await db.user.create({
      data: { email, passwordHash },
    });

    const token = generateToken(user.id);

    return NextResponse.json(
      { id: user.id, email: user.email, token },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}
```

### Задача 9: Создать API логина (app/api/auth/login/route.ts)

Аналогично регистрации, но проверяем пароль через `comparePassword`.

### Задача 10: Создать компонент Navbar

**components/Navbar.tsx:**
```tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-black/92 backdrop-blur-sm border-b border-[#2D2350] px-6 h-16 flex items-center justify-between">
      <Link href="/" className="font-black text-2xl text-white">
        🐿️ Знаторика
      </Link>

      <input
        type="text"
        placeholder="Поиск темы..."
        className="px-4 py-2 rounded-lg bg-[#16102A] text-white placeholder-gray-400 w-96"
        onFocus={() => setSearchOpen(true)}
      />

      <div className="flex gap-4">
        <Link href="/login" className="text-white hover:text-orange">
          Вход
        </Link>
        <Link
          href="/register"
          className="bg-orange text-white px-4 py-2 rounded-lg font-bold"
        >
          Регистрация
        </Link>
      </div>
    </nav>
  );
}
```

### Задача 11: Создать компонент Footer

**components/Footer.tsx:**
```tsx
export default function Footer() {
  return (
    <footer className="bg-[#0A0812] border-t border-[#2D2350] py-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-white mb-4">Знаторика</h3>
          <p className="text-gray-400 text-sm">Учись. Тренируйся. Сдавай.</p>
        </div>

        <div>
          <h4 className="font-bold text-white mb-4">Каналы</h4>
          <div className="flex gap-4">
            <a href="https://youtube.com" className="text-gray-400 hover:text-white">
              YouTube
            </a>
            <a href="https://t.me" className="text-gray-400 hover:text-white">
              Telegram
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-white mb-4">Правовая информация</h4>
          <a href="/privacy" className="text-gray-400 text-sm hover:text-white">
            Политика конфиденциальности
          </a>
        </div>
      </div>

      <div className="border-t border-[#2D2350] mt-8 pt-8 text-center text-gray-400 text-sm">
        © 2026 Знаторика. Все права защищены.
      </div>
    </footer>
  );
}
```

### Задача 12: Главный Layout

**app/layout.tsx:**
```tsx
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './styles/globals.css';

export const metadata = {
  title: 'Знаторика — Учись. Тренируйся. Сдавай.',
  description: 'Образовательная платформа для детей 4–11 лет',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="bg-black text-white">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
```

---

## ДЕНЬ 4: ТРЕНАЖЁРЫ И ГЕНЕРАТОР

### Задача 13: Встроить 5 тренажеров

Скопировать существующие HTML тренажеры в React компоненты:
- **AlphabetTrainer** (англ. алфавит)
- **CountTrainer** (счёт до 10)
- **ColorTrainer** (цвета)
- **MultiplicationTable** (умножение)
- **NumbersTrainer** (числа)

Каждый компонент:
```tsx
'use client';
import { useState } from 'react';

export default function AlphabetTrainer() {
  const [score, setScore] = useState(0);
  // Логика тренажера

  return (
    <div className="p-8 bg-[#16102A] rounded-lg">
      {/* Интерфейс тренажера */}
    </div>
  );
}
```

### Задача 14: Создать генератор примеров

**lib/generator.ts:**
```typescript
export function generateExamples(params: {
  min: number;
  max: number;
  count: number;
  operation: '+' | '-' | '*';
}) {
  const examples = [];
  for (let i = 0; i < params.count; i++) {
    const a = Math.floor(Math.random() * (params.max - params.min + 1)) + params.min;
    const b = Math.floor(Math.random() * (params.max - params.min + 1)) + params.min;
    examples.push(`${a} ${params.operation} ${b} = __`);
  }
  return examples.join('\n');
}
```

**app/api/generator/create/route.ts:**
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { generateExamples } from '@/lib/generator';

export async function POST(req: NextRequest) {
  const { type, params } = await req.json();

  if (type === 'primery') {
    const result = generateExamples(params);
    return NextResponse.json({ html: `<pre>${result}</pre>` });
  }

  return NextResponse.json({ error: 'Unknown type' }, { status: 400 });
}
```

### Задача 15: Создать 5 базовых тем в БД

**app/api/content/topics/route.ts:**
```typescript
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  // Проверить, есть ли темы
  const topics = await db.topic.count();
  
  if (topics === 0) {
    // Создать 5 базовых тем
    const segment4_5 = await db.segment.create({
      data: { slug: '4-5-let', name: 'Дошкольники 4–5 лет' },
    });

    const subject_math = await db.subject.create({
      data: {
        slug: 'matematika',
        name: 'Математика',
        segmentId: segment4_5.id,
      },
    });

    const topic1 = await db.topic.create({
      data: {
        slug: 'schet-do-5',
        title: 'Счёт до 5',
        segmentId: segment4_5.id,
        subjectId: subject_math.id,
        formats: {
          create: [
            { type: 'teoria', content: '<p>Учимся считать от 1 до 5</p>', isPublic: true },
            { type: 'trenazher', isPaid: true },
          ],
        },
      },
    });
  }

  return NextResponse.json({ success: true });
}
```

---

## ДЕНЬ 5: ПЛАТЕЖИ (ЮKASSA)

### Задача 16: Интегрировать ЮKassa

**lib/kassa.ts:**
```typescript
// Временная заглушка для ЮKassa
export async function createPayment(userId: string, amount: number) {
  // На MVP используем простую логику
  // Потом подключим реальную ЮKassa
  return {
    kassaId: 'test_' + Math.random(),
    redirectUrl: '/payment-success',
  };
}
```

**app/api/payment/webhook/route.ts:**
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  const data = await req.json();

  // Обновить статус подписки
  if (data.object?.status === 'succeeded') {
    await db.subscription.update({
      where: { id: data.object.id },
      data: { status: 'active' },
    });
  }

  return NextResponse.json({ success: true });
}
```

### Задача 17: Страница подписки

**app/podpiska/page.tsx:**
```tsx
'use client';

export default function SubscriptionPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold text-center mb-4">Подписка</h1>
      <p className="text-center text-gray-400 mb-12">299 ₽ в месяц</p>

      <div className="bg-[#16102A] border border-[#2D2350] rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4">Что входит?</h2>
        <ul className="space-y-3">
          <li>✅ Все тренажёры без ограничений</li>
          <li>✅ Генератор примеров, прописей</li>
          <li>✅ Рабочие листы и плакаты</li>
          <li>✅ Материалы для учителей</li>
        </ul>
      </div>

      <button className="w-full bg-orange text-white py-4 rounded-lg font-bold text-lg hover:bg-opacity-90">
        Оформить подписку
      </button>
    </div>
  );
}
```

---

## ДЕНЬ 6: АДМИНКА И АНАЛИТИКА

### Задача 18: Администраторская панель (минимальная)

**app/admin/page.tsx:**
```tsx
'use client';

import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    subscribers: 0,
    revenue: 0,
  });

  useEffect(() => {
    // Загрузить статистику
    fetch('/api/analytics/users')
      .then((r) => r.json())
      .then((data) => setStats(data));
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Админ-панель</h1>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-[#16102A] p-6 rounded-lg">
          <p className="text-gray-400 mb-2">Всего пользователей</p>
          <p className="text-3xl font-bold">{stats.users}</p>
        </div>
        <div className="bg-[#16102A] p-6 rounded-lg">
          <p className="text-gray-400 mb-2">Подписчиков</p>
          <p className="text-3xl font-bold">{stats.subscribers}</p>
        </div>
        <div className="bg-[#16102A] p-6 rounded-lg">
          <p className="text-gray-400 mb-2">Доход</p>
          <p className="text-3xl font-bold">₽{stats.revenue}</p>
        </div>
      </div>

      <div className="bg-[#16102A] p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Платежи</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#2D2350]">
              <th className="text-left py-2">Email</th>
              <th className="text-left py-2">Сумма</th>
              <th className="text-left py-2">Статус</th>
            </tr>
          </thead>
          <tbody>
            {/* Платежи загружаются через API */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

### Задача 19: API аналитики

**app/api/analytics/users/route.ts:**
```typescript
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const totalUsers = await db.user.count();
  const subscribers = await db.subscription.count({
    where: { status: 'active' },
  });

  return NextResponse.json({
    users: totalUsers,
    subscribers,
    revenue: 0, // Посчитаем потом
  });
}
```

---

## ДЕНЬ 7: SEO, РАЗВЁРТЫВАНИЕ, ФИНИШ

### Задача 20: Sitemap и robots.txt

**public/robots.txt:**
```
User-agent: *
Allow: /
Disallow: /admin
Sitemap: https://znatorika.com/sitemap.xml
```

**app/sitemap.ts:**
```typescript
export default async function sitemap() {
  return [
    {
      url: 'https://znatorika.com',
      lastModified: new Date(),
    },
    {
      url: 'https://znatorika.com/4-5-let',
      lastModified: new Date(),
    },
    // Добавить остальные страницы
  ];
}
```

### Задача 21: Мета-теги для каждой страницы

```tsx
export const metadata = {
  title: 'Название страницы',
  description: 'Описание для поиска',
  openGraph: {
    title: 'Название',
    description: 'Описание',
    image: 'https://znatorika.com/og-image.png',
  },
};
```

### Задача 22: Тестирование локально

```bash
npm run dev
# Проверить:
# - Главная загружается
# - Регистрация работает
# - Логин работает
# - Тренажеры работают
# - Генератор создаёт примеры
# - Админка открывается
```

### Задача 23: Развёртывание на Vercel

```bash
git add .
git commit -m "Initial commit: Znatorika MVP"
git push origin main

# Если Git ещё не инициализирован:
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/znatorika.git
git push -u origin main
```

Потом на Vercel.com:
- Импортировать репо
- Добавить переменные окружения (.env)
- Развернуть

### Задача 24: Финальная проверка

**Чек-лист:**
- [ ] Главная работает (логотип, поиск, кнопки)
- [ ] Регистрация и логин работают
- [ ] 5 тренажеров встроены
- [ ] Генератор создаёт примеры
- [ ] Страница подписки отображается
- [ ] Админка показывает статистику
- [ ] Мета-теги на каждой странице
- [ ] Sitemap генерируется
- [ ] Сайт развёрнут на Vercel или локально работает

---

## БЫСТРЫЕ КОМАНДЫ

```bash
# Запуск
npm run dev

# Создание миграции БД
npx prisma migrate dev --name feature_name

# Просмотр БД
npx prisma studio

# Сборка для продакшена
npm run build
npm run start

# Проверка типов
npx tsc --noEmit
```

---

## ВАЖНО

1. **5 тем на старте** (счёт до 5, счёт до 10, алфавит, цвета, числа)
2. **Тренажеры встраиваются как React компоненты** (обертка вокруг HTML)
3. **Платежи на MVP: заглушка** (потом ЮKassa полностью)
4. **Админка минимальная** (только основное)
5. **SEO базовый** (мета-теги, sitemap, schema.org потом)

---

**Начинай! Результат через неделю должен быть рабочий MVP.** 🚀
