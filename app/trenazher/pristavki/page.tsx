import Link from 'next/link';
import TrainerGate from '@/components/TrainerGate';

export const metadata = {
  title: 'Приставки — тренажёр по русскому языку',
  description: 'Бесплатный интерактивный тренажёр по приставкам русского языка.',
  alternates: { canonical: '/trenazher/pristavki' },
};

export default function PristavkiTrainerPage() {
  return (
    <div className="bg-black min-h-screen">
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4 flex items-center justify-between">
        <div>
          <Link href="/trenazher" className="text-orange hover:underline text-sm">
            ← Все тренажеры
          </Link>
          <h1 className="text-2xl font-bold mt-2">📝 Приставки</h1>
        </div>
      </div>

      <TrainerGate type="trainer:pristavki">
        <div className="w-full h-[calc(100vh-100px)]">
          <iframe
            src="/pristavki.html"
            className="w-full h-full border-none"
            title="Приставки"
            sandbox="allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
          />
        </div>
      </TrainerGate>
    </div>
  );
}
