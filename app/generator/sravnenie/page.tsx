import Link from 'next/link';

export const metadata = {
  title: 'Генератор примеров на сравнение чисел',
  description: 'Создавайте примеры на сравнение чисел (больше, меньше, равно).',
  alternates: { canonical: '/generator/sravnenie' },
};

export default function SravnenieGeneratorPage() {
  return (
    <div className="bg-black min-h-screen">
      <div className="bg-[#0A0812] border-b border-[#2D2350] px-6 py-4 flex items-center justify-between">
        <div>
          <Link href="/generator" className="text-orange hover:underline text-sm">
            ← Все генераторы
          </Link>
          <h1 className="text-2xl font-bold mt-2">⚖️ Примеры на сравнение</h1>
        </div>
      </div>

      <div className="w-full h-[calc(100vh-100px)]">
        <iframe
          src="/primery-na-sravnenie.html"
          className="w-full h-full border-none"
          title="Примеры на сравнение"
          sandbox="allow-same-origin allow-scripts"
        />
      </div>
    </div>
  );
}
