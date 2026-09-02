import type { QuizQuestion } from './types';

// Банки вопросов для 1 класса — соответствуют уровню теории на страницах тем.

export const PROZA_1: QuizQuestion[] = [
  { prompt: 'Как называется рассказ или сказка, написанные не в стихах?', options: ['Проза', 'Поэма', 'Считалка'], correct: 0 },
  { prompt: 'В сказке «Колобок» кто испёк Колобка?', options: ['Бабка', 'Дед', 'Лиса'], correct: 0 },
  { prompt: 'В сказке «Три медведя» сколько было медведей?', options: ['3', '2', '4'], correct: 0 },
  { prompt: 'В сказке «Репка» кто позвал на помощь Жучку?', options: ['Внучка', 'Дед', 'Кошка'], correct: 0 },
  { prompt: 'Как называется человек, который написал книгу?', options: ['Автор', 'Читатель', 'Художник'], correct: 0 },
  { prompt: 'Что идёт в самом начале сказки?', options: ['Зачин («Жили-были…»)', 'Конец истории', 'Мораль'], correct: 0 },
  { prompt: 'В сказке «Теремок» кто пришёл первым?', options: ['Мышка', 'Медведь', 'Лягушка'], correct: 0 },
  { prompt: 'Как называется, когда ты своими словами кратко рассказываешь то, что прочитал?', options: ['Пересказ', 'Рифма', 'Диалог'], correct: 0 },
  { prompt: 'Кто главный герой сказки «Красная Шапочка»?', options: ['Девочка в красной шапочке', 'Волк', 'Бабушка'], correct: 0 },
  { prompt: 'Какими словами часто заканчивается русская народная сказка?', options: ['«Тут и сказке конец, а кто слушал — молодец!»', '«Жили-были…»', 'Просто точка в конце строки'], correct: 0 },
];

export const STIHI_1: QuizQuestion[] = [
  { prompt: 'Чем стихи отличаются от прозы?', options: ['В стихах строчки рифмуются', 'В стихах нет слов', 'Стихи всегда короче'], correct: 0 },
  { prompt: 'Какое слово рифмуется со словом «кошка»?', options: ['Ложка', 'Стол', 'Окно'], correct: 0 },
  { prompt: 'Какое слово рифмуется со словом «мишка»?', options: ['Шишка', 'Дом', 'Книга'], correct: 0 },
  { prompt: 'Какое слово рифмуется со словом «дом»?', options: ['Гном', 'Стул', 'Кошка'], correct: 0 },
  { prompt: 'Как называется человек, который сочиняет стихи?', options: ['Поэт', 'Художник', 'Учитель'], correct: 0 },
  { prompt: 'Что такое рифма?', options: ['Созвучные окончания строк', 'Картинка к стиху', 'Название книги'], correct: 0 },
  { prompt: 'Какое слово рифмуется со словом «зайка»?', options: ['Байка', 'Лужа', 'Стол'], correct: 0 },
  { prompt: 'Стихи легче учить наизусть или прозу?', options: ['Стихи — из-за ритма и рифмы', 'Прозу — там нет правил', 'Одинаково'], correct: 0 },
  { prompt: 'Какое слово рифмуется со словом «снежок»?', options: ['Дружок', 'Стол', 'Мяч'], correct: 0 },
  { prompt: 'Считалка нужна, чтобы…', options: ['Выбрать, кто водит в игре', 'Решить пример', 'Написать письмо'], correct: 0 },
];

export const ANALOGII_1: QuizQuestion[] = [
  { prompt: 'Птица летает, а рыба…', options: ['Плавает', 'Прыгает', 'Ползает'], correct: 0 },
  { prompt: 'Собака — щенок, кошка — …', options: ['Котёнок', 'Цыплёнок', 'Жеребёнок'], correct: 0 },
  { prompt: 'День — светло, ночь — …', options: ['Темно', 'Жарко', 'Холодно'], correct: 0 },
  { prompt: 'Нож нужен, чтобы резать, а ложка — чтобы…', options: ['Есть', 'Писать', 'Копать'], correct: 0 },
  { prompt: 'Огонь — горячий, лёд — …', options: ['Холодный', 'Мягкий', 'Сладкий'], correct: 0 },
  { prompt: 'Рука — пальцы, нога — …', options: ['Пальцы', 'Ладонь', 'Плечо'], correct: 0 },
  { prompt: 'Зима — снег, лето — …', options: ['Жара', 'Мороз', 'Иней'], correct: 0 },
  { prompt: 'Книга нужна, чтобы читать, а карандаш — чтобы…', options: ['Рисовать', 'Есть', 'Спать'], correct: 0 },
  { prompt: 'Утка — утёнок, корова — …', options: ['Телёнок', 'Жеребёнок', 'Поросёнок'], correct: 0 },
  { prompt: 'Глаза нужны, чтобы видеть, а уши — чтобы…', options: ['Слышать', 'Нюхать', 'Пробовать'], correct: 0 },
];

