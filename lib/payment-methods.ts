// YuKassa Payment Methods - ТОЛЬКО РАЗРЕШЁННЫЕ В РФ (Июль 2026)
// Согласно текущему законодательству и санкциям

export const ALLOWED_PAYMENT_METHODS = {
  // Национальная платёжная система
  mir_card: {
    id: 'bank_card',
    name: 'Карта MIR',
    icon: '🇷🇺',
    enabled: true,
  },

  // Быстрая система платежей - по номеру телефона
  sbp: {
    id: 'sbp',
    name: 'СБП (Быстрые платежи)',
    icon: '📱',
    enabled: true,
  },

  // Банки
  sberbank: {
    id: 'sberbank',
    name: 'Сбербанк Онлайн',
    icon: '🏦',
    enabled: true,
  },

  // Электронные кошельки
  yandex_kassa: {
    id: 'yandex_kassa',
    name: 'Яндекс.Касса',
    icon: '💛',
    enabled: true,
  },

  qiwi: {
    id: 'qiwi',
    name: 'QIWI',
    icon: '💳',
    enabled: true,
  },

  // Мобильные операторы
  mts: {
    id: 'mobile_payment',
    name: 'МТС (счёт оператора)',
    icon: '📞',
    enabled: true,
  },

  beeline: {
    id: 'mobile_payment',
    name: 'Beeline (счёт оператора)',
    icon: '📞',
    enabled: true,
  },
};

// Методы, которые ЗАПРЕЩЕНЫ в РФ (не использовать)
export const BLOCKED_PAYMENT_METHODS = [
  'visa',
  'mastercard',
  'american_express',
  'paypal',
  'apple_pay',
  'google_pay',
  'crypto',
  'bitcoin',
  'ethereum',
  'western_union',
  'moneygram',
];

// Получить только разрешённые методы
export function getAllowedMethods() {
  return Object.values(ALLOWED_PAYMENT_METHODS)
    .filter((method) => method.enabled)
    .map((method) => ({
      id: method.id,
      name: method.name,
      icon: method.icon,
    }));
}

// Проверить, разрешён ли метод
export function isMethodAllowed(methodId: string): boolean {
  return (
    !BLOCKED_PAYMENT_METHODS.includes(methodId) &&
    Object.values(ALLOWED_PAYMENT_METHODS).some(
      (m) => m.id === methodId && m.enabled
    )
  );
}
