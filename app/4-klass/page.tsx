'use client';

import Link from 'next/link';
import { useState } from 'react';

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
      ],
    },
    russkiy: {
      name: 'Русский язык',
      icon: '📝',
      topics: [
        { slug: 'stili-rechi', title: 'Стили речи', description: 'Разные способы общения' },
        { slug: 'sintaksis', title: 'Синтаксис', description: 'Анализ предложений' },
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
  };

  const active = subjects[activeSubject as keyof typeof subjects];

  return (
    <div className="bg-black min-h-screen">
      <div className="bg-gradient-to-r from-violet/20 to-orange/20 border-b border-[#2D2350] py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="text-orange hover:underline text-sm mb-4 inline-block">
            ← Назад
          </Link>
          <h1 className="text-5xl font-bold mb-4">📚 4 класс</h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Завершение начальной школы: десятичные дроби, анализ литературы и углубленная грамматика
          </p>
        </div>
      </div>

      <div className="bg-[#0A0812] sticky top-0 z-10 border-b border-[#2D2350]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-4 overflow-x-auto">
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
              href={`/4-klass/${activeSubject}/${topic.slug}`}
              className="group bg-[#16102A] border border-[#2D2350] rounded-lg p-6 hover:border-orange hover:shadow-lg hover:shadow-orange/20 transition-all"
            >
              <h3 className="text-2xl font-bold mb-2 group-hover:text-orange transition-colors">
                {topic.title}
              </h3>
              <p className="text-gray-400 mb-4">{topic.description}</p>
              <div className="flex gap-3 text-sm">
                <span className="bg-orange/20 text-orange px-3 py-1 rounded">📝 Теория</span>
                <span className="bg-violet/20 text-violet px-3 py-1 rounded">🎮 Тренажер</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-[#16102A] border-t border-[#2D2350] py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">✨ Тренажеры для 4 класса</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Большие числа', icon: '1️⃣', desc: 'Тысячи и миллионы' },
              { title: 'Дроби', icon: '🔀', desc: 'Десятичные дроби' },
              { title: 'Геометрия', icon: '📐', desc: 'Площадь и периметр' },
            ].map((trainer, i) => (
              <button
                key={i}
                className="bg-[#0A0812] border border-[#2D2350] rounded-lg p-8 hover:border-orange transition-colors"
              >
                <div className="text-5xl mb-4">{trainer.icon}</div>
                <h3 className="text-xl font-bold mb-2">{trainer.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{trainer.desc}</p>
                <span className="text-orange font-bold">Играть →</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
