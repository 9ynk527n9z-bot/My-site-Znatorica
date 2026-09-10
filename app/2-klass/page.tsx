'use client';

import Link from 'next/link';
import { useState } from 'react';
import SegmentResourcesSection from '@/components/SegmentResourcesSection';

export default function Grade2Page() {
  const [activeSubject, setActiveSubject] = useState('matematika');

  const subjects = {
    matematika: {
      name: 'Математика',
      icon: '🔢',
      topics: [
        { slug: 'umnozhenie', title: 'Умножение', description: 'Основы умножения' },
        { slug: 'delenie', title: 'Деление', description: 'Делим числа' },
        { slug: 'dvuznachnye', title: 'Двузначные числа', description: 'Числа от 10 до 100' },
        { slug: 'sravnenie-chisel', title: 'Сравнение чисел', description: 'Больше, меньше или равно' },
        { slug: 'perimetr', title: 'Периметр', description: 'Сумма длин сторон прямоугольника и квадрата' },
      ],
    },
    russkiy: {
      name: 'Русский язык',
      icon: '📝',
      topics: [
        { slug: 'chasti-rechi', title: 'Части речи', description: 'Существительные, глаголы' },
        { slug: 'predlozhenie', title: 'Предложение', description: 'Структура предложения' },
        { slug: 'koren-slova', title: 'Корень слова', description: 'Общая часть родственных слов' },
        { slug: 'sinonimy-antonimy', title: 'Синонимы и антонимы', description: 'Слова, близкие по значению, и слова-противоположности' },
        { slug: 'bezudarnye-glasnye', title: 'Безударные гласные', description: 'Проверяем ударением' },
        { slug: 'shtrikhovka-i-graficheskie-diktanty', title: 'Штриховка и графические диктанты', description: 'Точность и аккуратность письма' },
      ],
    },
    okruzhayushchiy: {
      name: 'Окружающий мир',
      icon: '🌍',
      topics: [
        { slug: 'priroda', title: 'Природа', description: 'Растения, животные и природные сообщества' },
        { slug: 'chelovek', title: 'Человек', description: 'Здоровье и гигиена' },
      ],
    },
    logika: {
      name: 'Логика и мышление',
      icon: '🧩',
      topics: [
        { slug: 'logicheskie-zadachi', title: 'Логические задачи', description: 'Рассуждаем и делаем выводы' },
        { slug: 'rebusy', title: 'Ребусы', description: 'Разгадываем слова по картинкам и буквам' },
        { slug: 'zagadki', title: 'Загадки', description: 'Тренируем сообразительность на новом уровне' },
      ],
    },
  };

  return (
    <div className="segment-page-no-decor bg-[#28134f] min-h-screen">
      <div className="bg-gradient-to-r from-violet/20 to-orange/20 border-b border-[#2D2350] py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="text-orange hover:underline text-sm mb-4 inline-block">
            ← Назад
          </Link>
          <h1 className="text-3xl font-bold mb-4">📚 2 класс</h1>
          <p className="text-gray-400 text-xl max-w-2xl">
            Программа для второклассников: умножение, деление, части речи и окружающий мир
          </p>
        </div>
      </div>

      <div className="bg-[#1E1035] sticky top-0 z-10 border-b border-[#2D2350]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-0 overflow-x-auto">
            {Object.entries(subjects).map(([key, subject]) => (
              <button
                key={key}
                onClick={() => setActiveSubject(key)}
                className={`px-1.5 py-2 whitespace-nowrap font-bold text-xs border-b-2 transition-colors ${
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

      <div className="max-w-6xl mx-auto py-12 px-6">
        {/* Рендерим темы ВСЕХ предметов сразу (не только активной вкладки) —
            видна только активная (остальные скрыты через `hidden`), но
            ссылки на все темы присутствуют в HTML с первой загрузки. Иначе
            поисковик не находит темы неактивных вкладок — ссылок на них ни
            с одной другой проиндексированной страницы не было. */}
        {Object.entries(subjects).map(([key, subject]) => (
          <div key={key} className={activeSubject === key ? '' : 'hidden'}>
            <h2 className="text-3xl font-bold mb-8">{subject.name}</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {subject.topics.map((topic) => (
                <Link
                  key={topic.slug}
                  href={`/2-klass/${key}/${topic.slug}`}
                  className="group bg-amber-500/15 border border-[#2D2350] rounded-lg p-6 hover:border-orange hover:shadow-lg hover:shadow-orange/20 transition-all"
                >
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-orange transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-gray-400 text-base mb-4">{topic.description}</p>
                  <div className="flex gap-3 text-base">
                    <span className="bg-sky-400/30 text-sky-50 px-3 py-1 rounded">📝 Теория</span>
                    <span className="bg-emerald-500/35 text-emerald-50 px-3 py-1 rounded">🎮 Тренажёр</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <SegmentResourcesSection segmentId="2-klass" gradeTitle="2 класса" />
    </div>
  );
}