export const ORIENTACIYA_1: QuizQuestion[] = [
  { prompt: 'Где находится потолок: сверху или снизу?', options: ['Сверху', 'Снизу', 'Сбоку'], correct: 0 },
  { prompt: 'Где находится пол: сверху или снизу?', options: ['Снизу', 'Сверху', 'Сбоку'], correct: 0 },
  { prompt: 'Если ты стоишь лицом к доске, где твоя спина?', options: ['Сзади', 'Спереди', 'Сверху'], correct: 0 },
  { prompt: 'Большинство людей пишет какой рукой?', options: ['Правой', 'Левой', 'Обеими'], correct: 0 },
  { prompt: 'Если предмет справа от тебя, где он относительно тебя?', options: ['Справа', 'Слева', 'Сзади'], correct: 0 },
  { prompt: 'Что выше: облака или трава?', options: ['Облака', 'Трава', 'Одинаково'], correct: 0 },
  { prompt: 'Солнце утром встаёт, а вечером…', options: ['Заходит', 'Останавливается', 'Не двигается'], correct: 0 },
  { prompt: 'Где обычно находится крыша дома?', options: ['Сверху', 'Снизу', 'Сбоку'], correct: 0 },
  { prompt: 'Если идти вперёд, а потом развернуться — куда пойдёшь?', options: ['Назад', 'Вперёд', 'Вверх'], correct: 0 },
  { prompt: 'Где обычно находится дверь в комнате: на стене или на потолке?', options: ['На стене', 'На потолке', 'Под полом'], correct: 0 },
];

// Настоящие загадки-метафоры (не прямые вопросы на эрудицию) — уровень
// соответствует тренажёру lib/riddles-1klass.ts, откуда взята часть текстов.
export const ZAGADKI_1: QuizQuestion[] = [
  { prompt: 'Висит груша — нельзя скушать.', options: ['Лампочка', 'Яблоко', 'Воздушный шарик'], correct: 0 },
  { prompt: 'Зимой и летом одним цветом.', options: ['Ёлка', 'Берёза', 'Дуб'], correct: 0 },
  { prompt: 'Что выше леса, краше света, без огня горит?', options: ['Солнце', 'Луна', 'Звезда'], correct: 0 },
  { prompt: 'Разноцветное коромысло над рекою повисло.', options: ['Радуга', 'Мост', 'Облако'], correct: 0 },
  { prompt: 'Тик-так, тик-так — ходят так, минутки все считают.', options: ['Часы', 'Календарь', 'Термометр'], correct: 0 },
  { prompt: 'Чёрный Ивашка — деревянная рубашка. Где носом поведёт, там заметку кладёт.', options: ['Карандаш', 'Ручка', 'Кисточка'], correct: 0 },
  { prompt: 'В нём себя увидеть можно, и не раз, а сколько хочешь.', options: ['Зеркало', 'Окно', 'Фотография'], correct: 0 },
  { prompt: 'Сердитый недотрога живёт в глуши лесной. Иголок очень много, а нитки ни одной.', options: ['Ёж', 'Кактус', 'Дикобраз'], correct: 0 },
  { prompt: 'Без окон, без дверей, полна горница людей.', options: ['Огурец', 'Арбуз', 'Дом'], correct: 0 },
  { prompt: 'Стоит Антошка на одной ножке. Его ищут, а он не откликается.', options: ['Гриб', 'Цветок', 'Пенёк'], correct: 0 },
];

