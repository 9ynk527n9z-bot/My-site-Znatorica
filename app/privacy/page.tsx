import { LEGAL_ENTITY } from '@/lib/legal';

export const metadata = {
  title: 'Политика конфиденциальности',
  description: 'Политика обработки персональных данных согласно ФЗ-152',
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="legal-page py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Политика конфиденциальности</h1>
        <p className="text-gray-400 mb-12">
          Согласно Федеральному закону от 27.07.2006 № 152-ФЗ "О защите персональных данных"
        </p>

        <div className="space-y-8">
          {/* 1. Introduction */}
          <section className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">1. Общие положения</h2>
            <p className="text-gray-400 mb-3">
              Развивающая платформа "Знаторика" (далее — "Платформа") ценит вашу приватность и уважает ваши права на защиту персональных данных. Эта политика описывает, как мы собираем, используем и защищаем ваши данные.
            </p>
            <p className="text-gray-400">
              <span className="font-bold text-white">Оператор персональных данных:</span> {LEGAL_ENTITY.fullName}
              {' '}({LEGAL_ENTITY.status}, ИНН {LEGAL_ENTITY.inn}, {LEGAL_ENTITY.city}).
            </p>
          </section>

          {/* Registration by parent/legal guardian */}
          <section className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">1.1. Данные детей</h2>
            <p className="text-gray-400">
              Аккаунт на Платформе регистрирует и оплачивает совершеннолетний родитель или законный
              представитель ребёнка — сам ребёнок регистрацию не проходит. Если в личном кабинете
              указывается возраст или класс ребёнка, эти данные предоставляются и обрабатываются с
              согласия родителя/законного представителя, полученного при регистрации.
            </p>
          </section>

          {/* 2. Data Collection */}
          <section className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">2. Какие данные мы собираем</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-orange mb-2">📧 При регистрации:</h3>
                <ul className="list-disc list-inside text-gray-400 space-y-1 ml-2">
                  <li>Email адрес</li>
                  <li>Пароль (зашифрован bcryptjs)</li>
                  <li>Возраст/класс обучения (опционально)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-orange mb-2">💳 При оплате подписки:</h3>
                <ul className="list-disc list-inside text-gray-400 space-y-1 ml-2">
                  <li>Способ оплаты (выбранный метод)</li>
                  <li>Сумма платежа</li>
                  <li>ID платежа в YuKassa</li>
                  <li>Статус платежа</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-orange mb-2">📊 При использовании платформы:</h3>
                <ul className="list-disc list-inside text-gray-400 space-y-1 ml-2">
                  <li>Просмотренные страницы</li>
                  <li>Использованные тренажеры</li>
                  <li>Количество использований генератора</li>
                  <li>Дата и время активности</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-orange mb-2">💬 При отправке отзыва:</h3>
                <ul className="list-disc list-inside text-gray-400 space-y-1 ml-2">
                  <li>Текст отзыва (обязательно)</li>
                  <li>Имя и оценка (по желанию)</li>
                  <li>Email — только если вы вошли в аккаунт при отправке отзыва</li>
                </ul>
                <p className="text-gray-500 text-xs mt-1 ml-2">
                  Отзыв публикуется на странице «Отзывы» только после проверки модератором.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-orange mb-2">🏆 При участии в «Турнире Знаторики»:</h3>
                <ul className="list-disc list-inside text-gray-400 space-y-1 ml-2">
                  <li>Само участие в турнире анонимно — данные не сохраняются</li>
                  <li>
                    Если оформляется именной диплом (платно) — сохраняются имя ребёнка, указанное
                    родителем, тема турнира и результат (для отображения на дипломе)
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-orange mb-2">🍪 Cookies:</h3>
                <p className="text-gray-500 text-xs mb-2 ml-2">
                  Необходимые cookie работают всегда и не требуют согласия — без них сайт не
                  функционирует. Cookie Яндекс.Метрики включаются только после вашего явного
                  согласия в баннере внизу экрана — вы можете выбрать «Только необходимые», чтобы
                  их отключить.
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-1 ml-2">
                  <li>
                    <span className="text-gray-300">Необходимые:</span> служебная cookie
                    аутентификации — для входа в личный кабинет
                  </li>
                  <li>
                    <span className="text-gray-300">Необходимые:</span> анонимная техническая cookie{' '}
                    <code className="text-gray-300">znatorika_sid</code> — только для внутренней
                    статистики использования Платформы (без входа в аккаунт). Не содержит
                    персональных данных, не передаётся третьим лицам и не используется для рекламы
                  </li>
                  <li>
                    <span className="text-gray-300">По согласию:</span> cookie Яндекс.Метрики — см.
                    ниже
                  </li>
                </ul>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-3 space-y-2">
                <p className="text-yellow-400 text-sm">
                  📊 <span className="font-bold">Яндекс.Метрика:</span> используем для оценки эффективности рекламы
                  и работы сайта. Сервис получает технические данные о визите (IP-адрес, тип браузера и устройства,
                  поведение на страницах) и обрабатывает их по{' '}
                  <a
                    href="https://yandex.ru/legal/confidential/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-yellow-300"
                  >
                    политике конфиденциальности Яндекса
                  </a>
                  . Персональные данные (имя, email) в Метрику не передаются.
                </p>
                <p className="text-yellow-400 text-sm">
                  ❌ <span className="font-bold">Не используем:</span> прочие сторонние рекламные и аналитические
                  сервисы (например, Google Analytics) — остальная статистика считается собственными средствами
                  Платформы
                </p>
              </div>
            </div>
          </section>

          {/* 3. Data Usage */}
          <section className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">3. Для чего мы используем данные</h2>
            <ul className="space-y-2 text-gray-400">
              <li>✓ Управление вашим аккаунтом и подпиской</li>
              <li>✓ Обработка платежей через YuKassa</li>
              <li>✓ Отправка писем о платежах и подписке</li>
              <li>✓ Улучшение качества сервиса</li>
              <li>✓ Соответствие требованиям закона (№422-ФЗ о налоге на профессиональный доход, НК РФ)</li>
              <li>✗ Продажа данных третьим лицам</li>
              <li>✗ Маркетинг без вашего согласия</li>
            </ul>
          </section>

          {/* 4. Data Protection */}
          <section className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">4. Защита данных</h2>
            <div className="space-y-3 text-gray-400">
              <p>🔒 Все данные передаются по HTTPS (SSL/TLS)</p>
              <p>🔐 Пароли хешируются алгоритмом bcryptjs (не обратимо)</p>
              <p>🔑 Чувствительные данные зашифрованы AES-256</p>
              <p>📋 Доступ к данным логируется в целях аудита</p>
              <p>👨‍💻 Доступ имеют только авторизованные сотрудники</p>
            </div>
          </section>

          {/* 5. Data Retention */}
          <section className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">5. Хранение данных</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#2D2350]">
                  <th className="text-left py-2 text-orange font-bold">Тип данных</th>
                  <th className="text-left py-2 text-orange font-bold">Период хранения</th>
                </tr>
              </thead>
              <tbody className="text-gray-400">
                <tr className="border-b border-[#2D2350]">
                  <td className="py-2">Учетные данные</td>
                  <td className="py-2">До удаления аккаунта + 30 дней</td>
                </tr>
                <tr className="border-b border-[#2D2350]">
                  <td className="py-2">Платежные данные</td>
                  <td className="py-2">7 лет (НК РФ статья 23)</td>
                </tr>
                <tr className="border-b border-[#2D2350]">
                  <td className="py-2">Логи безопасности</td>
                  <td className="py-2">1 год</td>
                </tr>
                <tr>
                  <td className="py-2">Данные об использовании</td>
                  <td className="py-2">3 месяца</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* 6. Your Rights */}
          <section className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">6. Ваши права (ФЗ-152 статьи 27-29)</h2>
            <div className="space-y-3 text-gray-400">
              <p>📥 <span className="font-bold">Право на доступ:</span> Запросить полную копию ваших данных в разделе <a href="/account/data" className="text-orange hover:underline">"Управление данными"</a></p>
              <p>✏️ <span className="font-bold">Право на исправление:</span> Изменить email или пароль в личном кабинете</p>
              <p>🗑️ <span className="font-bold">Право на забывание:</span> Удалить все персональные данные (кроме логов)</p>
              <p>📤 <span className="font-bold">Право на портативность:</span> Экспортировать данные в JSON</p>
            </div>
          </section>

          {/* 7. Third Parties */}
          <section className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">7. Третьи лица</h2>
            <p className="text-gray-400 mb-4">
              Мы передаём минимум данных следующим сервисам:
            </p>
            <div className="space-y-3 text-gray-400">
              <p>💳 <span className="font-bold">YuKassa:</span> ID платежа, сумма, способ оплаты (согласно их политике конфиденциальности)</p>
              <p>📧 <span className="font-bold">Email сервис:</span> Email адрес только для уведомлений</p>
              <p>❌ Никаких других третьих сторон</p>
            </div>
          </section>

          {/* 8. Contact */}
          <section className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">8. Контакты</h2>
            <p className="text-gray-400 mb-4">
              Если у вас есть вопросы о ваших данных или вы хотите воспользоваться своими правами:
            </p>
            <div className="space-y-2 text-gray-400">
              <p>📧 Email: <span className="font-bold">{LEGAL_ENTITY.contactEmail}</span></p>
              <p>⏰ Ответ в течение 30 дней согласно ФЗ-152 статья 28</p>
            </div>
          </section>

          {/* 9. Changes */}
          <section className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">9. Изменения политики</h2>
            <p className="text-gray-400 mb-4">
              Мы можем обновлять эту политику. Большие изменения уведомляются по email.
            </p>
            <p className="text-gray-400 text-sm">
              Последнее обновление: 9 июля 2026 г.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-12 border-t border-[#2D2350] text-center text-gray-400 text-sm">
          <p>© 2026 Знаторика. Все права защищены.</p>
          <p>Платформа соответствует Федеральному закону №152-ФЗ и работает в правовом поле РФ</p>
        </div>
      </div>
    </div>
  );
}
