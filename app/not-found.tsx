import Link from 'next/link';
import Image from 'next/image';
import SearchBar from '@/components/SearchBar';

// Страница 404. Раньше Next.js отдавал стандартную английскую заглушку
// «This page could not be found» — на детском русскоязычном сайте это выглядело
// как поломка. Здесь человек попадает не в тупик: есть поиск и переходы
// в основные разделы. Сам код ответа 404 Next проставляет сам.
export const metadata = {
  title: 'Страница не найдена',
  // Обязательно перекрываем robots из корневого layout: там стоит
  // index/follow, и без этой строки на странице оказывались два
  // противоречащих тега — noindex от Next и «index, follow» по наследству.
  robots: { index: false, follow: true },
};

const SECTIONS = [
  { href: '/', emoji: '🏠', label: 'На главную' },
  { href: '/trenazher', emoji: '🎮', label: 'Тренажёры' },
  { href: '/generator', emoji: '⚙️', label: 'Генераторы' },
  { href: '/igry', emoji: '🕹️', label: 'Игры' },
  { href: '/vpr', emoji: '📝', label: 'Подготовка к ВПР' },
  { href: '/dlya-roditeley', emoji: '👪', label: 'Статьи для родителей' },
];

export default function NotFound() {
  // Нижний отступ с запасом: снизу слева висит плавающая кнопка «Назад»,
  // без него она перекрывает нижний ряд плиток на телефоне.
  return (
    <div className="min-h-screen px-6 pt-16 pb-28">
      <div className="max-w-3xl mx-auto text-center">
        <Image
          src="/logo-face.png"
          alt="Белка Знатик"
          width={120}
          height={120}
          className="mx-auto mb-6 rounded-full"
        />

        <p className="text-6xl font-black text-[#FFD43B] mb-3">404</p>
        <h1 className="text-3xl font-bold mb-3">Такой страницы нет</h1>
        <p className="text-white/60 max-w-xl mx-auto mb-10">
          Знатик обыскал всё дупло, но страницу не нашёл. Возможно, в адресе опечатка
          или страница переехала. Попробуй найти нужное через поиск или загляни в разделы ниже.
        </p>

        <div className="mb-12">
          <SearchBar />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {SECTIONS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="card flex flex-col items-center text-center gap-1 hover:border-orange/60 hover:-translate-y-1 transition-all !p-4"
            >
              <span className="text-3xl">{s.emoji}</span>
              <span className="font-bold text-white text-sm">{s.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
