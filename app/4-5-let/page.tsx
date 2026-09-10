'use client';

import Link from 'next/link';
import { useState } from 'react';
import SegmentResourcesSection from '@/components/SegmentResourcesSection';

export default function Segment4To5Page() {
  const [activeSubject, setActiveSubject] = useState('matematika');

  const subjects = {
    matematika: {
      name: 'Математика',
      icon: '🔢',
      topics: [
        { slug: 'schet-do-5', title: 'Счёт до 5', description: 'Основы счёта' },
        { slug: 'schet-do-10', title: 'Счёт до 10', description: 'Усовершенствуем навыки' },
        { slug: 'figury', title: 'Фигуры', description: 'Круг, квадрат, треугольник' },
        { slug: 'tsveta', title: 'Цвета и размеры', description: 'Учимся различать' },
      ],
    },
    razvitie: {
      name: 'Развитие речи',
      icon: '🗣️',
      topics: [
        { slug: 'zvuki', title: 'Звуки', description: 'Слышим и говорим' },
        { slug: 'slova', title: 'Слова', description: 'Словарный запас' },
        { slug: 'pereskaz-po-kartinkam', title: 'Пересказ по картинкам', description: 'Составляем историю по картинке' },
      ],
    },
    gramota: {
      name: 'Грамота',
      icon: '📖',
      topics: [
        { slug: 'bukvy', title: 'Буквы', description: 'Алфавит' },
        { slug: 'slogov', title: 'Слоги', description: 'Учимся читать слоги' },
        { slug: 'shtrikhovka-i-graficheskie-diktanty', title: 'Штриховка и графические диктанты', description: 'Тренируем руку перед письмом' },
      ],
    },
    logika: {
      name: 'Логика и мышление',
      icon: '🧩',
      topics: [
        { slug: 'naydi-lishnee', title: 'Найди лишнее', description: 'Учимся находить общее и лишнее' },
        { slug: 'sravnenie-predmetov', title: 'Сравнение предметов', description: 'Больше-меньше, одинаковое-разное' },
        { slug: 'zagadki', title: 'Загадки', description: 'Простые загадки для малышей' },
      ],
    },
    okruzhayushchiy: {
      name: 'Окружающий мир',
      icon: '🌍',
      topics: [
        { slug: 'vremena-goda', title: 'Времена года', description: 'Зима, весна, лето, осень' },
        { slug: 'domashnie-i-dikie-zhivotnye', title: 'Домашние и дикие животные', description: 'Кто живёт рядом с человеком, а кто в лесу' },
      ],
    },
  };

  return (
    <div className="segment-page-no-decor bg-[#28134f] min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet/20 to-orange/20 border-b border-[#2D2350] py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="text-orange hover:underline text-sm mb-4 inline-block">
            ← Назад
          </Link>
          <h1 className="text-3xl font-bold mb-4">🎈 Дошкольники 4–5 лет</h1>
          <p className="text-gray-400 text-xl max-w-2xl">
            Занятия, развивающие основные навыки: счёт, речь, грамота, творчество и логика
          </p>
        </div>
      </div>

      {/* Subject Navigation */}
      <div className="bg-[#1E1035] sticky top-0 z-10 border-b border-[#2D2350]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap gap-1">
            {Object.entries(subjects).map(([key, subject]) => (
              <button
                key={key}
                onClick={() => setActiveSubject(key)}
                className={`px-4 py-3 whitespace-nowrap font-bold text-base border-b-2 transition-colors ${
                  activeSubject === key
                    ? 'border-orange text-orange'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                {subject.icon} {subject.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Topics Grid — рендерим темы ВСЕХ предметов сразу (не только активной
          вкладки), видна только активная (остальные скрыты через `hidden`),
          но ссылки на все темы присутствуют в HTML с первой загрузки. Иначе
          поисковик не находит темы неактивных вкладок — ссылок на них ни с
          одной другой проиндексированной страницы не было. */}
      <div className="max-w-6xl mx-auto py-12 px-6">
        {Object.entries(subjects).map(([key, subject]) => (
          <div key={key} className={activeSubject === key ? '' : 'hidden'}>
            <h2 className="text-3xl font-bold mb-8">{subject.name}</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {subject.topics.map((topic) => (
                <Link
                  key={topic.slug}
                  href={`/4-5-let/${key}/${topic.slug}`}
                  className="group bg-teal-500/20 border border-[#2D2350] rounded-lg p-6 hover:border-orange hover:shadow-lg hover:shadow-orange/20 transition-all"
                >
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-orange transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-gray-400 text-base mb-4">{topic.description}</p>
                  <div className="flex gap-3 text-base">
                    <span className="bg-amber-400/35 text-amber-50 px-3 py-1 rounded">📝 Теория</span>
                    <span className="bg-rose-500/45 text-rose-50 px-3 py-1 rounded">🎮 Тренажёр</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <SegmentResourcesSection segmentId="4-5-let" gradeTitle="4–5 лет" />
    </div>
  );
}
