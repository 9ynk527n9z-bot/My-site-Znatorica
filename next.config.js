/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone', // компактный self-contained билд для Docker
  async redirects() {
    return [
      // «Сравнение чисел» — интерактивный тренажёр, а не генератор листов
      { source: '/generator/sravnenie', destination: '/trenazher/sravnenie', permanent: true },
      // Старый легаси-генератор (iframe на math-generator.html), нигде на сайте
      // не связан ссылками, но остался в индексе и конкурировал за тот же запрос
      // с актуальным /generator/primery — объединяем поисковый вес в одну страницу.
      { source: '/generator/math', destination: '/generator/primery', permanent: true },
      // Старый легаси-тренажёр умножения (iframe на multiplication-app.html) —
      // дублирует актуальный /trenazher/tablitsa-umnozheniya (4 режима, уже связан
      // ссылками на страницах классов), объединяем поисковый вес в одну страницу.
      { source: '/trenazher/multiplication', destination: '/trenazher/tablitsa-umnozheniya', permanent: true },
      // «propisi» без уточнения путали с «propisi-ru» (русский алфавит) — это была
      // английская версия. Переименовали в явное propisi-angliyskiy для ясности.
      { source: '/generator/propisi', destination: '/generator/propisi-angliyskiy', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        // Легаси-HTML из public/ — это внутренности тренажёров, которые
        // подключаются через iframe на обычных страницах. Сами по себе они
        // отвечают 200 и дублируют в выдаче актуальные страницы (например,
        // /multiplication-app.html против /trenazher/tablitsa-umnozheniya).
        // noindex убирает дубли из индекса, но файлы остаются доступными,
        // поэтому iframe продолжает работать (в отличие от Disallow в robots.txt).
        source: '/:file*.html',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      },
    ];
  },
};

module.exports = nextConfig;
