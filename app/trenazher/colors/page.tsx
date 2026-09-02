import Link from 'next/link';
import TrainerGate from '@/components/TrainerGate';
import PageJsonLd from '@/components/PageJsonLd';
import PageAbout from '@/components/PageAbout';

export const metadata = {
  title: 'Цвета по-английски — тренажёр с транскрипцией',
  description: 'Бесплатный тренажёр английских названий цветов: слово, перевод и транскрипция. Red, blue, green и другие цвета для детей 4–8 лет.',
  alternates: { canonical: '/trenazher/colors' },
};

export default function ColorsTrainerPage() {
  return (
    <div className="bg-black min-h-screen">
      <PageJsonLd metadata={metadata} section="trenazher" />
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4 flex items-center justify-between">
        <div>
          <Link href="/trenazher" className="text-orange hover:underline text-sm">
            ← Все тренажеры
          </Link>
          <h1 className="text-2xl font-bold mt-2">🌈 Цвета по-английски</h1>
        </div>
      </div>

      <TrainerGate type="trainer:colors">
        <div className="w-full h-[calc(100vh-100px)]">
          <iframe
            src="/color-trainer.html"
            className="w-full h-full border-none"
            title="Цвета"
            sandbox="allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
          />
        </div>
      </TrainerGate>

      <PageAbout route="/trenazher/colors" />
    </div>
  );
}