export const SLOZHENIE_1: QuizQuestion[] = [
  { prompt: '5 + 3 = ?', options: ['8', '7', '9'], correct: 0 },
  { prompt: '4 + 4 = ?', options: ['8', '7', '6'], correct: 0 },
  { prompt: '6 + 2 = ?', options: ['8', '9', '7'], correct: 0 },
  { prompt: '3 + 5 = ?', options: ['8', '9', '7'], correct: 0 },
  { prompt: '7 + 3 = ?', options: ['10', '9', '11'], correct: 0 },
  { prompt: '2 + 6 = ?', options: ['8', '7', '9'], correct: 0 },
  { prompt: '5 + 5 = ?', options: ['10', '9', '11'], correct: 0 },
  { prompt: '1 + 9 = ?', options: ['10', '9', '11'], correct: 0 },
  { prompt: '6 + 4 = ?', options: ['10', '9', '11'], correct: 0 },
  { prompt: '4 + 5 = ?', options: ['9', '8', '10'], correct: 0 },
  { prompt: '3 + 7 = ?', options: ['10', '9', '11'], correct: 0 },
  { prompt: '5 + 2 = ?', options: ['7', '6', '8'], correct: 0 },
];

export const VYCHITANIE_1: QuizQuestion[] = [
  { prompt: '8 − 3 = ?', options: ['5', '4', '6'], correct: 0 },
  { prompt: '10 − 4 = ?', options: ['6', '5', '7'], correct: 0 },
  { prompt: '7 − 2 = ?', options: ['5', '4', '6'], correct: 0 },
  { prompt: '9 − 5 = ?', options: ['4', '5', '3'], correct: 0 },
  { prompt: '6 − 1 = ?', options: ['5', '4', '6'], correct: 0 },
  { prompt: '10 − 7 = ?', options: ['3', '4', '2'], correct: 0 },
  { prompt: '8 − 6 = ?', options: ['2', '3', '1'], correct: 0 },
  { prompt: '9 − 3 = ?', options: ['6', '5', '7'], correct: 0 },
  { prompt: '7 − 5 = ?', options: ['2', '3', '1'], correct: 0 },
  { prompt: '10 − 2 = ?', options: ['8', '7', '9'], correct: 0 },
  { prompt: '6 − 4 = ?', options: ['2', '3', '1'], correct: 0 },
  { prompt: '9 − 6 = ?', options: ['3', '4', '2'], correct: 0 },
];

export const SLOZHENIE_DO_20_1: QuizQuestion[] = [
  { prompt: '8 + 5 = ?', options: ['13', '12', '14'], correct: 0 },
  { prompt: '13 − 5 = ?', options: ['8', '7', '9'], correct: 0 },
  { prompt: '9 + 4 = ?', options: ['13', '14', '12'], correct: 0 },
  { prompt: '12 − 7 = ?', options: ['5', '4', '6'], correct: 0 },
  { prompt: '7 + 6 = ?', options: ['13', '12', '14'], correct: 0 },
  { prompt: '15 − 8 = ?', options: ['7', '6', '8'], correct: 0 },
  { prompt: '6 + 8 = ?', options: ['14', '13', '15'], correct: 0 },
  { prompt: '14 − 6 = ?', options: ['8', '7', '9'], correct: 0 },
  { prompt: '9 + 7 = ?', options: ['16', '15', '17'], correct: 0 },
  { prompt: '16 − 9 = ?', options: ['7', '6', '8'], correct: 0 },
  { prompt: '5 + 9 = ?', options: ['14', '13', '15'], correct: 0 },
  { prompt: '17 − 8 = ?', options: ['9', '8', '10'], correct: 0 },
];

export const SOSTAV_CHISLA_1: QuizQuestion[] = [
  { prompt: '5 = 2 + ?', options: ['3', '2', '4'], correct: 0 },
  { prompt: '6 = 4 + ?', options: ['2', '3', '1'], correct: 0 },
  { prompt: '7 = 3 + ?', options: ['4', '3', '5'], correct: 0 },
  { prompt: '8 = 5 + ?', options: ['3', '2', '4'], correct: 0 },
  { prompt: '9 = 6 + ?', options: ['3', '4', '2'], correct: 0 },
  { prompt: '10 = 7 + ?', options: ['3', '2', '4'], correct: 0 },
  { prompt: '10 = 4 + ?', options: ['6', '5', '7'], correct: 0 },
  { prompt: '8 = 2 + ?', options: ['6', '5', '7'], correct: 0 },
  { prompt: '6 = 1 + ?', options: ['5', '4', '6'], correct: 0 },
  { prompt: '9 = 4 + ?', options: ['5', '4', '6'], correct: 0 },
];

