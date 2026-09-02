// Каталог товаров для разовой покупки (не подписка) — платятся через общий
// productSlug-механизм в /api/payments/create + Purchase в БД. Большинство —
// PDF-сборники (есть pages/fileName, показываются на /sborniki), но встречаются
// и интерактивные продукты без файла (например, диагностика готовности к школе
// в app/gotovnost-k-shkole) — у них pages/fileName не заданы, и /sborniki их
// не показывает (см. фильтр `p.fileName` в app/sborniki/page.tsx).
export interface Product {
  slug: string;
  title: string;
  description: string;
  price: number; // обычная цена в рублях
  salePrice?: number; // акционная цена, действует до saleUntil включительно
  saleUntil?: string; // дата окончания акции, формат YYYY-MM-DD (по московскому времени, до конца дня)
  pages?: number;
  fileName?: string; // имя файла в /private-content/products/ — только для PDF-сборников
}

export const PRODUCTS: Product[] = [
  {
    slug: 'podgotovka-k-1-klassu',
    title: 'Сборник для подготовки к 1 классу',
    description:
      'Полный набор печатных заданий для подготовки к школе: прописи букв и цифр, примеры на счёт, 6 кроссвордов и 6 филвордов по темам, состав числа, сравнение чисел с картинками, часы, лабиринты, штриховка, анаграммы, словарные слова, графический диктант и страница ответов для проверки взрослым. Скачай один раз — распечатывай сколько нужно.',
    price: 150,
    salePrice: 99,
    saleUntil: '2026-09-28',
    pages: 34,
    fileName: 'podgotovka-k-1-klassu.pdf',
  },
  {
    slug: 'gotovnost-k-1-klassu',
    title: 'Диагностика готовности к 1 классу',
    description:
      'Тест из заданий для ребёнка (математика, чтение, логика, окружающий мир) и чек-листа для родителя — на выходе подробный разбор по каждому направлению с конкретными рекомендациями, что подтянуть перед школой.',
    price: 149,
  },
  {
    slug: 'gotovnost-k-2-klassu',
    title: 'Диагностика готовности к 2 классу',
    description:
      'Тест на закрепление базы 1 класса (математика, русский, логика, чтение) и чек-лист для родителя про учебные привычки — на выходе подробный разбор по каждому направлению с конкретными рекомендациями.',
    price: 149,
  },
  {
    slug: 'gotovnost-k-3-klassu',
    title: 'Диагностика готовности к 3 классу',
    description:
      'Тест на закрепление базы 2 класса (математика, русский, логика, окружающий мир) и чек-лист для родителя про самоорганизацию — на выходе подробный разбор по каждому направлению с конкретными рекомендациями.',
    price: 149,
  },
  {
    slug: 'gotovnost-k-4-klassu',
    title: 'Диагностика готовности к 4 классу',
    description:
      'Тест на закрепление базы 3 класса (математика, русский, логика, устный счёт) и чек-лист для родителя про ответственность — на выходе подробный разбор по каждому направлению с конкретными рекомендациями.',
    price: 149,
  },
  {
    slug: 'gotovnost-k-5-klassu',
    title: 'Диагностика готовности к 5 классу',
    description:
      'Тест на закрепление базы 4 класса (математика, русский, логика, работа с текстом) и чек-лист для родителя про организационную самостоятельность — на выходе подробный разбор, к чему подготовиться перед переходом на кабинетную систему.',
    price: 149,
  },
  {
    slug: 'kakoy-ty-roditel',
    title: 'Тест «Какой ты родитель?»',
    description:
      'Тест на родительский стиль по 12 бытовым ситуациям — на выходе подробный разбор: сильные стороны вашего стиля, на что обратить внимание и конкретные советы.',
    price: 149,
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

// Действует ли сейчас акционная цена (до конца дня saleUntil включительно, по МСК = UTC+3).
export function isSaleActive(product: Product): boolean {
  if (!product.salePrice || !product.saleUntil) return false;
  const mskNow = new Date(Date.now() + 3 * 60 * 60 * 1000);
  const todayMsk = mskNow.toISOString().slice(0, 10);
  return todayMsk <= product.saleUntil;
}

// Текущая цена к оплате с учётом акции.
export function getEffectivePrice(product: Product): number {
  return isSaleActive(product) ? product.salePrice! : product.price;
}
