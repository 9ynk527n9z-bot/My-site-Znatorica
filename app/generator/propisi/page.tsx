import Link from 'next/link';
import TrackPageView from '@/components/TrackPageView';

export const metadata = {
  title: 'Генератор прописей — английский язык',
  description: 'Создавайте прописи английских букв для улучшения почерка.',
  alternates: { canonical: '/generator/propisi' },
};

export default function PropisiGeneratorPage() {
  return (
    <div className="bg-black min-h-screen">
      <TrackPageView type="generator:propisi" />
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4 flex items-center justify-between">
        <div>
          <Link href="/generator" className="text-orange hover:underline text-sm">
            ← Все генераторы
          </Link>
          <h1 className="text-2xl font-bold mt-2">✏️ Прописи (английский)</h1>
        </div>
      </div>

      <div className="w-full h-[calc(100vh-100px)]">
        <iframe
          src="/propisi.html"
          className="w-full h-full border-none"
          title="Генератор прописей"
          sandbox="allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
        />
      </div>
    </div>
  );
}