export const ZADACHI_1: QuizQuestion[] = [
  { prompt: 'У Кати было 4 шарика, ей подарили ещё 3. Сколько шариков стало?', options: ['7', '6', '8'], correct: 0 },
  { prompt: 'На тарелке было 6 конфет, 2 съели. Сколько конфет осталось?', options: ['4', '5', '3'], correct: 0 },
  { prompt: 'У Пети было 5 машинок, а у Вани на 2 больше. Сколько машинок у Вани?', options: ['7', '6', '8'], correct: 0 },
  { prompt: 'В корзине было 8 яблок, 3 забрали. Сколько яблок осталось?', options: ['5', '6', '4'], correct: 0 },
  { prompt: 'На ветке сидело 3 птицы, прилетели ещё 4. Сколько птиц стало?', options: ['7', '6', '8'], correct: 0 },
  { prompt: 'У Маши было 9 карандашей, 4 она подарила. Сколько осталось?', options: ['5', '4', '6'], correct: 0 },
  { prompt: 'В коробке было 2 кубика, положили ещё 6. Сколько кубиков стало?', options: ['8', '7', '9'], correct: 0 },
  { prompt: 'У бабушки было 10 огурцов, она отдала 4 соседке. Сколько осталось?', options: ['6', '5', '7'], correct: 0 },
];

export const PRAVILA_BEZOPASNOSTI_1: QuizQuestion[] = [
  { prompt: 'На какой свет светофора можно переходить дорогу?', options: ['Зелёный', 'Красный', 'Жёлтый'], correct: 0 },
  { prompt: 'На какой свет светофора нужно стоять?', options: ['Красный', 'Зелёный', 'Синий'], correct: 0 },
  { prompt: 'Где нужно переходить дорогу?', options: ['По пешеходному переходу', 'В любом месте', 'Через забор'], correct: 0 },
  { prompt: 'Что нужно сделать перед переходом дороги?', options: ['Посмотреть по сторонам', 'Побежать', 'Закрыть глаза'], correct: 0 },
  { prompt: 'Можно ли играть со спичками?', options: ['Нет, это опасно', 'Да, если тихо', 'Только вечером'], correct: 0 },
  { prompt: 'Куда звонить, если случился пожар?', options: ['101 (пожарная служба)', '100', '111'], correct: 0 },
  { prompt: 'Можно ли разговаривать с незнакомцами и уходить с ними?', options: ['Нет, нельзя', 'Да, если вежливо просят', 'Можно, если дадут конфету'], correct: 0 },
  { prompt: 'Что нужно делать, если потерялся в незнакомом месте?', options: ['Обратиться к взрослому в форме (охраннику, полицейскому)', 'Бежать куда глаза глядят', 'Плакать и ничего не делать'], correct: 0 },
  { prompt: 'Можно ли трогать оголённые провода?', options: ['Нет, это опасно', 'Да, если сухие руки', 'Можно немного'], correct: 0 },
  { prompt: 'Куда звонить при опасности для здоровья — скорую помощь?', options: ['103', '101', '102'], correct: 0 },
];

export const ZHIVAYA_NEZHIVAYA_PRIRODA_1: QuizQuestion[] = [
  { prompt: 'Что из этого — живая природа?', options: ['Дерево', 'Камень', 'Река'], correct: 0 },
  { prompt: 'Что из этого — неживая природа?', options: ['Камень', 'Гриб', 'Рыба'], correct: 0 },
  { prompt: 'Что из этого — живая природа?', options: ['Птица', 'Облако', 'Снег'], correct: 0 },
  { prompt: 'Что из этого — неживая природа?', options: ['Река', 'Дерево', 'Птица'], correct: 0 },
  { prompt: 'Что из этого — живая природа?', options: ['Гриб', 'Снег', 'Камень'], correct: 0 },
  { prompt: 'Что из этого — неживая природа?', options: ['Облако', 'Гриб', 'Дерево'], correct: 0 },
  { prompt: 'Что из этого не растёт и не дышит?', options: ['Камень', 'Цветок', 'Бабочка'], correct: 0 },
  { prompt: 'Что из этого умеет расти?', options: ['Дерево', 'Гора', 'Солнце'], correct: 0 },
  { prompt: 'Что из этого — неживая природа?', options: ['Снег', 'Рыба', 'Дерево'], correct: 0 },
  { prompt: 'Что из этого — живая природа?', options: ['Рыба', 'Камень', 'Облако'], correct: 0 },
];

