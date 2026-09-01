import Link from 'next/link';
import TrainerGate from '@/components/TrainerGate';

export const metadata = {
  title: 'Неправильные глаголы английского — тренажёр',
  description: 'Бесплатный интерактивный тренажёр неправильных глаголов английского языка.',
  alternates: { canonical: '/trenazher/irregular-verbs' },
};

export default function IrregularVerbsTrainerPage() {
  return (
    <div className="bg-black min-h-screen">
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4 flex items-center justify-between">
        <div>
          <Link href="/trenazher" className="text-orange hover:underline text-sm">
            ← Все тренажеры
          </Link>
          <h1 className="text-2xl font-bold mt-2">🇬🇧 Неправильные глаголы</h1>
        </div>
      </div>

      <TrainerGate type="trainer:irregular-verbs">
        <div className="w-full h-[calc(100vh-100px)]">
          <iframe
            src="/irregular-verbs.html"
            className="w-full h-full border-none"
            title="Неправильные глаголы"
            sandbox="allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
          />
        </div>
      </TrainerGate>
    </div>
  );
}
