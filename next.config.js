/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone', // компактный self-contained билд для Docker
  async redirects() {
    return [
      // «Сравнение чисел» — интерактивный тренажёр, а не генератор листов
      { source: '/generator/sravnenie', destination: '/trenazher/sravnenie', permanent: true },
    ];
  },
};

module.exports = nextConfig;
