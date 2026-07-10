import type { Metadata } from 'next';
import { faqJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Подписка 399 ₽/месяц — полный доступ ко всем материалам',
  description:
    'Оформите подписку на Знаторику за 399 ₽ в месяц: все тренажёры, генератор примеров без лимита, рабочие листы, плакаты и материалы для учителей. Оплата картой MIR, СБП, Сбербанк.',
  alternates: { canonical: '/podpiska' },
};

const podpiskaFAQ = faqJsonLd([
  {
    question: 'Что входит в подписку?',
    answer:
      'Подписка даёт доступ к тренажёрам, генераторам, рабочим листам, плакатам, материалам для учителей и вариантам ВПР.',
  },
  {
    question: 'Как оплатить подписку?',
    answer:
      'Мы принимаем оплату через ЮKassa: карты MIR, СБП, Сбербанк Онлайн, Яндекс.Касса, QIWI и мобильные операторы.',
  },
  {
    question: 'Можно ли отменить подписку?',
    answer:
      'Да, отмену можно оформить в личном кабинете в любой момент. После отмены подписка останется активной до конца оплаченного периода.',
  },
  {
    question: 'Есть ли пробный период?',
    answer:
      'Пробного периода нет, но доступны бесплатные материалы: теория, шпаргалки и генератор до 5 раз в день (суммарно по всем генераторам).',
  },
]);

export default function PodpiskaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(podpiskaFAQ) }}
      />
      {children}
    </>
  );
}
