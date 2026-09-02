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

        <div className="grid md:grid-cols-2 gap-6">
          {PRODUCTS.filter((p) => p.fileName).map((p) => {
            const onSale = isSaleActive(p);
            return (
              <Link key={p.slug} href={`/sborniki/${p.slug}`} className="card hover:border-white/50 transition-colors">
                {onSale && (
                  <span className="inline-block bg-orange text-white text-xs font-bold px-2 py-1 rounded mb-2">
                    🔥 Только сегодня
                  </span>
                )}
                <h2 className="text-xl font-bold mb-2">{p.title}</h2>
                <p className="text-white/70 text-sm mb-4">{p.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-white/50 text-sm">{p.pages} стр.</span>
                  {onSale ? (
                    <span className="flex items-center gap-2">
                      <span className="text-white/40 text-sm line-through">{p.price} ₽</span>
                      <span className="text-orange text-2xl font-bold">{p.salePrice} ₽</span>
                    </span>
                  ) : (
                    <span className="text-orange text-2xl font-bold">{p.price} ₽</span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
