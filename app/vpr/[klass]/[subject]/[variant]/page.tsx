import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import { getVprData, getVprVariant, getAllVprParams } from '@/lib/vpr';
import PrintButton from '@/components/PrintButton';
import ListenButton from '@/components/ListenButton';
import MarkVprComplete from '@/components/MarkVprComplete';

interface Props {
  params: { klass: string; subject: string; variant: string };
}

function parseVariantId(slug: string): number | null {
  const m = slug.match(/^variant-(\d+)$/);
  return m ? parseInt(m[1], 10) : null;
}

export function generateStaticParams() {
  return getAllVprParams();
}

export function generateMetadata({ params }: Props): Metadata {
  const data = getVprData(params.klass, params.subject);
  const id = parseVariantId(params.variant);
  if (!data || !id) return {};
  return {
    title: `Подготовка к ВПР по предмету «${data.subjectTitle}», ${data.grade} класс — вариант ${id} с ответами`,
    description: `Тренировочный вариант ${id} для подготовки к ВПР по предмету «${data.subjectTitle}» для ${data.grade} класса: ${data.variants[0].tasks.length} заданий с ответами и решениями.`,
    alternates: { canonical: `/vpr/${params.klass}/${params.subject}/${params.variant}` },
  };
}

export default function VprVariantPage({ params }: Props) {
  const data = getVprData(params.klass, params.subject);
  const id = parseVariantId(params.variant);
  if (!data || !id) notFound();

  const variant = getVprVariant(params.klass, params.subject, id);
  if (!variant) notFound();

  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Главная', url: '/' },
    { name: 'Подготовка к ВПР', url: '/vpr' },
    { name: `${data.subjectTitle}, ${data.grade} класс`, url: `/vpr/${params.klass}/${params.subject}` },
    { name: `Вариант ${id}`, url: `/vpr/${params.klass}/${params.subject}/${params.variant}` },
  ]);

  const learningResource = learningResourceJsonLd({
    name: `Подготовка к ВПР — ${data.subjectTitle}, ${data.grade} класс, вариант ${id}`,
    description: `Тренировочный вариант для подготовки к ВПР с ответами (${variant.tasks.length} заданий)`,
    url: `/vpr/${params.klass}/${params.subject}/${params.variant}`,
    educationalLevel: `${data.grade} класс начальной школы`,
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
          <Link href="/vpr" className="text-orange hover:underline">Подготовка к ВПР</Link>
          <span className="text-gray-400">/</span>
          <Link href={`/vpr/${params.klass}/${params.subject}`} className="text-orange hover:underline">
            {data.subjectTitle}, {data.grade} класс
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Вариант {id}</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
          <h1 className="text-4xl font-bold">
            Подготовка к ВПР · {data.subjectTitle} · {data.grade} класс
          </h1>
          <PrintButton />
        </div>
        <p className="text-gray-400 mb-10">
          Вариант {id} · {variant.tasks.length} заданий · на выполнение отводится 45 минут
        </p>

        {variant.dictation && (
          <div className="bg-[#2A1B4D] border border-orange/40 rounded-lg p-6 mb-8">
            <p className="text-orange font-bold mb-3">📖 Текст диктанта — читает взрослый вслух</p>
            <p className="text-lg leading-relaxed whitespace-pre-line">{variant.dictation}</p>
            <p className="no-print text-gray-500 text-sm mt-3">
              Ребёнок записывает текст под диктовку в задании № 1, затем сверяет свою запись с этим текстом.
            </p>
          </div>
        )}

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
                <div className="flex-1">
                  {task.points === 2 && (
                    <span className="inline-block bg-violet/20 text-violet text-xs font-bold px-2 py-1 rounded mb-2">
                      повышенная сложность · 2 балла
                    </span>
                  )}
                  {task.audio && (
                    <div className="bg-black/40 border border-violet/40 rounded-lg p-4 mb-4">
                      <p className="text-gray-400 text-xs font-bold uppercase mb-3">Аудирование</p>
                      <ListenButton text={task.audio} />
                      <p className="no-print text-gray-500 text-xs mt-2 mb-3">
                        По правилам ВПР текст можно прослушать дважды — нажми кнопку ещё раз.
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

                  <details className="no-print mt-4 group">
                    <summary className="cursor-pointer text-orange font-bold select-none hover:underline">
                      Показать ответ
                    </summary>
                    <div className="mt-3 bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                      <p className="text-green-400 font-bold">Ответ: {task.answer}</p>
                      {task.solution && (
                        <p className="text-gray-300 text-sm mt-2">Решение: {task.solution}</p>
                      )}
                    </div>
                  </details>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <MarkVprComplete trackType={`vpr:${params.klass}:${params.subject}:${id}`} />

        {/* Навигация между вариантами */}
        <div className="no-print mt-12 flex items-center justify-between gap-4">
          {id > 1 ? (
            <Link
              href={`/vpr/${params.klass}/${params.subject}/variant-${id - 1}`}
              className="btn-secondary"
            >
              ← Вариант {id - 1}
            </Link>
          ) : (
            <span />
          )}
          {id < data.variants.length ? (
            <Link
              href={`/vpr/${params.klass}/${params.subject}/variant-${id + 1}`}
              className="btn-primary"
            >
              Вариант {id + 1} →
            </Link>
          ) : (
            <Link href={`/vpr/${params.klass}/${params.subject}`} className="btn-primary">
              Все варианты
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
