import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0A0812] border-t border-[#2D2350] py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-black text-2xl text-white mb-2">
              🐿️ Знаторика
            </h3>
            <p className="text-gray-400 text-sm">
              Учись. Тренируйся. Сдавай.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Образовательная платформа для детей 4–11 лет
            </p>
          </div>

          {/* Channels */}
          <div>
            <h4 className="font-bold text-white mb-4">Наши каналы</h4>
            <div className="flex flex-col gap-2">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange transition-colors text-sm"
              >
                📺 YouTube
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange transition-colors text-sm"
              >
                💬 Telegram
              </a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-white mb-4">Информация</h4>
            <div className="flex flex-col gap-2">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-orange transition-colors text-sm"
              >
                Политика конфиденциальности
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-orange transition-colors text-sm"
              >
                Условия использования
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#2D2350] pt-8 text-center text-gray-500 text-sm">
          <p>© 2026 Знаторика. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
