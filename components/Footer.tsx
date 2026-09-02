import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white/5 backdrop-blur-md border-t border-white/15 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-black text-2xl bg-gradient-to-r from-orange to-[#f72585] bg-clip-text text-transparent mb-2 inline-block">
              Знаторика
            </h3>
            <p className="text-gray-400 text-sm">
              Учись. Тренируйся. Сдавай.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Развивающая платформа для детей 4–11 лет
            </p>
          </div>

          {/* Channels */}
          <div>
            <h4 className="font-bold text-white mb-4">Наши каналы</h4>
            <div className="flex flex-col gap-2">
              <a
                href="https://t.me/znatorica_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange transition-colors text-sm"
              >
                🤖 Открыть в Telegram
              </a>
              <a
                href="https://vk.com/club142589783"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange transition-colors text-sm"
              >
                🔵 Мы ВКонтакте
              </a>
              <a
                href="https://t.me/englsimplepro"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange transition-colors text-sm"
              >
                💬 Английский просто
              </a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-white mb-4">Информация</h4>
            <div className="flex flex-col gap-2">
              <Link
                href="/sborniki"
                className="text-gray-400 hover:text-orange transition-colors text-sm"
              >
                Сборник к 1 классу
              </Link>
              <Link
                href="/pamyatki"
                className="text-gray-400 hover:text-orange transition-colors text-sm"
              >
                Памятки
              </Link>
              <Link
                href="/otzyvy"
                className="text-gray-400 hover:text-orange transition-colors text-sm"
              >
                Отзывы
              </Link>
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
              <Link
                href="/oferta"
                className="text-gray-400 hover:text-orange transition-colors text-sm"
              >
                Публичная оферта
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/15 pt-8 text-center text-white/60 text-sm">
          <p>© 2026 Знаторика. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
