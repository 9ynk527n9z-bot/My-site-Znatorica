// Вопросы основаны на теме app/4-klass/literatura/klassika/page.tsx:
// в ней упомянуты ровно три автора и их жанры —
// «сказки Пушкина, рассказы Толстого, басни Крылова».
// Конкретные произведения ниже — самые известные, однозначно принадлежащие
// именно этим авторам (каждый факт перепроверен дважды).

export type Author = 'Пушкин' | 'Толстой' | 'Крылов';

export const AUTHOR_LABELS: Record<Author, string> = {
  'Пушкин': 'А. С. Пушкин',
  'Толстой': 'Л. Н. Толстой',
  'Крылов': 'И. А. Крылов',
};

// Дополнительный «отвлекающий» автор — заведомо не подходит ни к одному
// произведению из списка, нужен только чтобы у вопроса было 4 варианта.
const DISTRACTOR_AUTHOR = 'С. Я. Маршак';

export interface KlassikaQuestion {
  id: string;
  work: string;
  author: Author;
}

// 17 произведений: 6 сказок Пушкина, 5 рассказов/былей Толстого, 6 басен Крылова
export const WORKS: KlassikaQuestion[] = [
  { id: 'rybak-rybka', work: '«Сказка о рыбаке и рыбке»', author: 'Пушкин' },
  { id: 'car-saltan', work: '«Сказка о царе Салтане»', author: 'Пушкин' },
  { id: 'zolotoy-petushok', work: '«Сказка о золотом петушке»', author: 'Пушкин' },
  { id: 'pop-balda', work: '«Сказка о попе и о работнике его Балде»', author: 'Пушкин' },
  { id: 'mertvaya-carevna', work: '«Сказка о мёртвой царевне и о семи богатырях»', author: 'Пушкин' },
  { id: 'ruslan-lyudmila', work: '«Руслан и Людмила»', author: 'Пушкин' },
  { id: 'lev-sobachka', work: '«Лев и собачка»', author: 'Толстой' },
  { id: 'kostochka', work: '«Косточка»', author: 'Толстой' },
  { id: 'filipok', work: '«Филипок»', author: 'Толстой' },
  { id: 'pryzhok', work: '«Прыжок»', author: 'Толстой' },
  { id: 'akula', work: '«Акула»', author: 'Толстой' },
  { id: 'vorona-lisitsa', work: '«Ворона и Лисица»', author: 'Крылов' },
  { id: 'strekoza-muravey', work: '«Стрекоза и Муравей»', author: 'Крылов' },
  { id: 'slon-moska', work: '«Слон и Моська»', author: 'Крылов' },
  { id: 'kvartet', work: '«Квартет»', author: 'Крылов' },
  { id: 'volk-yagnenok', work: '«Волк и Ягнёнок»', author: 'Крылов' },
  { id: 'lebed-rak-shchuka', work: '«Лебедь, Рак и Щука»', author: 'Крылов' },
];

export const ALL_AUTHORS: Author[] = ['Пушкин', 'Толстой', 'Крылов'];
export const OTHER_AUTHOR_LABEL = DISTRACTOR_AUTHOR;
