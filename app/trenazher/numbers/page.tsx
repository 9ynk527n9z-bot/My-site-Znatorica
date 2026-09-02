import Link from 'next/link';
import TrainerGate from '@/components/TrainerGate';
import PageJsonLd from '@/components/PageJsonLd';
import PageAbout from '@/components/PageAbout';

export const metadata = {
  title: 'Числа по-английски 1–20 — интерактивный тренажёр',
  description: 'Бесплатный тренажёр английских числительных от 1 до 20: слово, перевод и простые примеры на сложение. Для детей 5–9 лет.',
  alternates: { canonical: '/trenazher/numbers' },
};

export default function NumbersTrainerPage() {
  return (
    <div className="bg-black min-h-screen">
      <PageJsonLd metadata={metadata} section="trenazher" />
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4 flex items-center justify-between">
        <div>
          <Link href="/trenazher" className="text-orange hover:underline text-sm">
            ← Все тренажеры
          </Link>
          <h1 className="text-2xl font-bold mt-2">1️⃣ Числа по-английски</h1>
        </div>
      </div>

      <TrainerGate type="trainer:numbers">
        <div className="w-full h-[calc(100vh-100px)]">
          <iframe
            src="/numbers-app.html"
            className="w-full h-full border-none"
            title="Числа"
            sandbox="allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
          />
        </div>
      </TrainerGate>

      <PageAbout route="/trenazher/numbers" />
    </div>
  );
}