export const GLASNYE_SOGLASNYE_1: QuizQuestion[] = [
  { prompt: 'Какая буква гласная: А, Б или В?', options: ['А', 'Б', 'В'], correct: 0 },
  { prompt: 'Какая буква согласная: О, М или Е?', options: ['М', 'О', 'Е'], correct: 0 },
  { prompt: 'Сколько всего гласных букв в русском языке?', options: ['10', '5', '20'], correct: 0 },
  { prompt: 'Гласный звук можно пропеть, а согласный…', options: ['Нельзя', 'Тоже можно', 'Только шёпотом'], correct: 0 },
  { prompt: 'Какая буква гласная: К, И или Т?', options: ['И', 'К', 'Т'], correct: 0 },
  { prompt: 'Сколько гласных звуков в слове «мама»?', options: ['2', '1', '3'], correct: 0 },
  { prompt: 'Сколько согласных звуков в слове «кот»?', options: ['2', '1', '3'], correct: 0 },
  { prompt: 'Какая буква согласная: Э, С или У?', options: ['С', 'Э', 'У'], correct: 0 },
  { prompt: 'При произнесении гласного звука воздух проходит свободно, без преград?', options: ['Да, без преград', 'Нет, с преградой', 'Не важно'], correct: 0 },
  { prompt: 'Сколько гласных букв в слове «окно»?', options: ['2', '1', '3'], correct: 0 },
];

export const PUNKTUACIYA_1: QuizQuestion[] = [
  { prompt: 'Какой знак ставится в конце обычного предложения?', options: ['Точка', 'Запятая', 'Двоеточие'], correct: 0 },
  { prompt: 'Какой знак ставится в конце вопросительного предложения?', options: ['Знак вопроса', 'Точка', 'Запятая'], correct: 0 },
  { prompt: 'Какой знак ставится после восклицания «Ура!»?', options: ['Восклицательный знак', 'Точка', 'Запятая'], correct: 0 },
  { prompt: 'С какой буквы начинается предложение?', options: ['С большой', 'С маленькой', 'С любой'], correct: 0 },
  { prompt: '«Как тебя зовут?» — какой это тип предложения?', options: ['Вопросительное', 'Восклицательное', 'Обычное'], correct: 0 },
  { prompt: '«Мама пришла домой.» — какой это тип предложения?', options: ['Повествовательное', 'Вопросительное', 'Восклицательное'], correct: 0 },
  { prompt: 'Что нужно поставить: «Привет___»', options: ['Восклицательный знак или точку', 'Запятую', 'Ничего'], correct: 0 },
  { prompt: 'Сколько предложений в тексте: «Идёт дождь. Дети дома.»?', options: ['2', '1', '3'], correct: 0 },
];

export const UDARENIE_1: QuizQuestion[] = [
  { prompt: 'На какой слог падает ударение в слове «молоко»?', options: ['На последний', 'На первый', 'На средний'], correct: 0 },
  { prompt: 'На какой слог падает ударение в слове «стол»?', options: ['Слово из одного слога', 'На второй', 'На третий'], correct: 0 },
  { prompt: 'Ударный слог — это слог, который...', options: ['Произносится сильнее и дольше остальных', 'Всегда первый в слове', 'Пишется с большой буквы'], correct: 0 },
  { prompt: 'На какой слог падает ударение в слове «автобус»?', options: ['На второй', 'На первый', 'На последний'], correct: 0 },
  { prompt: 'На какой слог падает ударение в слове «тетрадь»?', options: ['На последний', 'На первый', 'На средний'], correct: 0 },
  { prompt: 'Может ли одно и то же слово менять смысл в зависимости от ударения?', options: ['Да, ударение может менять значение слова', 'Нет, никогда', 'Только в стихах'], correct: 0 },
  { prompt: 'На какой слог падает ударение в слове «карандаш»?', options: ['На последний', 'На первый', 'На второй'], correct: 0 },
  { prompt: 'Сколько слогов в слове можно определить по количеству...', options: ['Гласных звуков', 'Согласных звуков', 'Букв всего'], correct: 0 },
  { prompt: 'На какой слог падает ударение в слове «школа»?', options: ['На первый', 'На последний', 'На средний'], correct: 0 },
  { prompt: 'На какой слог падает ударение в слове «река»?', options: ['На последний', 'На первый', 'На средний'], correct: 0 },
];

