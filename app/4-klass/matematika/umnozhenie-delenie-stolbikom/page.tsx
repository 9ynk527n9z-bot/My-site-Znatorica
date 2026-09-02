import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Умножение и деление столбиком — математика для 4 класса',
  description: 'Учимся умножать и делить многозначные числа столбиком: пошаговые примеры с разбором каждого действия.',
  alternates: { canonical: '/4-klass/matematika/umnozhenie-delenie-stolbikom' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '4 класс', url: '/4-klass' },
  { name: 'Математика', url: '/4-klass' },
  { name: 'Умножение и деление столбиком', url: '/4-klass/matematika/umnozhenie-delenie-stolbikom' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Умножение и деление столбиком',
  description: 'Письменные приёмы умножения и деления многозначных чисел',
  url: '/4-klass/matematika/umnozhenie-delenie-stolbikom',
  educationalLevel: '4 класс начальной школы',
});

export default function UmnozhenieDelenieStolbikomPage() {
  return (
    <div className="bg-black min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResource) }} />

      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4">
        <div className="max-w-6xl mx-auto flex gap-2 text-sm">
          <Link href="/" className="text-amber-400 hover:underline">Главная</Link>
          <span className="text-gray-400">/</span>
          <Link href="/4-klass" className="text-amber-400 hover:underline">4 класс</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Умножение и деление столбиком</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Умножение и деление столбиком</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-amber-400 font-bold text-white">📝 Теория</button>
          <Link
            href="/trenazher/umnozhenie-delenie-stolbikom-4klass"
            className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors"
          >
            🎮 Тренажер
          </Link>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Умножение столбиком</h2>
          <div className="space-y-4 text-lg text-gray-300">
            <p>
              Когда числа большие, умножать в уме неудобно. Тогда числа записывают одно под другим (в столбик)
              и умножают по разрядам — начиная с единиц.
            </p>
            <ol className="list-decimal list-inside space-y-2">
              <li>Записываем многозначное число сверху, однозначное (или двузначное) — снизу, разряд под разрядом.</li>
              <li>Умножаем нижнее число сначала на цифру единиц верхнего числа, потом на десятки, потом на сотни — справа налево.</li>
              <li>Если при умножении разряда получается число больше 9, лишний десяток «переносим» в следующий разряд.</li>
              <li>Складываем все промежуточные результаты (при умножении на двузначное число).</li>
            </ol>
          </div>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Пример 1: умножение на однозначное число</h2>
          <p className="text-gray-300 mb-4">234 × 3 = ?</p>
          <pre className="bg-black/50 rounded-lg p-4 text-xl font-mono overflow-x-auto mb-4">
{`    234
  ×   3
  -----
    702`}
          </pre>
          <div className="space-y-2 text-gray-300">
            <p><span className="text-amber-400 font-bold">Шаг 1.</span> Единицы: 4 × 3 = 12. Пишем 2, запоминаем 1 (переносим в десятки).</p>
            <p><span className="text-amber-400 font-bold">Шаг 2.</span> Десятки: 3 × 3 = 9, плюс перенесённая 1, получаем 10. Пишем 0, запоминаем 1 (переносим в сотни).</p>
            <p><span className="text-amber-400 font-bold">Шаг 3.</span> Сотни: 2 × 3 = 6, плюс перенесённая 1, получаем 7. Пишем 7.</p>
            <p className="text-amber-400 font-bold">Ответ: 234 × 3 = 702</p>
          </div>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Пример 2: умножение на двузначное число</h2>
          <p className="text-gray-300 mb-4">126 × 23 = ?</p>
          <pre className="bg-black/50 rounded-lg p-4 text-xl font-mono overflow-x-auto mb-4">
{`     126
   ×  23
   -----
     378   (126 × 3)
  + 2520   (126 × 20)
   -----
    2898`}
          </pre>
          <div className="space-y-2 text-gray-300">
            <p><span className="text-amber-400 font-bold">Шаг 1.</span> Умножаем 126 на 3 (единицы числа 23): 126 × 3 = 378.</p>
            <p><span className="text-amber-400 font-bold">Шаг 2.</span> Умножаем 126 на 2 (десятки числа 23), но помним, что это на самом деле 20: 126 × 20 = 2520. Записываем этот результат со сдвигом на один разряд влево (как будто дописан ноль).</p>
            <p><span className="text-amber-400 font-bold">Шаг 3.</span> Складываем оба результата: 378 + 2520 = 2898.</p>
            <p className="text-amber-400 font-bold">Ответ: 126 × 23 = 2898</p>
          </div>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Деление столбиком (деление уголком)</h2>
          <div className="space-y-4 text-lg text-gray-300">
            <p>
              При делении столбиком мы разбиваем делимое на части, начиная со старшего разряда, и делим каждую часть отдельно.
            </p>
            <ol className="list-decimal list-inside space-y-2">
              <li>Смотрим, сколько раз делитель помещается в первую (старшую) часть делимого.</li>
              <li>Умножаем частное на делитель и вычитаем из этой части — получаем остаток.</li>
              <li>«Сносим» следующую цифру делимого к остатку и повторяем деление.</li>
              <li>Так продолжаем, пока не разделим все цифры делимого.</li>
            </ol>
          </div>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Пример 1: деление на однозначное число</h2>
          <p className="text-gray-300 mb-4">936 ÷ 4 = ?</p>
          <pre className="bg-black/50 rounded-lg p-4 text-xl font-mono overflow-x-auto mb-4">
{`  936 | 4
  8   |---
  --  | 234
   13
    12
    --
     16
     16
     --
      0`}
          </pre>
          <div className="space-y-2 text-gray-300">
            <p><span className="text-amber-400 font-bold">Шаг 1.</span> Берём первую цифру 9 (сотни). 9 ÷ 4 = 2, остаток 1 (2 × 4 = 8, 9 − 8 = 1). Первая цифра частного — 2.</p>
            <p><span className="text-amber-400 font-bold">Шаг 2.</span> Сносим следующую цифру 3, получаем 13. 13 ÷ 4 = 3, остаток 1 (3 × 4 = 12, 13 − 12 = 1). Вторая цифра частного — 3.</p>
            <p><span className="text-amber-400 font-bold">Шаг 3.</span> Сносим последнюю цифру 6, получаем 16. 16 ÷ 4 = 4, остаток 0 (4 × 4 = 16). Третья цифра частного — 4.</p>
            <p className="text-amber-400 font-bold">Ответ: 936 ÷ 4 = 234</p>
          </div>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Пример 2: деление на однозначное число (с нулём в частном)</h2>
          <p className="text-gray-300 mb-4">824 ÷ 8 = ?</p>
          <pre className="bg-black/50 rounded-lg p-4 text-xl font-mono overflow-x-auto mb-4">
{`  824 | 8
  8   |---
  --  | 103
   02
    0
    --
     24
     24
     --
      0`}
          </pre>
          <div className="space-y-2 text-gray-300">
            <p><span className="text-amber-400 font-bold">Шаг 1.</span> Берём первую цифру 8 (сотни). 8 ÷ 8 = 1, остаток 0. Первая цифра частного — 1.</p>
            <p><span className="text-amber-400 font-bold">Шаг 2.</span> Сносим следующую цифру 2, получаем 2. Число 2 меньше делителя 8, значит делим 2 на 8 — получаем 0. Вторая цифра частного — 0. Остаток остаётся 2.</p>
            <p><span className="text-amber-400 font-bold">Шаг 3.</span> Сносим последнюю цифру 4, получаем 24. 24 ÷ 8 = 3, остаток 0. Третья цифра частного — 3.</p>
            <p className="text-amber-400 font-bold">Ответ: 824 ÷ 8 = 103</p>
            <p className="text-gray-400 text-base">
              Важно не забывать писать 0 в частном, если очередная часть делимого меньше делителя — иначе разряды «съедутся».
            </p>
          </div>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Попробуй сам</h2>
          <div className="space-y-4 text-lg">
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">312 × 4 = ?</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-amber-400 font-bold select-none">Показать решение</summary>
                <p className="text-gray-300 mt-2">
                  Единицы: 2 × 4 = 8. Десятки: 1 × 4 = 4. Сотни: 3 × 4 = 12, пишем 12. Ответ: 312 × 4 = 1248.
                </p>
              </details>
            </div>
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">846 ÷ 6 = ?</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-amber-400 font-bold select-none">Показать решение</summary>
                <p className="text-gray-300 mt-2">
                  8 ÷ 6 = 1, остаток 2. Сносим 4 → 24, 24 ÷ 6 = 4, остаток 0. Сносим 6, 6 ÷ 6 = 1. Ответ: 846 ÷ 6 = 141.
                </p>
              </details>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-400/20 to-purple-600/20 border border-amber-400 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Готов тренироваться?</h3>
          <p className="text-gray-300 mb-6">
            Умножение и деление столбиком — база для всех вычислений в средней школе. Чем больше практики, тем увереннее счёт.
          </p>
          <Link href="/trenazher/umnozhenie-delenie-stolbikom-4klass" className="btn-primary text-lg px-8 py-4 inline-block">
            🎮 Открыть тренажер
          </Link>
        </div>

        <TopicQuiz topic="4-klass/matematika/umnozhenie-delenie-stolbikom" />
      </div>
    </div>
  );
}
