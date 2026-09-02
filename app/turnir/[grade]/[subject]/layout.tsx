import type { Metadata } from 'next';
import { getTournamentTrack } from '@/lib/tournament';

// Сама страница турнира — клиентская ('use client'), поэтому экспортировать
// metadata оттуда нельзя. Без этого layout все 26 страниц турнира наследовали
// canonical и title главной, то есть просили Google не индексировать себя.
interface Props {
  params: { grade: string; subject: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const track = getTournamentTrack(`${params.grade}/${params.subject}`);
  const url = `/turnir/${params.grade}/${params.subject}`;
  if (!track) {
    return { title: 'Турнир Знаторики', alternates: { canonical: url } };
  }
  return {
    title: `Турнир: ${track.subjectLabel}, ${track.gradeLabel}`,
    description: `Бесплатный турнир по предмету «${track.subjectLabel}» для уровня «${track.gradeLabel}»: вопросы по ${track.topicCount} темам, результат сразу. Именной диплом — по желанию.`,
    alternates: { canonical: url },
  };
}

export default function TurnirTrackLayout({ children }: { children: React.ReactNode }) {
  return children;
}
