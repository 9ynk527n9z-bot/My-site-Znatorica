import Link from 'next/link';
import { faqJsonLd } from '@/lib/seo';
import { PAGE_ABOUT } from '@/lib/page-about';

// Текстовый блок под тренажёром или генератором.
//
// Страницы с iframe раньше состояли из заголовка и рамки с игрой — поисковику
// нечего было индексировать, и по своим запросам они не показывались.
// Блок ставится ПОД iframe, поэтому не мешает ребёнку сразу начать заниматься.
// Тексты вынесены в lib/page-about.ts: их правит взрослый человек, а не разработчик.
export default function PageAbout({ route }: { route: string }) {
  const data = PAGE_ABOUT[route];
  if (!data) return null;

  return (
    <section className="bg-black border-t border-[#2D2350] px-6 py-12">
      <div className="max-w-3xl mx-auto">
        {data.faq && data.faq.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(data.faq)) }}
          />
        )}

        <h2 className="text-2xl font-bold mb-4">{data.heading}</h2>
        <div className="space-y-4 text-gray-300 leading-relaxed">
          {data.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {data.tips && (
          <div className="mt-8 bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6">
            <h3 className="font-bold text-orange mb-3">{data.tips.heading}</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              {data.tips.items.map((t, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-orange flex-shrink-0">•</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {data.faq && data.faq.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Частые вопросы</h3>
            <div className="space-y-4">
              {data.faq.map((item, i) => (
                <div key={i}>
                  <p className="font-bold text-white mb-1">{item.question}</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.related && data.related.length > 0 && (
          <div className="mt-8 pt-6 border-t border-[#2D2350]">
            <h3 className="font-bold mb-3">Что ещё посмотреть</h3>
            <div className="flex flex-wrap gap-2">
              {data.related.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="text-sm bg-[#2A1B4D] border border-[#2D2350] rounded-lg px-3 py-2 text-orange hover:border-orange transition-colors"
                >
                  {r.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
