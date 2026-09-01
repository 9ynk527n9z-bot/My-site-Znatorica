import Link from 'next/link';
import { LEGAL_ENTITY } from '@/lib/legal';
import { SUBSCRIPTION_PRICE, LIFETIME_PRICE } from '@/lib/constants';

export const metadata = {
  title: 'Публичная оферта',
  description: 'Договор публичной оферты на оказание услуг доступа к платформе Знаторика.',
  alternates: { canonical: '/oferta' },
  robots: { index: true, follow: true },
};

export default function OfertaPage() {
  const monthly = (SUBSCRIPTION_PRICE / 100).toLocaleString('ru-RU');
  const lifetime = (LIFETIME_PRICE / 100).toLocaleString('ru-RU');

  return (
    <div className="legal-page py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Публичная оферта</h1>
        <p className="text-gray-400 mb-2">
          Договор на оказание услуг доступа к платформе «Знаторика» (znatorica.ru)
        </p>
        <p className="text-gray-500 text-sm mb-12">Последнее обновление: 9 июля 2026 г.</p>

        <div className="space-y-8">
          <section className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">1. Общие положения</h2>
            <p className="text-gray-400 mb-3">
              Исполнитель — {LEGAL_ENTITY.fullName} ({LEGAL_ENTITY.status}, ИНН {LEGAL_ENTITY.inn},{' '}
              {LEGAL_ENTITY.city}). Настоящий документ является публичной офертой Исполнителя в адрес
              любого дееспособного физического лица — далее «Заказчик» — заключить договор оказания услуг
              на условиях, изложенных ниже, в соответствии со ст. 437 Гражданского кодекса РФ.
            </p>
            <p className="text-gray-400">
              Регистрация на платформе и последующая оплата подписки или разового доступа означает полное
              и безоговорочное принятие (акцепт) настоящей оферты в соответствии со ст. 438 ГК РФ.
            </p>
          </section>

          <section className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">2. Предмет договора</h2>
            <p className="text-gray-400 mb-3">
              Исполнитель предоставляет Заказчику доступ к развивающей онлайн-платформе «Знаторика»:
              интерактивным тренажёрам, генераторам заданий, теоретическим материалам, шпаргалкам и
              вариантам для подготовки к ВПР для детей 4–11 лет.
            </p>
            <p className="text-gray-400">
              Платформа носит развивающий характер и не является образовательной организацией в смысле
              Федерального закона №273-ФЗ «Об образовании в РФ» — у Исполнителя нет и не заявляется
              образовательная лицензия. Услуги не заменяют школьное обучение и не гарантируют освоение
              государственного образовательного стандарта.
            </p>
          </section>

          <section className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">3. Стоимость услуг и порядок оплаты</h2>
            <ul className="text-gray-400 space-y-2 list-disc list-inside mb-3">
              <li>Помесячная подписка — {monthly} ₽ в месяц с автоматическим продлением</li>
              <li>Разовый платёж «Навсегда» — {lifetime} ₽, без повторных списаний</li>
              <li>
                Актуальная стоимость всегда указана на странице{' '}
                <Link href="/podpiska" className="text-orange hover:underline">
                  /podpiska
                </Link>{' '}
                на момент оплаты
              </li>
              <li>Оплата принимается через ЮKassa разрешёнными в РФ способами</li>
              <li>Услуга считается оказанной с момента открытия доступа к платным материалам</li>
            </ul>
          </section>

          <section className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">4. Автопродление и отказ от подписки</h2>
            <p className="text-gray-400 mb-3">
              Помесячная подписка продлевается автоматически до тех пор, пока Заказчик не отменит её в
              личном кабинете. Отмена доступна в любой момент и вступает в силу с начала следующего
              расчётного периода — до конца уже оплаченного периода доступ сохраняется в полном объёме.
              Разовый платёж «Навсегда» не предполагает продления и повторных списаний.
            </p>
          </section>

          <section className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">5. Возврат денежных средств</h2>
            <p className="text-gray-400 mb-3">
              В соответствии со ст. 32 Закона РФ «О защите прав потребителей» Заказчик вправе отказаться
              от услуг в любой момент при условии оплаты Исполнителю фактически понесённых расходов.
            </p>
            <ul className="text-gray-400 space-y-2 list-disc list-inside">
              <li>
                Если оплаченным периодом подписки Заказчик ещё не начал пользоваться — возврат в полном
                объёме в течение 7 дней с момента оплаты
              </li>
              <li>
                Если доступ уже был использован — возврат за вычетом стоимости фактически истёкшей части
                оплаченного периода
              </li>
              <li>
                Для разового платежа «Навсегда»: возврат в полном объёме в течение 7 дней с момента оплаты,
                если Заказчик не пользовался платными материалами; далее — по фактическому использованию
              </li>
              <li>
                Для оформления возврата — обращение на {LEGAL_ENTITY.contactEmail} с указанием email
                аккаунта и причины; срок рассмотрения — до 10 рабочих дней
              </li>
            </ul>
          </section>

          <section className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">6. Права и обязанности сторон</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-bold text-orange mb-2">Исполнитель обязуется:</h3>
                <ul className="text-gray-400 space-y-1 list-disc list-inside ml-2">
                  <li>Предоставить доступ к оплаченным материалам платформы</li>
                  <li>Обеспечивать сохранность персональных данных согласно Политике конфиденциальности</li>
                  <li>Уведомлять о существенных изменениях условий по email</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-orange mb-2">Заказчик обязуется:</h3>
                <ul className="text-gray-400 space-y-1 list-disc list-inside ml-2">
                  <li>Предоставлять достоверные данные при регистрации и оплате</li>
                  <li>Не передавать доступ к оплаченному аккаунту третьим лицам на возмездной основе</li>
                  <li>Своевременно оплачивать выбранный тариф</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">7. Ответственность сторон</h2>
            <p className="text-gray-400">
              Стороны несут ответственность в соответствии с действующим законодательством РФ. Исполнитель
              не несёт ответственности за временную недоступность платформы по техническим причинам, не
              зависящим от Исполнителя, а также за обстоятельства непреодолимой силы.
            </p>
          </section>

          <section className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">8. Расчётные документы</h2>
            <p className="text-gray-400">
              Исполнитель применяет специальный налоговый режим «Налог на профессиональный доход»
              (Федеральный закон №422-ФЗ) и не использует контрольно-кассовую технику. Чек по каждой
              оплате формируется в приложении «Мой налог» и направляется Заказчику на email, указанный
              при оплате.
            </p>
          </section>

          <section className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">9. Персональные данные</h2>
            <p className="text-gray-400">
              Обработка персональных данных Заказчика осуществляется в соответствии с{' '}
              <Link href="/privacy" className="text-orange hover:underline">
                Политикой конфиденциальности
              </Link>{' '}
              и Федеральным законом №152-ФЗ «О персональных данных».
            </p>
          </section>

          <section className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">10. Разрешение споров</h2>
            <p className="text-gray-400">
              Все споры и разногласия стороны стремятся разрешить путём переговоров. Заказчик вправе
              направить претензию на {LEGAL_ENTITY.contactEmail}; срок ответа на претензию — 30 дней с
              момента получения. При недостижении согласия спор передаётся в суд по месту жительства
              Заказчика или по месту регистрации Исполнителя ({LEGAL_ENTITY.city}) в соответствии с
              законодательством РФ.
            </p>
          </section>

          <section className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">11. Срок действия и изменение оферты</h2>
            <p className="text-gray-400">
              Оферта действует бессрочно с момента размещения на сайте. Исполнитель вправе вносить
              изменения в одностороннем порядке; актуальная редакция всегда доступна по адресу
              znatorica.ru/oferta. Продолжение использования платформы после изменений означает согласие
              с новой редакцией.
            </p>
          </section>

          <section id="rekvizity" className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6 scroll-mt-6">
            <h2 className="text-2xl font-bold mb-4">12. Реквизиты Исполнителя</h2>
            <ul className="text-gray-400 space-y-1">
              <li>
                <span className="font-bold text-white">ФИО:</span> {LEGAL_ENTITY.fullName}
              </li>
              <li>
                <span className="font-bold text-white">Статус:</span> {LEGAL_ENTITY.status}
              </li>
              <li>
                <span className="font-bold text-white">ИНН:</span> {LEGAL_ENTITY.inn}
              </li>
              <li>
                <span className="font-bold text-white">Место регистрации:</span> {LEGAL_ENTITY.city}
              </li>
              <li>
                <span className="font-bold text-white">Email:</span> {LEGAL_ENTITY.contactEmail}
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
