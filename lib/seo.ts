export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
export const SITE_NAME = 'Знаторика';
export const SITE_DESCRIPTION =
  'Развивающая платформа для детей 4–11 лет: интерактивные тренажёры, генераторы заданий, шпаргалки и материалы для учителей.';

// Короткие названия предметов — только для тега <title>. В заголовке страницы,
// хлебных крошках и текстах остаётся полное название. Нужно потому, что к
// каждому title сайт дописывает « — Знаторика», и с длинными предметами строка
// переваливала за 60 знаков и обрезалась в выдаче поисковика.
const SHORT_SUBJECT: Record<string, string> = {
  'Литературное чтение': 'Литература',
  'Английский язык': 'Английский',
};

export function shortSubject(title: string): string {
  return SHORT_SUBJECT[title] ?? title;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon`,
    // sameAs должен содержать реальные профили организации. Раньше здесь были
    // голые домены youtube.com и t.me — Google сверяет их с настоящими
    // аккаунтами, и заглушки только снижают доверие к разметке.
    sameAs: ['https://t.me/znatorica_bot'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Москва',
      addressCountry: 'RU',
    },
    areaServed: 'RU',
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'ru-RU',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

interface CourseInfo {
  name: string;
  description: string;
  url: string;
  educationalLevel: string;
}

export function learningResourceJsonLd(course: CourseInfo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: course.name,
    description: course.description,
    url: `${SITE_URL}${course.url}`,
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    educationalLevel: course.educationalLevel,
    inLanguage: 'ru-RU',
    isAccessibleForFree: true,
  };
}

interface ArticleInfo {
  title: string;
  description: string;
  url: string;
  datePublished: string;
}

export function articleJsonLd(article: ArticleInfo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: `${SITE_URL}${article.url}`,
    datePublished: article.datePublished,
    inLanguage: 'ru-RU',
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

interface FAQItem {
  question: string;
  answer: string;
}

export function faqJsonLd(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
