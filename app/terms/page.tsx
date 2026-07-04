export const metadata = {
  title: 'Условия использования — Знаторика',
  description: 'Условия использования образовательной платформы Знаторика.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <div className="bg-black min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Условия использования</h1>
        <p className="text-gray-400 mb-12">Последнее обновление: 3 июля 2026 г.</p>

        <div className="space-y-8">
          <section className="bg-[#16102A] border border-[#2D2350] rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">1. Общие положения</h2>
            <p className="text-gray-400">
              Используя платформу "Знаторика" (znatorica.ru), вы соглашаетесь с настоящими условиями использования. Если вы не согласны с каким-либо пунктом, пожалуйста, не используйте платформу.
            </p>
          </section>

          <section className="bg-[#16102A] border border-[#2D2350] rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">2. Описание услуг</h2>
            <p className="text-gray-400">
              Платформа предоставляет образовательные материалы для детей 4–11 лет: интерактивные тренажёры, генераторы заданий, теоретические материалы, шпаргалки и материалы для учителей.
            </p>
          </section>

          <section className="bg-[#16102A] border border-[#2D2350] rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">3. Подписка и оплата</h2>
            <ul className="text-gray-400 space-y-2 list-disc list-inside">
              <li>Стоимость подписки — 299 ₽ в месяц</li>
              <li>Подписка автоматически продлевается, если не отменена</li>
              <li>Отмена подписки доступна в личном кабинете в любой момент</li>
              <li>При отмене доступ сохраняется до конца оплаченного периода</li>
              <li>Оплата принимается через ЮKassa: карты MIR, СБП, Сбербанк Онлайн и другие разрешённые в РФ способы</li>
            </ul>
          </section>

          <section className="bg-[#16102A] border border-[#2D2350] rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">4. Обязанности пользователя</h2>
            <ul className="text-gray-400 space-y-2 list-disc list-inside">
              <li>Предоставлять достоверные данные при регистрации</li>
              <li>Не передавать доступ к аккаунту третьим лицам</li>
              <li>Не использовать платформу для незаконных целей</li>
              <li>Не копировать и не распространять материалы платформы без разрешения</li>
            </ul>
          </section>

          <section className="bg-[#16102A] border border-[#2D2350] rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">5. Интеллектуальная собственность</h2>
            <p className="text-gray-400">
              Все материалы платформы (тексты, изображения, тренажёры, генераторы) являются собственностью "Знаторики" и защищены авторским правом. Использование материалов без письменного согласия запрещено.
            </p>
          </section>

          <section className="bg-[#16102A] border border-[#2D2350] rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">6. Ограничение ответственности</h2>
            <p className="text-gray-400">
              Платформа предоставляется "как есть". Мы стремимся обеспечить бесперебойную работу, но не гарантируем отсутствие технических сбоев.
            </p>
          </section>

          <section className="bg-[#16102A] border border-[#2D2350] rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">7. Персональные данные</h2>
            <p className="text-gray-400">
              Обработка персональных данных осуществляется согласно нашей{' '}
              <a href="/privacy" className="text-orange hover:underline">
                Политике конфиденциальности
              </a>{' '}
              и Федеральному закону №152-ФЗ.
            </p>
          </section>

          <section className="bg-[#16102A] border border-[#2D2350] rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">8. Изменение условий</h2>
            <p className="text-gray-400">
              Мы можем обновлять данные условия. О существенных изменениях пользователи уведомляются по email.
            </p>
          </section>

          <section className="bg-[#16102A] border border-[#2D2350] rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">9. Контакты</h2>
            <p className="text-gray-400">
              По всем вопросам обращайтесь на email: <span className="font-bold">support@znatorica.ru</span>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
