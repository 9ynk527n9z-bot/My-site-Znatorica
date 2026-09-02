import Link from 'next/link';
import TrainerGate from '@/components/TrainerGate';
import PageJsonLd from '@/components/PageJsonLd';
import PageAbout from '@/components/PageAbout';

export const metadata = {
  title: 'Сравнение чисел — тренажёр для 2 класса',
  description: 'Бесплатный интерактивный тренажёр на сравнение чисел: выбери знак больше, меньше или равно. Для 1–2 класса.',
  alternates: { canonical: '/trenazher/sravnenie' },
};

export default function SravnenieTrainerPage() {
  return (
    <div className="bg-black min-h-screen">
      <PageJsonLd metadata={metadata} section="trenazher" />
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4 flex items-center justify-between">
        <div>
          <Link href="/trenazher" className="text-orange hover:underline text-sm">
            ← Все тренажеры
          </Link>
          <h1 className="text-2xl font-bold mt-2">⚖️ Сравнение чисел</h1>
        </div>
      </div>

      <TrainerGate type="trainer:sravnenie">
        <div className="w-full h-[calc(100vh-100px)]">
          <iframe
            src="/primery-na-sravnenie.html"
            className="w-full h-full border-none"
            title="Сравнение чисел"
            sandbox="allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
          />
        </div>
      </TrainerGate>

      <PageAbout route="/trenazher/sravnenie" />
    </div>
  );
}
