import Link from 'next/link';
import TrackPageView from '@/components/TrackPageView';

export const metadata = {
  title: 'Генератор примеров по математике — деление, столбик',
  description: 'Создавайте примеры на вычитание, деление и счёт в столбик.',
  alternates: { canonical: '/generator/math' },
};

export default function MathGeneratorPage() {
  return (
    <div className="bg-black min-h-screen">
      <TrackPageView type="generator:math" />
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4 flex items-center justify-between">
        <div>
          <Link href="/generator" className="text-orange hover:underline text-sm">
            ← Все генераторы
          </Link>
          <h1 className="text-2xl font-bold mt-2">🧮 Генератор примеров (деление, столбик)</h1>
        </div>
      </div>

      <div className="w-full h-[calc(100vh-100px)]">
        <iframe
          src="/math-generator.html"
          className="w-full h-full border-none"
          title="Генератор примеров"
          sandbox="allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
        />
      </div>
    </div>
  );
}
