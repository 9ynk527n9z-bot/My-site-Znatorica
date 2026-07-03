import Link from 'next/link';

export const metadata = {
  title: 'Генераторы заданий',
  description: 'Создай примеры, прописи, кроссворды и другие задания',
};

export default function GeneratorPage() {
  return (
    <div className="bg-black min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Генераторы заданий</h1>
        <p className="text-center text-gray-400 mb-12">
          10 раз бесплатно в день. Без лимита по подписке.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Примеры */}
          <Link
            href="/generator/primery"
            className="card hover:border-orange transition-colors group"
          >
            <h3 className="text-2xl font-bold mb-2 group-hover:text-orange">
              📊 Примеры
            </h3>
            <p className="text-gray-400 mb-4">
              Создай примеры на сложение, вычитание или умножение
            </p>
            <div className="flex gap-2 text-xs">
              <span className="bg-orange/20 text-orange px-2 py-1 rounded">
                +
              </span>
              <span className="bg-orange/20 text-orange px-2 py-1 rounded">
                −
              </span>
              <span className="bg-orange/20 text-orange px-2 py-1 rounded">
                ×
              </span>
            </div>
          </Link>

          {/* Прописи */}
          <Link
            href="/generator/propisi"
            className="card hover:border-orange transition-colors group"
          >
            <h3 className="text-2xl font-bold mb-2 group-hover:text-orange">
              ✏️ Прописи
            </h3>
            <p className="text-gray-400 mb-4">
              Прописи букв для улучшения почерка
            </p>
            <div className="flex gap-2 text-xs">
              <span className="bg-orange/20 text-orange px-2 py-1 rounded">
                Заглавные
              </span>
              <span className="bg-orange/20 text-orange px-2 py-1 rounded">
                Строчные
              </span>
            </div>
          </Link>

          {/* Кроссворды */}
          <div className="card opacity-50">
            <h3 className="text-2xl font-bold mb-2">🔤 Кроссворды</h3>
            <p className="text-gray-400 mb-4">
              Интерактивные кроссворды по темам (скоро)
            </p>
            <span className="inline-block bg-gray-700/50 text-gray-300 px-2 py-1 rounded text-xs">
              Скоро
            </span>
          </div>

          {/* Диктанты */}
          <div className="card opacity-50">
            <h3 className="text-2xl font-bold mb-2">🎤 Диктанты</h3>
            <p className="text-gray-400 mb-4">
              Наборы слов для диктовки (скоро)
            </p>
            <span className="inline-block bg-gray-700/50 text-gray-300 px-2 py-1 rounded text-xs">
              Скоро
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