export const ZHI_SHI_CHA_SCHA_1: QuizQuestion[] = [
  { prompt: 'Как правильно написать слово?', options: ['Ежи', 'Ёжы', 'Ежо'], correct: 0 },
  { prompt: 'Как правильно написать слово?', options: ['Туча', 'Тучя', 'Тучо'], correct: 0 },
  { prompt: 'Как правильно написать слово?', options: ['Чулок', 'Чюлок', 'Чулка'], correct: 0 },
  { prompt: 'Можно ли проверить написание «жи-ши» ударением, как безударные гласные?', options: ['Нет, это нужно запомнить', 'Да, всегда', 'Только в конце слова'], correct: 0 },
  { prompt: 'Как правильно написать слово?', options: ['Жираф', 'Жыраф', 'Жираов'], correct: 0 },
  { prompt: 'Как правильно написать слово?', options: ['Чаща', 'Чяща', 'Чащя'], correct: 0 },
  { prompt: 'Как правильно написать слово?', options: ['Чудеса', 'Чюдеса', 'Чюдесо'], correct: 0 },
  { prompt: 'Как правильно написать слово?', options: ['Пружина', 'Пружына', 'Пружино'], correct: 0 },
  { prompt: 'Как правильно написать слово?', options: ['Роща', 'Рощя', 'Рощо'], correct: 0 },
  { prompt: 'Звуки [ж] и [ш] в русском языке — какие?', options: ['Всегда твёрдые', 'Всегда мягкие', 'То твёрдые, то мягкие'], correct: 0 },
  { prompt: 'Звуки [ч] и [щ] в русском языке — какие?', options: ['Всегда мягкие', 'Всегда твёрдые', 'То твёрдые, то мягкие'], correct: 0 },
  { prompt: 'Как правильно написать слово?', options: ['Щука', 'Щюка', 'Щуко'], correct: 0 },
  { prompt: 'Вставь пропущенную букву: «ч_сы»', options: ['а', 'я', 'о'], correct: 0 },
];

// Ровно те же 15 слов, что и в тренажёре «Животные по-английски»
// (lib/english-animals.ts, ENGLISH_ANIMALS) — теория и викторина должны совпадать.
export const ZHIVOTNYE_ANGLIYSKIY_1: QuizQuestion[] = [
  { prompt: 'Как по-английски «кошка»?', options: ['Cat', 'Dog', 'Cow'], correct: 0 },
  { prompt: 'Как по-английски «собака»?', options: ['Dog', 'Cat', 'Pig'], correct: 0 },
  { prompt: 'Что значит слово «Bird»?', options: ['Птица', 'Рыба', 'Утка'], correct: 0 },
  { prompt: 'Что значит слово «Fish»?', options: ['Рыба', 'Лягушка', 'Птица'], correct: 0 },
  { prompt: 'Как по-английски «кролик»?', options: ['Rabbit', 'Horse', 'Mouse'], correct: 0 },
  { prompt: 'Что значит слово «Horse»?', options: ['Лошадь', 'Корова', 'Свинья'], correct: 0 },
  { prompt: 'Как по-английски «корова»?', options: ['Cow', 'Pig', 'Bear'], correct: 0 },
  { prompt: 'Что значит слово «Pig»?', options: ['Свинья', 'Утка', 'Медведь'], correct: 0 },
  { prompt: 'Как по-английски «утка»?', options: ['Duck', 'Frog', 'Bird'], correct: 0 },
  { prompt: 'Что значит слово «Frog»?', options: ['Лягушка', 'Мышь', 'Лев'], correct: 0 },
  { prompt: 'Как по-английски «медведь»?', options: ['Bear', 'Lion', 'Elephant'], correct: 0 },
  { prompt: 'Что значит слово «Lion»?', options: ['Лев', 'Слон', 'Обезьяна'], correct: 0 },
  { prompt: 'Как по-английски «слон»?', options: ['Elephant', 'Monkey', 'Mouse'], correct: 0 },
  { prompt: 'Что значит слово «Monkey»?', options: ['Обезьяна', 'Мышь', 'Кошка'], correct: 0 },
  { prompt: 'Как по-английски «мышь»?', options: ['Mouse', 'Fish', 'Dog'], correct: 0 },
];

