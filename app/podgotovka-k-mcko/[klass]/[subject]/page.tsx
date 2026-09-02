import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { breadcrumbJsonLd, shortSubject } from '@/lib/seo';
import { getMckoData, getAllMckoSubjectParams, MCKO_KLASSES } from '@/lib/mcko';

interface Props {
  params: { klass: string; subject: string };
}

export function generateStaticParams() {
  return getAllMckoSubjectParams();
}

export function generateMetadata({ params }: Props): Metadata {
  const data = getMckoData(params.klass, params.subject);
  if (!data) return {};
  return {
    title: `МЦКО${data.year ? ` ${data.year}` : ''}: ${shortSubject(data.subjectTitle)}, ${data.grade} класс — ${data.variants.length} вариантов`,
    description: `${data.variants.length} авторских вариантов МЦКО с ответами по предмету «${data.subjectTitle}» для ${data.grade} класса. Решай онлайн с самопроверкой или распечатай на бумаге.`,
    alternates: { canonical: `/podgotovka-k-mcko/${params.klass}/${params.subject}` },
  };
}

export default function MckoSubjectPage({ params }: Props) {
  const data = getMckoData(params.klass, params.subject);
  if (!data) notFound();

  const klassInfo = MCKO_KLASSES.find((k) => k.slug === params.klass);

  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Главная', url: '/' },
    { name: 'Подготовка к МЦКО', url: '/podgotovka-k-mcko' },
    { name: `${data.subjectTitle}, ${data.grade} класс`, url: `/podgotovka-k-mcko/${params.klass}/${params.subject}` },
  ]);

  return (
    <div className="bg-black min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4">
        <div className="max-w-6xl mx-auto flex gap-2 text-sm flex-wrap">
          <Link href="/" className="text-orange hover:underline">Главная</Link>
          <span className="text-gray-400">/</span>
          <Link href="/podgotovka-k-mcko" className="text-orange hover:underline">Подготовка к МЦКО</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">{data.subjectTitle}, {data.grade} класс</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-3">
          Подготовка к МЦКО · {data.subjectTitle} · {data.grade} класс
        </h1>
        <p className="text-gray-400 mb-10 max-w-3xl">
          {data.variants.length} тренировочных вариантов{klassInfo ? ` (${klassInfo.title})` : ''}.
          В каждом варианте {data.variants[0].tasks.length} заданий с ответами и пояснениями к сложным задачам.
          {data.year && ` Формат ${data.year} года: ${data.durationMinutes} минут работы, ${data.breakMinutes} минут перерыва; максимум баллов: ${data.maxScore}.`}
        </p>
        {data.instructions && <p className="text-gray-300 mb-8 max-w-4xl leading-relaxed">{data.instructions}</p>}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {data.variants.map((v) => (
            <Link
              key={v.id}
              href={`/podgotovka-k-mcko/${params.klass}/${params.subject}/variant-${v.id}`}
              className="group bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6 text-center hover:border-orange transition-all"
            >
              <div className="text-3xl mb-2">📄</div>
              <div className="text-xl font-bold group-hover:text-orange transition-colors">
                Вариант {v.id}
              </div>
              <div className="text-gray-400 text-sm mt-1">{v.tasks.length} заданий</div>
              {v.title && <div className="text-gray-300 text-sm mt-2">{v.title}</div>}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
