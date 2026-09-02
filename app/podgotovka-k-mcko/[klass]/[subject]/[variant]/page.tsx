import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { breadcrumbJsonLd, learningResourceJsonLd, shortSubject } from '@/lib/seo';
import { getMckoData, getMckoVariant, getAllMckoParams } from '@/lib/mcko';
import PrintButton from '@/components/PrintButton';
import ListenButton from '@/components/ListenButton';
import MarkVprComplete from '@/components/MarkVprComplete';
import TrainerGate from '@/components/TrainerGate';
import MckoFigure from '@/components/MckoFigure';

interface Props {
  params: { klass: string; subject: string; variant: string };
}

function parseVariantId(slug: string): number | null {
  const m = slug.match(/^variant-(\d+)$/);
  return m ? parseInt(m[1], 10) : null;
}

export function generateStaticParams() {
  return getAllMckoParams();
}

export function generateMetadata({ params }: Props): Metadata {
  const data = getMckoData(params.klass, params.subject);
  const id = parseVariantId(params.variant);
  if (!data || !id) return {};
  const variant = getMckoVariant(params.klass, params.subject, id);
  if (!variant) return {};
  return {
    title: `МЦКО${data.year ? ` ${data.year}` : ''}: ${shortSubject(data.subjectTitle)}, ${data.grade} класс — вариант ${id}`,
    description: `Тренировочный вариант ${id} для подготовки к МЦКО по предмету «${data.subjectTitle}» для ${data.grade} класса: ${variant.tasks.length} заданий с ответами.`,
    alternates: { canonical: `/podgotovka-k-mcko/${params.klass}/${params.subject}/${params.variant}` },
  };
}