export const FOOD_ANGLIYSKIY_1: QuizQuestion[] = [
  { prompt: 'Как по-английски «яблоко»?', options: ['Apple', 'Banana', 'Orange'], correct: 0 },
  { prompt: 'Что значит слово «Banana»?', options: ['Банан', 'Апельсин', 'Морковь'], correct: 0 },
  { prompt: 'Как по-английски «хлеб»?', options: ['Bread', 'Cake', 'Sandwich'], correct: 0 },
  { prompt: 'Что значит слово «Milk»?', options: ['Молоко', 'Вода', 'Сок'], correct: 0 },
  { prompt: 'Как по-английски «яйцо»?', options: ['Egg', 'Cheese', 'Soup'], correct: 0 },
  { prompt: 'Что значит слово «Cheese»?', options: ['Сыр', 'Хлеб', 'Торт'], correct: 0 },
  { prompt: 'Как по-английски «торт»?', options: ['Cake', 'Ice cream', 'Sandwich'], correct: 0 },
  { prompt: 'Что значит слово «Juice»?', options: ['Сок', 'Вода', 'Молоко'], correct: 0 },
  { prompt: 'Как по-английски «вода»?', options: ['Water', 'Juice', 'Milk'], correct: 0 },
  { prompt: 'Что значит слово «Ice cream»?', options: ['Мороженое', 'Торт', 'Суп'], correct: 0 },
  { prompt: 'Как по-английски «бутерброд»?', options: ['Sandwich', 'Soup', 'Bread'], correct: 0 },
  { prompt: 'Что значит слово «Soup»?', options: ['Суп', 'Бутерброд', 'Яйцо'], correct: 0 },
  { prompt: 'Как по-английски «морковь»?', options: ['Carrot', 'Orange', 'Apple'], correct: 0 },
  { prompt: 'Что значит слово «Orange»?', options: ['Апельсин', 'Банан', 'Морковь'], correct: 0 },
  { prompt: 'Как по-английски «сыр»?', options: ['Cheese', 'Milk', 'Egg'], correct: 0 },
];

export const CLOTHES_ANGLIYSKIY_1: QuizQuestion[] = [
  { prompt: 'Как по-английски «футболка»?', options: ['T-shirt', 'Shirt', 'Dress'], correct: 0 },
  { prompt: 'Что значит слово «Shirt»?', options: ['Рубашка', 'Платье', 'Шорты'], correct: 0 },
  { prompt: 'Как по-английски «платье»?', options: ['Dress', 'Trousers', 'Socks'], correct: 0 },
  { prompt: 'Что значит слово «Trousers»?', options: ['Брюки', 'Шорты', 'Носки'], correct: 0 },
  { prompt: 'Как по-английски «шорты»?', options: ['Shorts', 'Socks', 'Shoes'], correct: 0 },
  { prompt: 'Что значит слово «Socks»?', options: ['Носки', 'Ботинки', 'Перчатки'], correct: 0 },
  { prompt: 'Как по-английски «туфли»?', options: ['Shoes', 'Boots', 'Hat'], correct: 0 },
  { prompt: 'Что значит слово «Boots»?', options: ['Ботинки', 'Туфли', 'Шапка'], correct: 0 },
  { prompt: 'Как по-английски «шапка»?', options: ['Hat', 'Scarf', 'Gloves'], correct: 0 },
  { prompt: 'Что значит слово «Jacket»?', options: ['Куртка', 'Шарф', 'Платье'], correct: 0 },
  { prompt: 'Как по-английски «перчатки»?', options: ['Gloves', 'Socks', 'Boots'], correct: 0 },
  { prompt: 'Что значит слово «Scarf»?', options: ['Шарф', 'Шапка', 'Куртка'], correct: 0 },
];

