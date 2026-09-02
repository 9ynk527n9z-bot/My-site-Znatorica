import type { Metadata } from 'next';
import { getProduct } from '@/lib/products';

// Страница сборника клиентская ('use client') и не может экспортировать
// metadata — без этого layout она наследовала canonical и title главной.
interface Props {
  params: { slug: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const product = getProduct(params.slug);
  const url = `/sborniki/${params.slug}`;
  if (!product) {
    return { title: 'Сборник заданий', alternates: { canonical: url } };
  }
  // description в каталоге длинный (до 400 символов) — для выдачи подрезаем
  // по границе предложения, чтобы Google не обрывал текст на полуслове.
  const full = product.description;
  let short = full;
  if (full.length > 155) {
    const cut = full.slice(0, 155);
    const stop = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf(', '));
    short = (stop > 90 ? cut.slice(0, stop) : cut.trimEnd()) + '…';
  }
  return {
    title: product.title,
    description: short,
    alternates: { canonical: url },
  };
}

export default function SbornikLayout({ children }: { children: React.ReactNode }) {
  return children;
}
