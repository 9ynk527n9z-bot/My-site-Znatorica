'use client';

import Link from 'next/link';
import { useState } from 'react';
import SegmentResourcesSection from '@/components/SegmentResourcesSection';

export default function Grade4Page() {
  const [activeSubject, setActiveSubject] = useState('matematika');

  const subjects = {
    matematika: {
      name: 'Математика',
      icon: '🔢',
      topics: [
        { slug: 'velikie-chisla', title: 'Большие числа', description: 'Числа от 1000' },
        { slug: 'desyatichnie-drobi', title: 'Десятичные дроби', description: 'Работаем с запятой' },
        { slug: 'geometriya', title: 'Геометрия', description: 'Фигуры и объёмы' },
        { slug: 'poryadok-deystviy', title: 'Порядок действий', description: 'В каком порядке решать пример' },
        { slug: 'skorost-vremya-rasstoyanie', title: 'Задачи на движение', description: 'Скорость, время, расстояние' },
        { slug: 'edinitsy-izmereniya', title: 'Единицы измерения', description: 'Переводим км, кг, часы и минуты' },
        { slug: 'umnozhenie-delenie-stolbikom', title: 'Умножение и деление столбиком', description: 'Письменные вычисления по разрядам' },
      ],
    },
    russkiy: {
      name: 'Русский язык',
      icon: '📝',
      topics: [
        { slug: 'stili-rechi', title: 'Стили речи', description: 'Разные способы общения' },
        { slug: 'sintaksis', title: 'Синтаксис', description: 'Анализ предложений' },
        { slug: 'sklonenie-suschestvitelnykh', title: 'Склонение существительных', description: 'Падежи и их окончания' },
      ],
    },
    literatura: {
      name: 'Литература',
      icon: '📖',
      topics: [
        { slug: 'klassika', title: 'Классика', description: 'Великие произведения' },
        { slug: 'analiz-teksta', title: 'Анализ текста', description: 'Разбираем произведения' },
      ],
    },
    logika: {
      name: 'Логика и мышление',
      icon: '🧩',
      topics: [
        { slug: 'logicheskie-tablitsy', title: 'Логические задачи с таблицами', description: 'Решаем методом таблицы' },
        { slug: 'zadachi-na-perelivanie', title: 'Задачи на переливание', description: 'Отмеряем нужный объём воды' },
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
          <h1 className="text-3xl font-bold mb-4">📚 4 класс</h1>
          <p className="text-gray-400 text-xl max-w-2xl">
            Завершение начальной школы: десятичные дроби, анализ литературы и углубленная грамматика
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
                className={`px-3 py-3 whitespace-nowrap font-bold text-sm border-b-2 transition-colors ${
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
                  href={`/4-klass/${key}/${topic.slug}`}
                  className="group bg-lime-400/20 border border-[#2D2350] rounded-lg p-6 hover:border-orange hover:shadow-lg hover:shadow-orange/20 transition-all"
                >
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-orange transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-gray-400 text-base mb-4">{topic.description}</p>
                  <div className="flex gap-3 text-base">
                    <span className="bg-cyan-400/30 text-cyan-50 px-3 py-1 rounded">📝 Теория</span>
                    <span className="bg-pink-500/35 text-pink-50 px-3 py-1 rounded">🎮 Тренажёр</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#2A1B4D] border-t border-[#2D2350] py-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">🎓 Готов ли ребёнок к 5 классу?</h2>
          <p className="text-gray-400 mb-6">
            Тест на закрепление базы 4 класса и чек-лист для родителя про самостоятельность перед переходом на
            кабинетную систему, с разбором по направлениям.
          </p>
          <Link href="/gotovnost-k-5-klassu" className="btn-primary inline-block px-8 py-3">
            Пройти тест →
          </Link>
        </div>
      </div>

      <SegmentResourcesSection segmentId="4-klass" gradeTitle="4 класса" />
    </div>
  );
}
