'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function AdminContentPage() {
  const [activeTab, setActiveTab] = useState<'segments' | 'subjects' | 'topics'>('segments');

  const segments = [
    { id: '1', slug: '4-5-let', name: '4–5 лет', topicsCount: 12 },
    { id: '2', slug: '6-7-let', name: '6–7 лет', topicsCount: 8 },
    { id: '3', slug: '1-klass', name: '1 класс', topicsCount: 6 },
  ];

  const subjects = [
    { id: '1', name: 'Математика', segment: '4-5 лет', topicsCount: 4 },
    { id: '2', name: 'Русский язык', segment: '4-5 лет', topicsCount: 2 },
    { id: '3', name: 'Развитие речи', segment: '4-5 лет', topicsCount: 2 },
  ];

  const topics = [
    { id: '1', title: 'Счёт до 5', subject: 'Математика', segment: '4-5 лет' },
    { id: '2', title: 'Счёт до 10', subject: 'Математика', segment: '4-5 лет' },
    { id: '3', title: 'Фигуры', subject: 'Математика', segment: '4-5 лет' },
  ];

  return (
    <div className="bg-black min-h-screen">
      <div className="bg-[#0A0812] border-b border-[#2D2350] px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Link href="/admin/dashboard" className="text-orange hover:underline">
            ← Назад в админку
          </Link>
          <h1 className="text-3xl font-bold">📚 Управление контентом</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-6">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-[#2D2350]">
          <button
            onClick={() => setActiveTab('segments')}
            className={`px-6 py-3 font-bold border-b-2 transition-colors ${
              activeTab === 'segments'
                ? 'border-orange text-orange'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Возрастные группы
          </button>
          <button
            onClick={() => setActiveTab('subjects')}
            className={`px-6 py-3 font-bold border-b-2 transition-colors ${
              activeTab === 'subjects'
                ? 'border-orange text-orange'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Предметы
          </button>
          <button
            onClick={() => setActiveTab('topics')}
            className={`px-6 py-3 font-bold border-b-2 transition-colors ${
              activeTab === 'topics'
                ? 'border-orange text-orange'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Темы
          </button>
        </div>

        {/* Content */}
        {activeTab === 'segments' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Возрастные группы</h2>
              <button className="bg-orange text-white font-bold px-6 py-2 rounded-lg hover:opacity-90">
                + Новая группа
              </button>
            </div>

            <div className="bg-[#16102A] border border-[#2D2350] rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-[#0A0812]">
                  <tr>
                    <th className="px-6 py-4 text-left text-gray-400 font-semibold">Название</th>
                    <th className="px-6 py-4 text-left text-gray-400 font-semibold">Slug</th>
                    <th className="px-6 py-4 text-left text-gray-400 font-semibold">Тем</th>
                    <th className="px-6 py-4 text-left text-gray-400 font-semibold">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {segments.map((segment) => (
                    <tr key={segment.id} className="border-t border-[#2D2350] hover:bg-[#0A0812]">
                      <td className="px-6 py-4 text-white font-bold">{segment.name}</td>
                      <td className="px-6 py-4 text-gray-400">/{segment.slug}/</td>
                      <td className="px-6 py-4 text-white">{segment.topicsCount}</td>
                      <td className="px-6 py-4">
                        <button className="text-orange hover:underline text-sm">Редактировать</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'subjects' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Предметы</h2>
              <button className="bg-orange text-white font-bold px-6 py-2 rounded-lg hover:opacity-90">
                + Новый предмет
              </button>
            </div>

            <div className="bg-[#16102A] border border-[#2D2350] rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-[#0A0812]">
                  <tr>
                    <th className="px-6 py-4 text-left text-gray-400 font-semibold">Название</th>
                    <th className="px-6 py-4 text-left text-gray-400 font-semibold">Группа</th>
                    <th className="px-6 py-4 text-left text-gray-400 font-semibold">Тем</th>
                    <th className="px-6 py-4 text-left text-gray-400 font-semibold">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((subject) => (
                    <tr key={subject.id} className="border-t border-[#2D2350] hover:bg-[#0A0812]">
                      <td className="px-6 py-4 text-white font-bold">{subject.name}</td>
                      <td className="px-6 py-4 text-gray-400">{subject.segment}</td>
                      <td className="px-6 py-4 text-white">{subject.topicsCount}</td>
                      <td className="px-6 py-4">
                        <button className="text-orange hover:underline text-sm">Редактировать</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'topics' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Темы</h2>
              <button className="bg-orange text-white font-bold px-6 py-2 rounded-lg hover:opacity-90">
                + Новая тема
              </button>
            </div>

            <div className="bg-[#16102A] border border-[#2D2350] rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-[#0A0812]">
                  <tr>
                    <th className="px-6 py-4 text-left text-gray-400 font-semibold">Название</th>
                    <th className="px-6 py-4 text-left text-gray-400 font-semibold">Предмет</th>
                    <th className="px-6 py-4 text-left text-gray-400 font-semibold">Группа</th>
                    <th className="px-6 py-4 text-left text-gray-400 font-semibold">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {topics.map((topic) => (
                    <tr key={topic.id} className="border-t border-[#2D2350] hover:bg-[#0A0812]">
                      <td className="px-6 py-4 text-white font-bold">{topic.title}</td>
                      <td className="px-6 py-4 text-gray-400">{topic.subject}</td>
                      <td className="px-6 py-4 text-gray-400">{topic.segment}</td>
                      <td className="px-6 py-4">
                        <button className="text-orange hover:underline text-sm">Редактировать</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
