'use client';

import { useState } from 'react';

export default function GeneratorPrimeryPage() {
  const [operation, setOperation] = useState<'+' | '-' | '*'>('+');
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(10);
  const [count, setCount] = useState(20);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    try {
      const res = await fetch('/api/generator/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'primery',
          params: { operation, min: parseInt(min.toString()), max: parseInt(max.toString()), count: parseInt(count.toString()) },
        }),
      });

      if (!res.ok) throw new Error('Ошибка генерации');

      const data = await res.json();
      setResult(data.html);
    } catch (error) {
      alert('Ошибка при генерации');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-black min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Генератор примеров</h1>

        {/* Controls */}
        <div className="card mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {/* Operation */}
            <div>
              <label className="block text-sm font-medium mb-2">Операция</label>
              <select
                value={operation}
                onChange={(e) => setOperation(e.target.value as any)}
                className="w-full px-4 py-2 rounded-lg bg-black border border-[#2D2350] focus:border-orange transition-colors"
              >
                <option value="+">Сложение (+)</option>
                <option value="-">Вычитание (−)</option>
                <option value="*">Умножение (×)</option>
              </select>
            </div>

            {/* Min */}
            <div>
              <label className="block text-sm font-medium mb-2">От</label>
              <input
                type="number"
                value={min}
                onChange={(e) => setMin(parseInt(e.target.value))}
                className="w-full px-4 py-2 rounded-lg bg-black border border-[#2D2350] focus:border-orange transition-colors"
              />
            </div>

            {/* Max */}
            <div>
              <label className="block text-sm font-medium mb-2">До</label>
              <input
                type="number"
                value={max}
                onChange={(e) => setMax(parseInt(e.target.value))}
                className="w-full px-4 py-2 rounded-lg bg-black border border-[#2D2350] focus:border-orange transition-colors"
              />
            </div>

            {/* Count */}
            <div>
              <label className="block text-sm font-medium mb-2">Кол-во</label>
              <input
                type="number"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value))}
                className="w-full px-4 py-2 rounded-lg bg-black border border-[#2D2350] focus:border-orange transition-colors"
              />
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? 'Генерирую...' : 'Создать примеры'}
          </button>
        </div>

        {/* Result */}
        {result && (
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Результат</h2>
            <div
              className="bg-black p-6 rounded-lg border border-[#2D2350] text-sm font-mono whitespace-pre-wrap overflow-auto max-h-96"
              dangerouslySetInnerHTML={{ __html: result }}
            />
            <button
              onClick={() => window.print()}
              className="btn-secondary mt-6 w-full"
            >
              🖨️ Печать
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
