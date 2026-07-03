export const metadata = {
  title: 'Подписка Знаторика — 299 ₽ в месяц',
  description: 'Получи полный доступ к тренажёрам, генераторам и материалам для учителей',
};

export default function SubscriptionPage() {
  return (
    <div className="min-h-screen bg-black py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Подписка Знаторика</h1>
        <p className="text-center text-gray-400 mb-12">
          Получи полный доступ ко всем материалам
        </p>

        {/* Pricing Card */}
        <div className="card border-orange mb-12 max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-6xl font-bold text-orange">299 ₽</p>
            <p className="text-gray-400 text-lg">в месяц</p>
          </div>

          <ul className="space-y-4 mb-12">
            <li className="flex gap-3">
              <span className="text-orange text-xl">✅</span>
              <span>Все тренажёры без ограничений</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange text-xl">✅</span>
              <span>Генератор примеров, прописей, кроссвордов без лимита</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange text-xl">✅</span>
              <span>Рабочие листы и плакаты для печати</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange text-xl">✅</span>
              <span>Материалы для учителей (конспекты, задания)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange text-xl">✅</span>
              <span>Варианты ВПР с разбором решений</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange text-xl">✅</span>
              <span>Карточки для запоминания слов и правил</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange text-xl">✅</span>
              <span>Постоянное добавление новых тем</span>
            </li>
          </ul>

          <button className="btn-primary w-full text-lg mb-4">
            Оформить подписку (демо)
          </button>

          <p className="text-center text-sm text-gray-500">
            Автопродление. Отмену можно оформить в любой момент.
          </p>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Часто задаваемые вопросы</h2>

          <div className="space-y-4">
            <details className="card group">
              <summary className="cursor-pointer font-bold text-lg flex justify-between items-center">
                Что входит в подписку?
                <span className="group-open:rotate-180 transition-transform">⌄</span>
              </summary>
              <p className="mt-4 text-gray-400">
                Подписка дает доступ к тренажёрам, генераторам, рабочим листам, плакатам, материалам для учителей и вариантам ВПР. Полное объяснение всех компонентов.
              </p>
            </details>

            <details className="card group">
              <summary className="cursor-pointer font-bold text-lg flex justify-between items-center">
                Как оплатить подписку?
                <span className="group-open:rotate-180 transition-transform">⌄</span>
              </summary>
              <p className="mt-4 text-gray-400">
                Мы принимаем оплату через ЮKassa. Данные карты полностью защищены и не хранятся на наших серверах.
              </p>
            </details>

            <details className="card group">
              <summary className="cursor-pointer font-bold text-lg flex justify-between items-center">
                Можно ли отменить подписку?
                <span className="group-open:rotate-180 transition-transform">⌄</span>
              </summary>
              <p className="mt-4 text-gray-400">
                Да, отмену можно оформить в личном кабинете в любой момент. После отмены на подписку останется активной до конца периода.
              </p>
            </details>

            <details className="card group">
              <summary className="cursor-pointer font-bold text-lg flex justify-between items-center">
                Есть ли пробный период?
                <span className="group-open:rotate-180 transition-transform">⌄</span>
              </summary>
              <p className="mt-4 text-gray-400">
                Сейчас пробного периода нет, но вы можете попробовать бесплатный контент (теория, шпаргалки, генератор 10 раз в день).
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
