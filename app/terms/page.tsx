import Link from 'next/link';
import { LEGAL_ENTITY } from '@/lib/legal';

export const metadata = {
  title: 'Условия использования',
  description: 'Условия использования развивающей платформы Знаторика.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <div className="legal-page py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Условия использования</h1>
        <p className="text-gray-400 mb-12">Последнее обновление: 9 июля 2026 г.</p>

        <div className="space-y-8">
          <section className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">1. Общие положения</h2>
            <p className="text-gray-400 mb-3">
              Используя платформу "Знаторика" (znatorica.ru), вы соглашаетесь с настоящими условиями использования. Если вы не согласны с каким-либо пунктом, пожалуйста, не используйте платформу.
            </p>
            <p className="text-gray-400">
              Платформу предоставляет {LEGAL_ENTITY.fullName} ({LEGAL_ENTITY.status}, ИНН {LEGAL_ENTITY.inn}).
              Условия оплаты платных услуг регулируются{' '}
              <Link href="/oferta" className="text-orange hover:underline">
                Публичной офертой
              </Link>
              .
            </p>
          </section>

          <section className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">2. Кто может регистрироваться</h2>
            <p className="text-gray-400">
              Платформа предназначена для детей 4–11 лет, но регистрацию аккаунта и оплату подписки
              осуществляет дееспособное совершеннолетнее лицо — родитель или иной законный представитель
              ребёнка. Регистрируясь, вы подтверждаете, что вам исполнилось 18 лет и что вы действуете от
              своего имени и, при использовании платформы ребёнком, — в качестве его родителя или законного
              представителя.
            </p>
          </section>

          <section className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">3. Описание услуг</h2>
            <p className="text-gray-400">
              Платформа предоставляет развивающие материалы для детей 4–11 лет: интерактивные тренажёры, генераторы заданий, теоретические материалы, шпаргалки и материалы для учителей. Платформа не является образовательной организацией и не заявляет соответствие ФГОС — подробнее в{' '}
              <Link href="/oferta" className="text-orange hover:underline">
                Публичной оферте
              </Link>
              .
            </p>
          </section>

          <section className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">4. Подписка и оплата</h2>
            <ul className="text-gray-400 space-y-2 list-disc list-inside mb-3">
              <li>Подписка автоматически продлевается, если не отменена</li>
              <li>Отмена подписки доступна в личном кабинете в любой момент</li>
              <li>При отмене доступ сохраняется до конца оплаченного периода</li>
              <li>Оплата принимается через ЮKassa: карты MIR, СБП, Сбербанк Онлайн и другие разрешённые в РФ способы</li>
            </ul>
            <p className="text-gray-400">
              Полные условия оплаты, автопродления и возврата денежных средств — в{' '}
              <Link href="/oferta" className="text-orange hover:underline">
                Публичной оферте
              </Link>
              . Актуальная стоимость — на странице{' '}
              <Link href="/podpiska" className="text-orange hover:underline">
                /podpiska
              </Link>
              .
            </p>
          </section>

          <section className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">5. Обязанности пользователя</h2>
            <ul className="text-gray-400 space-y-2 list-disc list-inside">
              <li>Предоставлять достоверные данные при регистрации</li>
              <li>Не передавать доступ к аккаунту третьим лицам</li>
              <li>Не использовать платформу для незаконных целей</li>
              <li>Не копировать и не распространять материалы платформы без разрешения</li>
            </ul>
          </section>

          <section className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">6. Интеллектуальная собственность</h2>
            <p className="text-gray-400 mb-3">
              Правообладатель — {LEGAL_ENTITY.fullName}. Все материалы платформы (тексты статей и тем,
              рабочие листы, иллюстрации, код тренажёров и генераторов, алгоритмы генерации заданий)
              являются объектами авторского права правообладателя и охраняются частью 4 Гражданского
              кодекса РФ (в том числе ст. 1259, 1270, 1301). Авторское
              право возникает в силу создания произведения и не требует регистрации.
            </p>
            <p className="text-gray-400 mb-3">Без письменного согласия правообладателя запрещается:</p>
            <ul className="text-gray-400 space-y-2 list-disc list-inside mb-3">
              <li>Копировать, повторно публиковать, продавать или иным образом распространять материалы платформы, включая распечатанные и экспортированные (PDF/PNG/Word) рабочие листы</li>
              <li>Автоматически собирать (скрапить, парсить) контент сайта, в том числе с помощью ботов и скриптов</li>
              <li>Использовать материалы или алгоритмы генерации заданий для создания конкурирующего продукта или обучения моделей машинного обучения</li>
              <li>Удалять или изменять указание на авторство/источник на материалах платформы</li>
            </ul>
            <p className="text-gray-400">
              Нарушение может повлечь ответственность по ст. 1301 ГК РФ (компенсация до 5 000 000 ₽ вместо
              доказывания убытков) и ст. 7.12 КоАП РФ.
            </p>
          </section>

          <section className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">7. Ограничение ответственности</h2>
            <p className="text-gray-400">
              Платформа предоставляется "как есть". Мы стремимся обеспечить бесперебойную работу, но не гарантируем отсутствие технических сбоев.
            </p>
          </section>

          <section className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">8. Персональные данные</h2>
            <p className="text-gray-400">
              Обработка персональных данных осуществляется согласно нашей{' '}
              <a href="/privacy" className="text-orange hover:underline">
                Политике конфиденциальности
              </a>{' '}
              и Федеральному закону №152-ФЗ.
            </p>
          </section>

          <section className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">9. Изменение условий</h2>
            <p className="text-gray-400">
              Мы можем обновлять данные условия. О существенных изменениях пользователи уведомляются по email.
            </p>
          </section>

          <section className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">10. Применимое право и контакты</h2>
            <p className="text-gray-400">
              Настоящие условия регулируются законодательством РФ. По всем вопросам, включая оферту,
              возврат средств и персональные данные, обращайтесь на email:{' '}
              <span className="font-bold">{LEGAL_ENTITY.contactEmail}</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
