import Link from 'next/link';
import { PRODUCTS, isSaleActive } from '@/lib/products';

export const metadata = {
  title: 'PDF-сборники для печати',
  description: 'Готовые PDF-сборники заданий для скачивания: разовая покупка, без подписки. Скачал один раз — распечатывай сколько нужно.',
  alternates: { canonical: '/sborniki' },
};

export default function SbornikiPage() {
  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">PDF-сборники</h1>
        <p className="text-center text-white/75 mb-12">
          Разовая покупка, без подписки. Скачал один раз — распечатывай сколько нужно.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {PRODUCTS.filter((p) => p.fileName).map((p) => {
            const onSale = isSaleActive(p);
            return (
              <Link key={p.slug} href={`/sborniki/${p.slug}`} className="card flex gap-4 !p-4 hover:border-white/50 transition-colors">
                {p.coverImage && (
                  <img
                    src={p.coverImage}
                    alt={`Обложка: ${p.title}`}
                    className="h-28 w-20 shrink-0 rounded-md object-cover"
                  />
                )}
                <div className="min-w-0 flex-1">
                  {onSale && (
                    <span className="inline-block bg-orange text-white text-[10px] font-bold px-2 py-0.5 rounded mb-1">
                      🔥 Только сегодня
                    </span>
                  )}
                  <h2 className="text-base font-bold leading-tight mb-1">{p.title}</h2>
                  <p className="text-white/60 text-xs mb-2 line-clamp-2">{p.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-white/50 text-xs">{p.pages} стр.</span>
                    {onSale ? (
                      <span className="flex items-center gap-1.5">
                        <span className="text-white/40 text-xs line-through">{p.price} ₽</span>
                        <span className="text-orange text-lg font-bold">{p.salePrice} ₽</span>
                      </span>
                    ) : (
                      <span className="text-orange text-lg font-bold">{p.price} ₽</span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
