# Next Steps — План завершения MVP

## ДЕНЬ 1-2: ✅ ГОТОВО
- ✅ Структура Next.js проекта
- ✅ Tailwind CSS и дизайн
- ✅ Layout, navbar, footer
- ✅ Главная страница с поиском
- ✅ Prisma схема БД
- ✅ Конфиги (tsconfig, next.config, postcss)

## ДЕНЬ 3: ⏳ TODO

### Авторизация (Email & Пароль)
- [ ] Протестировать `/register` и `/login` на localhost
- [ ] Убедиться, что токен сохраняется в localStorage
- [ ] Добавить middleware для защиты `/admin` маршрутов

### Необходимо
```bash
npm install
cp .env.example .env.local
# Отредактируй DATABASE_URL в .env.local
npx prisma migrate dev --name init
npm run dev
```

### Тестирование авторизации
1. Открой http://localhost:3000/register
2. Зарегистрируйся с любым email и паролем
3. Проверь, что редирект на главную
4. Проверь что в localStorage появился token
5. Выйди и залогинься

## ДЕНЬ 4: ⏳ TODO (Следующий приоритет)

### Встроить 3-5 тренажеров
Файлы тренажеров уже есть в корне проекта:
- `alphabet-app.html` → `components/trainers/AlphabetTrainer.tsx`
- `color-trainer.html` → `components/trainers/ColorTrainer.tsx`
- `colors-app.html` → `components/trainers/ColorsAppTrainer.tsx`
- `numbers-app.html` → `components/trainers/NumbersTrainer.tsx`
- `multiplication-app.html` → `components/trainers/MultiplicationTrainer.tsx`

**Как встроить тренажер:**
1. Открой HTML файл в браузере → скопируй всё содержимое
2. Создай `components/trainers/TrainerName.tsx`
3. Обрни HTML в React компонент:
```tsx
'use client';

export default function TrainerName() {
  return (
    <div className="card p-8">
      {/* HTML тренажера */}
    </div>
  );
}
```

### Создать страницы с тренажерами
- [ ] `app/trenazher/angliyskiy/page.tsx` — список англ. тренажеров
- [ ] `app/trenazher/angliyskiy/alfavit/page.tsx` — сам тренажер
- [ ] Аналогично для других предметов

### Генератор примеров
- ✅ API endpoint готов: `/api/generator/create`
- ✅ Страница генератора готова: `/generator/primery`
- [ ] Протестировать на localhost

## ДЕНЬ 5: ⏳ TODO

### Платежи (Заглушка на MVP)
- [ ] Добавить кнопку "Оформить подписку" на `/podpiska`
- [ ] При клике → редирект на `/payment-success` (демо)
- [ ] Создать fake платёж в БД для тестирования

### API для платежей (базовый)
```
POST /api/payment/create
Body: { userId, amount: 29900 }
Response: { success: true, redirectUrl: "/payment-success" }
```

## ДЕНЬ 6: ⏳ TODO

### Админка (минимальная)
- [ ] `/admin` — дашборд со статистикой
- [ ] `/admin/payments` — таблица платежей
- [ ] `/admin/users` — управление пользователями

### API для аналитики
- [ ] `GET /api/analytics/users` → { totalUsers, subscribers }
- [ ] `GET /api/analytics/payments` → список платежей

## ДЕНЬ 7: ⏳ TODO

### SEO и финиш
- [ ] Добавить мета-теги на каждую страницу
- [ ] Создать `sitemap.xml` и `robots.txt`
- [ ] Тестировать на localhost (npm run dev)
- [ ] Build: `npm run build && npm run start`

### Deploy на Vercel
```bash
git add .
git commit -m "MVP Release"
git push origin main

# На vercel.com:
1. Импортируй репо
2. Добавь DATABASE_URL
3. Deploy
```

---

## Быстрая проверка перед каждым днём

```bash
# 1. Проверить, что проект запускается
npm run dev

# 2. Открыть в браузере
http://localhost:3000

# 3. Проверить основные маршруты
- http://localhost:3000/            ← Главная
- http://localhost:3000/register    ← Регистрация
- http://localhost:3000/login       ← Логин
- http://localhost:3000/podpiska    ← Подписка
- http://localhost:3000/generator   ← Генератор
- http://localhost:3000/admin       ← Админка

# 4. Проверить консоль на ошибки
```

---

## Готовые компоненты (используй как base)

✅ **Layout & Navigation:**
- `app/layout.tsx` — главный layout
- `components/Navbar.tsx` — навигация
- `components/Footer.tsx` — подвал
- `components/SearchBar.tsx` — поиск

✅ **Pages:**
- `app/page.tsx` — главная
- `app/podpiska/page.tsx` — подписка
- `app/generator/page.tsx` — генератор
- `app/generator/primery/page.tsx` — генератор примеров
- `app/trenazher/page.tsx` — список тренажеров
- `app/admin/page.tsx` — админка

✅ **Auth:**
- `app/(auth)/register/page.tsx`
- `app/(auth)/login/page.tsx`
- `app/api/auth/register/route.ts`
- `app/api/auth/login/route.ts`
- `lib/auth.ts` — JWT & password hashing

✅ **Utils:**
- `lib/db.ts` — Prisma client
- `lib/generator.ts` — логика генератора
- `lib/constants.ts` — константы

---

## Что нужно сделать ПЕРВЫМ делом?

1. **Установи Node.js**
   ```bash
   brew install node
   node --version  # должен быть 18+
   ```

2. **Установи зависимости**
   ```bash
   cd /Users/olgalapina/Projects/My-site-Znatorica
   npm install
   ```

3. **Настрой БД**
   ```bash
   cp .env.example .env.local
   # Отредактируй DATABASE_URL
   npx prisma migrate dev --name init
   ```

4. **Запусти проект**
   ```bash
   npm run dev
   # Открой http://localhost:3000
   ```

5. **Проверь авторизацию**
   - Регистрация: http://localhost:3000/register
   - Логин: http://localhost:3000/login

---

## Статус MVP
- **Дата создания:** 2026-07-03
- **Версия:** 0.1.0-alpha
- **Готовность:** ~40% (структура готова, нужна разработка)
- **Срок финиша:** 2026-07-10 (неделя)

## Контакты

Если что-то не работает:
1. Проверь ошибку в консоли
2. Посмотри на `/ЗАДАНИЕ-ДЛЯ-CLAUDE-CODE.md` — там подробные инструкции
3. Спроси у Claude Code в терминале

---

**Удачи! 🚀**
