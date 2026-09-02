import type { Metadata } from 'next';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';

// Микроразметка для страниц тренажёров и генераторов.
//
// Компонент намеренно принимает готовый объект metadata самой страницы, а не
// отдельные пропсы: title/description/canonical уже описаны в каждом layout.tsx,
// и дублировать их руками на 130+ страницах — верный способ развести расхождения.
// Так разметка всегда совпадает с тем, что видит поисковик в <head>.

const SECTIONS = {
  trenazher: { name: 'Тренажёры', url: '/trenazher' },
  generator: { name: 'Генераторы', url: '/generator' },
} as const;

// Уровень для LearningResource. Класс/возраст в заголовках указан не везде,
// поэтому вытаскиваем его из title, а при неудаче даём общую формулировку —
// пустое поле в разметке хуже, чем честное «начальная школа и дошкольники».
function guessLevel(title: string): string {
  // Диапазон проверяем раньше одиночного класса: в «для 2-4 класса» иначе
  // подхватилась бы только четвёрка, и уровень получился бы неверным.
  const range = title.match(/(\d)\s*[-–—]\s*(\d)\s*класс/i);
  if (range) return `${range[1]}–${range[2]} класс начальной школы`;
  const klass = title.match(/(\d)\s*класс/i);
  if (klass) return `${klass[1]} класс начальной школы`;
  const age = title.match(/(\d)\s*[-–—]\s*(\d)\s*лет/i);
  if (age) return `дошкольники ${age[1]}–${age[2]} лет`;
  return 'начальная школа и дошкольники';
}

export default function PageJsonLd({
  metadata,
  section,
}: {
  metadata: Metadata;
  section: keyof typeof SECTIONS;
}) {
  const canonical = metadata.alternates?.canonical;
  const url = typeof canonical === 'string' ? canonical : null;
  const title = typeof metadata.title === 'string' ? metadata.title : null;
  const description = typeof metadata.description === 'string' ? metadata.description : '';
  // Без канонического адреса или заголовка разметка получится битой — тогда
  // лучше не выводить её вовсе, чем отдать поисковику неполный объект.
  if (!url || !title) return null;

  const parent = SECTIONS[section];
  const blocks = [
    breadcrumbJsonLd([
      { name: 'Главная', url: '/' },
      { name: parent.name, url: parent.url },
      { name: title, url },
    ]),
    learningResourceJsonLd({
      name: title,
      description,
      url,
      educationalLevel: guessLevel(title),
    }),
  ];

  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
