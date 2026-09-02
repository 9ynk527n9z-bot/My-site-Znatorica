'use client';

import Link from 'next/link';
import { useState } from 'react';
import SegmentResourcesSection from '@/components/SegmentResourcesSection';

export default function Grade1Page() {
  const [activeSubject, setActiveSubject] = useState('matematika');

  const subjects = {
    matematika: {
      name: 'Математика',
      icon: '🔢',
      topics: [
        { slug: 'slozhenie-5-10', title: 'Сложение 5-10', description: 'Примеры в пределах 10' },
        { slug: 'vychitanie-5-10', title: 'Вычитание 5-10', description: 'Вычитаем в пределах 10' },
        { slug: 'slozhenie-do-20', title: 'Сложение и вычитание до 20', description: 'Приём «через десяток»: 8+5, 13-5' },
        { slug: 'zadachi', title: 'Задачи', description: 'Простые текстовые задачи' },
        { slug: 'sostav-chisla', title: 'Состав числа', description: 'Из каких частей складывается число' },
      ],
    },
    russkiy: {
      name: 'Русский язык',
      icon: '📝',
      topics: [
        { slug: 'pisanie', title: 'Письмо', description: 'Правильное написание' },
        { slug: 'punktuaciya', title: 'Пунктуация', description: 'Знаки препинания' },
        { slug: 'glasnye-i-soglasnye', title: 'Гласные и согласные', description: 'Учимся различать звуки и буквы' },
        { slug: 'udarenie', title: 'Ударение в слове', description: 'Какой слог произносим сильнее' },
        { slug: 'zhi-shi-cha-scha', title: 'Жи-ши, ча-ща, чу-щу', description: 'Главное орфографическое правило первого класса' },
        { slug: 'shtrikhovka-i-graficheskie-diktanty', title: 'Штриховка и графические диктанты', description: 'Тренируем руку перед письмом' },
      ],
    },
    chtenie: {
      name: 'Литературное чтение',
      icon: '📖',
      topics: [
        { slug: 'proza', title: 'Проза', description: 'Рассказы и повести' },
        { slug: 'stihi', title: 'Стихи', description: 'Поэтические произведения' },
      ],
    },
    logika: {
      name: 'Логика и мышление',
      icon: '🧩',
      topics: [
        { slug: 'analogii', title: 'Аналогии', description: 'Находим связи между словами' },
        { slug: 'orientaciya-v-prostranstve', title: 'Ориентация в пространстве', description: 'Лево, право, между, за' },
        { slug: 'zagadki', title: 'Загадки', description: 'Тренируем сообразительность' },
      ],
    },
    okruzhayushchiy: {
      name: 'Окружающий мир',
      icon: '🌍',
      topics: [
        { slug: 'zhivaya-i-nezhivaya-priroda', title: 'Живая и неживая природа', description: 'Учимся различать и приводить примеры' },
        { slug: 'pravila-bezopasnosti', title: 'Правила безопасности', description: 'Дорога, огонь и незнакомцы' },
      ],
    },
    angliyskiy: {
      name: 'Английский язык',
      icon: '🇬🇧',
      topics: [
        { slug: 'zhivotnye', title: 'Животные (Animals)', description: 'Первые английские слова о животных' },
        { slug: 'food', title: 'Еда (Food)', description: 'Первые английские слова о еде и напитках' },
        { slug: 'family', title: 'Семья (Family)', description: 'Первые английские слова о семье' },
        { slug: 'clothes', title: 'Одежда (Clothes)', description: 'Первые английские слова об одежде' },
        { slug: 'weather', title: 'Погода (Weather)', description: 'Первые английские слова о погоде' },
        { slug: 'school', title: 'Школьные принадлежности (School things)', description: 'Первые английские слова о школьных вещах' },
        { slug: 'alfavit', title: 'Алфавит (Alphabet)', description: 'Буквы английского алфавита с озвучкой', href: '/trenazher/angliyskiy-alfavit' },
      ],
    },
  };

  const active = subjects[activeSubject as keyof typeof subjects];

  return (
    <div className="bg-black min-h-screen">
      <div className="bg-gradient-to-r from-violet/20 to-orange/20 border-b border-[#2D2350] py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="text-orange hover:underline text-sm mb-4 inline-block">
            ← Назад
          </Link>
          <h1 className="text-5xl font-bold mb-4">📚 1 класс</h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Программа для первоклассников: развитие навыков чтения, письма и счёта
          </p>
        </div>
      </div>

      <div className="bg-[#1E1035] sticky top-0 z-10 border-b border-[#2D2350]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-4 overflow-x-auto pr-6">
            {Object.entries(subjects).map(([key, subject]) => (
              <button
                key={key}
                onClick={() => setActiveSubject(key)}
                className={`px-6 py-4 whitespace-nowrap font-bold border-b-2 transition-colors ${
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
        <h2 className="text-3xl font-bold mb-8">{active.name}</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {active.topics.map((topic) => (
            <Link
              key={topic.slug}
              href={'href' in topic && topic.href ? topic.href : `/1-klass/${activeSubject}/${topic.slug}`}
              className="group bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6 hover:border-orange hover:shadow-lg hover:shadow-orange/20 transition-all"
            >
              <h3 className="text-2xl font-bold mb-2 group-hover:text-orange transition-colors">
                {topic.title}
              </h3>
              <p className="text-gray-400 mb-4">{topic.description}</p>
              <div className="flex gap-3 text-sm">
                {!('href' in topic && topic.href) && (
                  <span className="bg-orange/20 text-orange px-3 py-1 rounded">📝 Теория</span>
                )}
                <span className="bg-violet/20 text-violet px-3 py-1 rounded">🎮 Тренажер</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <SegmentResourcesSection segmentId="1-klass" gradeTitle="1 класса" />
    </div>
  );
}
