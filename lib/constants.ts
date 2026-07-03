export const SEGMENTS = [
  { id: '4-5-let', name: 'Дошкольники 4–5 лет' },
  { id: '6-7-let', name: 'Дошкольники 6–7 лет' },
  { id: '1-klass', name: '1 класс' },
  { id: '2-klass', name: '2 класс' },
  { id: '3-klass', name: '3 класс' },
  { id: '4-klass', name: '4 класс' },
];

export const SUBJECTS = [
  { id: 'matematika', name: 'Математика', icon: '🔢' },
  { id: 'russkiy', name: 'Русский язык', icon: '📝' },
  { id: 'angliyskiy', name: 'Английский язык', icon: '🇬🇧' },
  { id: 'chtenie', name: 'Чтение', icon: '📖' },
  { id: 'okruzhayushchiy-mir', name: 'Окружающий мир', icon: '🌍' },
];

export const FORMATS = [
  { id: 'teoria', name: 'Теория', free: true, paid: false },
  { id: 'shpargalka', name: 'Шпаргалка', free: true, paid: false },
  { id: 'test', name: 'Тесты', free: true, paid: true },
  { id: 'trenazher', name: 'Тренажёр', free: false, paid: true },
  { id: 'igra', name: 'Игра', free: false, paid: true },
  { id: 'kartochki', name: 'Карточки', free: false, paid: true },
  { id: 'generator', name: 'Генератор', free: true, paid: true }, // 10 раз бесплатно
  { id: 'plakat', name: 'Плакат', free: false, paid: true },
  { id: 'material-teacher', name: 'Материал для учителя', free: false, paid: true },
  { id: 'vpr', name: 'ВПР', free: false, paid: true },
];

export const SUBSCRIPTION_PRICE = 29900; // в копейках (299 ₽)
export const FREE_GENERATOR_LIMIT = 10; // раз в день для неавторизованных
