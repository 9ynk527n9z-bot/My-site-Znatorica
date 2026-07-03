import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Знаторика — Учись. Тренируйся. Сдавай.',
  description: 'Образовательная платформа для детей 4–11 лет. Интерактивные тренажёры, генераторы заданий, плакаты.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Знаторика" />
        <meta property="og:description" content="Образовательная платформа для детей 4–11 лет" />
        <meta property="og:image" content="/og-image.png" />
      </head>
      <body className="bg-black text-white">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
