import Link from 'next/link';

export const metadata = {
  title: 'Плакаты по предметам — Знаторика',
  description: 'Учебные плакаты для начальной школы. Математика, русский язык, окружающий мир.',
  alternates: { canonical: '/plakaty' },
};

export default function PlakatyPage() {
  return (
    <div className="bg-black min-h-screen">
      <div className="bg-[#0A0812] border-b border-[#2D2350] px-6 py-4 flex items-center justify-between">
        <div>
          <Link href="/" className="text-orange hover:underline text-sm">
            ← На главную
          </Link>
          <h1 className="text-2xl font-bold mt-2">🖼️ Плакаты по предметам</h1>
        </div>
      </div>

      <div className="w-full h-[calc(100vh-100px)]">
        <iframe
          src="/plakaty.html"
          className="w-full h-full border-none"
          title="Плакаты по предметам"
          sandbox="allow-same-origin allow-scripts"
        />
      </div>
    </div>
  );
}
