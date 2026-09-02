'use client';

import Link from 'next/link';
import { useState } from 'react';
import SegmentResourcesSection from '@/components/SegmentResourcesSection';

export default function Grade3Page() {
  const [activeSubject, setActiveSubject] = useState('matematika');

  const subjects = {
    matematika: {
      name: 'Математика',
      icon: '🔢',
      topics: [
        { slug: 'trekhznachnye', title: 'Трёхзначные числа', description: 'Числа от 100 до 1000' },
        { slug: 'slozhnie-primery', title: 'Сложные примеры', description: 'Примеры в столбик' },
        { slug: 'doli', title: 'Доли и дроби', description: 'Понимаем дроби' },
        { slug: 'ploshchad-perimetr', title: 'Площадь и периметр', description: 'Формулы для прямоугольника и квадрата' },
        { slug: 'uravneniya', title: 'Уравнения', description: 'Находим неизвестное число' },
        { slug: 'delenie-s-ostatkom', title: 'Деление с остатком', description: 'Когда числа не делятся нацело' },
        { slug: 'vnetablichnoe-umnozhenie', title: 'Внетабличное умножение и деление', description: 'Умножаем двузначное число на однозначное и делим подбором' },
      ],
    },
    russkiy: {
      name: 'Русский язык',
      icon: '📝',
      topics: [
        { slug: 'spryazhenie', title: 'Спряжение', description: 'Глаголы и их формы' },
        { slug: 'slozhnie-predlozheniya', title: 'Сложные предложения', description: 'Объединяем предложения' },
        { slug: 'razbor-slova-po-sostavu', title: 'Разбор слова по составу', description: 'Приставка, корень, суффикс, окончание' },
      ],
    },
    angliyskiy: {
      name: 'Английский язык',
      icon: '🌐',
      topics: [
        { slug: 'vocabulary', title: 'Словарь', description: 'Новые слова' },
        { slug: 'grammatika', title: 'Грамматика', description: 'Present, Past Simple' },
      ],
    },
    logika: {
      name: 'Логика и мышление',
      icon: '🧩',
      topics: [
        { slug: 'kombinatorika', title: 'Комбинаторика', description: 'Считаем количество вариантов' },
        { slug: 'zadachi-na-vzveshivanie', title: 'Задачи на взвешивание', description: 'Находим нужный предмет весами' },
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
          <h1 className="text-5xl font-bold mb-4">📚 3 класс</h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Программа для третьеклассников: сложные примеры, грамматика и иностранные языки
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
              href={`/3-klass/${activeSubject}/${topic.slug}`}
              className="group bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6 hover:border-orange hover:shadow-lg hover:shadow-orange/20 transition-all"
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

      <SegmentResourcesSection segmentId="3-klass" gradeTitle="3 класса" />
    </div>
  );
}
