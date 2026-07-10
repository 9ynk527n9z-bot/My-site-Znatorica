import Link from 'next/link';
import TrackPageView from '@/components/TrackPageView';

export const metadata = {
  title: 'Плакаты по предметам',
  description: 'Учебные плакаты для начальной школы. Математика, русский язык, окружающий мир.',
  alternates: { canonical: '/plakaty' },
};

const VALID_KLASS = ['2', '3', '4'];

export default function PlakatyPage({
  searchParams,
}: {
  searchParams: { klass?: string };
}) {
  const klass = searchParams.klass;
  const anchor = klass && VALID_KLASS.includes(klass) ? `#sec${klass}` : '';

  return (
    <div className="bg-black min-h-screen">
      <TrackPageView type="plakaty" />
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4 flex items-center justify-between">
        <div>
          <Link href="/" className="text-orange hover:underline text-sm">
            ← На главную
          </Link>
          <h1 className="text-2xl font-bold mt-2">🖼️ Плакаты по предметам</h1>
        </div>
      </div>

      <div className="w-full h-[calc(100vh-100px)]">
        <iframe
          src={`/plakaty.html${anchor}`}
          className="w-full h-full border-none"
          title="Плакаты по предметам"
          sandbox="allow-same-origin allow-scripts"
        />
      </div>
    </div>
  );
}