export const FAMILY_ANGLIYSKIY_1: QuizQuestion[] = [
  { prompt: 'Как по-английски «мама»?', options: ['Mother', 'Father', 'Sister'], correct: 0 },
  { prompt: 'Что значит слово «Father»?', options: ['Папа', 'Брат', 'Дедушка'], correct: 0 },
  { prompt: 'Как по-английски «сестра»?', options: ['Sister', 'Brother', 'Daughter'], correct: 0 },
  { prompt: 'Что значит слово «Brother»?', options: ['Брат', 'Сестра', 'Сын'], correct: 0 },
  { prompt: 'Как по-английски «бабушка»?', options: ['Grandmother', 'Grandfather', 'Aunt'], correct: 0 },
  { prompt: 'Что значит слово «Grandfather»?', options: ['Дедушка', 'Бабушка', 'Дядя'], correct: 0 },
  { prompt: 'Как по-английски «малыш»?', options: ['Baby', 'Son', 'Daughter'], correct: 0 },
  { prompt: 'Что значит слово «Family»?', options: ['Семья', 'Малыш', 'Дядя'], correct: 0 },
  { prompt: 'Как по-английски «сын»?', options: ['Son', 'Daughter', 'Uncle'], correct: 0 },
  { prompt: 'Что значит слово «Daughter»?', options: ['Дочь', 'Сын', 'Тётя'], correct: 0 },
  { prompt: 'Как по-английски «тётя»?', options: ['Aunt', 'Uncle', 'Mother'], correct: 0 },
  { prompt: 'Что значит слово «Uncle»?', options: ['Дядя', 'Тётя', 'Папа'], correct: 0 },
];

export const WEATHER_ANGLIYSKIY_1: QuizQuestion[] = [
  { prompt: 'Как по-английски «солнце»?', options: ['Sun', 'Rain', 'Cloud'], correct: 0 },
  { prompt: 'Что значит слово «Rain»?', options: ['Дождь', 'Снег', 'Ветер'], correct: 0 },
  { prompt: 'Как по-английски «снег»?', options: ['Snow', 'Fog', 'Storm'], correct: 0 },
  { prompt: 'Что значит слово «Wind»?', options: ['Ветер', 'Облако', 'Радуга'], correct: 0 },
  { prompt: 'Как по-английски «облако»?', options: ['Cloud', 'Rainbow', 'Sun'], correct: 0 },
  { prompt: 'Что значит слово «Storm»?', options: ['Гроза', 'Туман', 'Снег'], correct: 0 },
  { prompt: 'Как по-английски «радуга»?', options: ['Rainbow', 'Storm', 'Wind'], correct: 0 },
  { prompt: 'Что значит слово «Hot»?', options: ['Жарко', 'Холодно', 'Туман'], correct: 0 },
  { prompt: 'Как по-английски «холодно»?', options: ['Cold', 'Hot', 'Rain'], correct: 0 },
  { prompt: 'Что значит слово «Fog»?', options: ['Туман', 'Гроза', 'Облако'], correct: 0 },
];

export const SCHOOL_ANGLIYSKIY_1: QuizQuestion[] = [
  { prompt: 'Как по-английски «книга»?', options: ['Book', 'Notebook', 'Pen'], correct: 0 },
  { prompt: 'Что значит слово «Pen»?', options: ['Ручка', 'Карандаш', 'Линейка'], correct: 0 },
  { prompt: 'Как по-английски «карандаш»?', options: ['Pencil', 'Crayon', 'Pen'], correct: 0 },
  { prompt: 'Что значит слово «Ruler»?', options: ['Линейка', 'Ножницы', 'Тетрадь'], correct: 0 },
  { prompt: 'Как по-английски «рюкзак»?', options: ['Bag', 'Book', 'Chair'], correct: 0 },
  { prompt: 'Что значит слово «Notebook»?', options: ['Тетрадь', 'Книга', 'Стул'], correct: 0 },
  { prompt: 'Как по-английски «стул»?', options: ['Chair', 'Clock', 'Globe'], correct: 0 },
  { prompt: 'Что значит слово «Scissors»?', options: ['Ножницы', 'Краски', 'Восковой мелок'], correct: 0 },
  { prompt: 'Как по-английски «восковой мелок»?', options: ['Crayon', 'Paint', 'Pencil'], correct: 0 },
  { prompt: 'Что значит слово «Paint»?', options: ['Краски', 'Глобус', 'Компьютер'], correct: 0 },
  { prompt: 'Как по-английски «глобус»?', options: ['Globe', 'Clock', 'Computer'], correct: 0 },
  { prompt: 'Что значит слово «Clock»?', options: ['Часы', 'Компьютер', 'Рюкзак'], correct: 0 },
  { prompt: 'Как по-английски «компьютер»?', options: ['Computer', 'Globe', 'Clock'], correct: 0 },
];