export default function MckoVariantPage({ params }: Props) {
  const data = getMckoData(params.klass, params.subject);
  const id = parseVariantId(params.variant);
  if (!data || !id) notFound();

  const variant = getMckoVariant(params.klass, params.subject, id);
  if (!variant) notFound();

  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Главная', url: '/' },
    { name: 'Подготовка к МЦКО', url: '/podgotovka-k-mcko' },
    { name: `${data.subjectTitle}, ${data.grade} класс`, url: `/podgotovka-k-mcko/${params.klass}/${params.subject}` },
    { name: `Вариант ${id}`, url: `/podgotovka-k-mcko/${params.klass}/${params.subject}/${params.variant}` },
  ]);

  const learningResource = learningResourceJsonLd({
    name: `Подготовка к МЦКО — ${data.subjectTitle}, ${data.grade} класс, вариант ${id}`,
    description: `Тренировочный вариант для подготовки к МЦКО с ответами (${variant.tasks.length} заданий)`,
    url: `/podgotovka-k-mcko/${params.klass}/${params.subject}/${params.variant}`,
    educationalLevel: `${data.grade} класс${data.grade <= 4 ? ' начальной школы' : ' основной школы'}`,
  });

  return (
    <div className="bg-black min-h-screen print-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResource) }}
      />

      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4 no-print">
        <div className="max-w-4xl mx-auto flex gap-2 text-sm flex-wrap">
          <Link href="/" className="text-orange hover:underline">Главная</Link>
          <span className="text-gray-400">/</span>
          <Link href="/podgotovka-k-mcko" className="text-orange hover:underline">Подготовка к МЦКО</Link>
          <span className="text-gray-400">/</span>
          <Link href={`/podgotovka-k-mcko/${params.klass}/${params.subject}`} className="text-orange hover:underline">
            {data.subjectTitle}, {data.grade} класс
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Вариант {id}</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
          <h1 className="text-4xl font-bold">
            Подготовка к МЦКО · {data.subjectTitle} · {data.grade} класс · вариант {id}
          </h1>
          <PrintButton />
        </div>
        <p className="text-gray-400 mb-10">
          Вариант {id} · {variant.tasks.length} заданий
          {data.year && ` · формат ${data.year} года`}
          {data.maxScore && ` · максимум баллов: ${data.maxScore}`}
        </p>
        {variant.title && <h2 className="text-2xl font-bold mb-4">{variant.title}</h2>}
        {data.instructions && <div className="border border-[#2D2350] rounded-lg p-5 mb-8 text-gray-300">
          <p className="font-bold text-white mb-2">{data.durationMinutes} минут работы + {data.breakMinutes} минут перерыва</p>
          <p className="leading-relaxed">{data.instructions}</p>
        </div>}

        <TrainerGate type={`vpr:mcko-${params.klass}:${params.subject}:${id}`}>

        <ol className="space-y-6">
          {variant.tasks.map((task) => (
            <li
              key={task.n}
              className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6"
            >
              <div className="flex gap-4">
                <span className="flex-shrink-0 w-9 h-9 rounded-full bg-orange/20 text-orange font-bold flex items-center justify-center">
                  {task.n}
                </span>
                <div className="flex-1 min-w-0 break-words">
                  {task.audio && (
                    <div className="bg-black/40 border border-violet/40 rounded-lg p-4 mb-4">
                      <p className="text-gray-400 text-xs font-bold uppercase mb-3">Аудирование</p>
                      <ListenButton text={task.audio} />
                      <p className="no-print text-gray-500 text-xs mt-2 mb-3">
                        Текст можно прослушать несколько раз — нажми кнопку ещё раз.
                        Если озвучка не работает в твоём браузере, попроси взрослого прочитать текст ниже вслух.
                      </p>
                      <p className="text-gray-200 leading-relaxed whitespace-pre-line border-t border-[#2D2350] pt-3">
                        {task.audio}
                      </p>
                    </div>
                  )}
                  {task.reading && (
                    <div className="bg-black/40 border border-[#2D2350] rounded-lg p-4 mb-4">
                      <p className="text-gray-400 text-xs font-bold uppercase mb-2">Текст для чтения</p>
                      <p className="text-gray-200 leading-relaxed whitespace-pre-line">{task.reading}</p>
                    </div>
                  )}
                  <p className="text-lg leading-relaxed whitespace-pre-line">{task.text}</p>
                  {task.points && <p className="text-sm text-gray-400 mt-2">Максимум: {task.points} · {task.level === 'П' ? 'повышенный уровень' : 'базовый уровень'}</p>}
                  {task.figure && <MckoFigure figure={task.figure} id={`${params.subject}-${id}-${task.n}`} />}
                  {task.table && <div className="my-4 overflow-x-auto"><table className="w-full border-collapse text-sm">
                    <thead><tr>{task.table.headers.map(header => <th key={header} scope="col" className="border border-gray-500 p-2 text-left">{header}</th>)}</tr></thead>
                    <tbody>{task.table.rows.map((row, ri) => <tr key={ri}>{row.map((cell, ci) => <td key={ci} className="border border-gray-500 p-2">{cell}</td>)}</tr>)}</tbody>
                  </table></div>}
                  {task.parts?.map(part => <section key={part.label} className="mt-6 border-t border-[#54416e] pt-5">
                    <h3 className="text-xl font-bold mb-3">Задание {part.label} <span className="text-sm font-normal text-gray-400">· максимум {part.points}</span></h3>
                    <p className="whitespace-pre-line leading-relaxed">{part.text}</p>
                    {part.reading && <div className="mt-4 rounded-lg bg-black/30 p-4"><p className="whitespace-pre-line leading-loose">{part.reading}</p></div>}
                    <details className="no-print mt-4">
                      <summary className="cursor-pointer text-orange font-bold hover:underline">Показать ответ и критерии {part.label}</summary>
                      <div className="mt-3 bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                        <p className="text-green-400 font-bold whitespace-pre-line">{part.answer}</p>
                        <p className="text-gray-300 text-sm mt-3 whitespace-pre-line">{part.solution}</p>
                        <p className="text-gray-300 text-sm mt-3 whitespace-pre-line">Оценивание: {part.rubric}</p>
                      </div>
                    </details>
                  </section>)}

                  {!task.parts && <details className="no-print mt-4 group">
                    <summary className="cursor-pointer text-orange font-bold select-none hover:underline">
                      Показать ответ
                    </summary>
                    <div className="mt-3 bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                      <p className="text-green-400 font-bold whitespace-pre-line">Ответ: {task.answer}</p>
                      {task.solution && (
                        <p className="text-gray-300 text-sm mt-2 whitespace-pre-line">Решение: {task.solution}</p>
                      )}
                      {task.rubric && <p className="text-gray-300 text-sm mt-3">Оценивание: {task.rubric}</p>}
                    </div>
                  </details>}
                </div>
              </div>
            </li>
          ))}
        </ol>

        <MarkVprComplete trackType={`mcko:${params.klass}:${params.subject}:${id}`} />
        </TrainerGate>

        <div className="no-print mt-12 flex items-center justify-between gap-4">
          {id > 1 ? (
            <Link
              href={`/podgotovka-k-mcko/${params.klass}/${params.subject}/variant-${id - 1}`}
              className="btn-secondary"
            >
              ← Вариант {id - 1}
            </Link>
          ) : (
            <span />
          )}
          {id < data.variants.length ? (
            <Link
              href={`/podgotovka-k-mcko/${params.klass}/${params.subject}/variant-${id + 1}`}
              className="btn-primary"
            >
              Вариант {id + 1} →
            </Link>
          ) : (
            <Link href={`/podgotovka-k-mcko/${params.klass}/${params.subject}`} className="btn-primary">
              Все варианты
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
