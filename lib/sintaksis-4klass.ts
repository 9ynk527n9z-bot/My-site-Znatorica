export type SintaksisRole = 'podlezhaschee' | 'skazuemoe' | 'dopolnenie' | 'opredelenie' | 'obstoyatelstvo';

export const ROLE_LABELS: Record<SintaksisRole, string> = {
  podlezhaschee: 'Подлежащее',
  skazuemoe: 'Сказуемое',
  dopolnenie: 'Дополнение',
  opredelenie: 'Определение',
  obstoyatelstvo: 'Обстоятельство',
};

export const ALL_ROLES: SintaksisRole[] = [
  'podlezhaschee',
  'skazuemoe',
  'dopolnenie',
  'opredelenie',
  'obstoyatelstvo',
];

export interface SintaksisItem {
  /** Полное предложение с пунктуацией */
  sentence: string;
  /** Выделенное слово ровно так, как оно встречается в предложении */
  targetWord: string;
  /** Член предложения, которым является выделенное слово */
  role: SintaksisRole;
}

// Каждое предложение дважды проверено на грамматическую роль выделенного слова.
// Только бесспорные случаи: простые предложения, прямой порядок слов, без инверсий.
export const SINTAKSIS_SENTENCES: SintaksisItem[] = [
  // Подлежащее (кто? что? — главный член, о котором говорится в предложении)
  {
    sentence: 'Яркая радуга появилась после дождя.',
    targetWord: 'радуга',
    role: 'podlezhaschee', // появилась (что?) радуга
  },
  {
    sentence: 'Весёлые дети катались на горке.',
    targetWord: 'дети',
    role: 'podlezhaschee', // катались (кто?) дети
  },
  {
    sentence: 'Спелые яблоки падали на землю.',
    targetWord: 'яблоки',
    role: 'podlezhaschee', // падали (что?) яблоки
  },

  // Сказуемое (что делает предмет? — главный член, обозначающий действие)
  {
    sentence: 'Мама испекла вкусный пирог.',
    targetWord: 'испекла',
    role: 'skazuemoe', // мама что сделала? испекла
  },
  {
    sentence: 'Художник нарисовал красивую картину.',
    targetWord: 'нарисовал',
    role: 'skazuemoe', // художник что сделал? нарисовал
  },
  {
    sentence: 'Собака громко залаяла во дворе.',
    targetWord: 'залаяла',
    role: 'skazuemoe', // собака что сделала? залаяла
  },

  // Дополнение (вопросы косвенных падежей — кого? чего? кому? чем? и т.д.)
  {
    sentence: 'Учитель проверил тетради.',
    targetWord: 'тетради',
    role: 'dopolnenie', // проверил (что?) тетради
  },
  {
    sentence: 'Дедушка подарил внуку велосипед.',
    targetWord: 'внуку',
    role: 'dopolnenie', // подарил (кому?) внуку
  },
  {
    sentence: 'Мальчик читал интересную книгу.',
    targetWord: 'книгу',
    role: 'dopolnenie', // читал (что?) книгу
  },

  // Определение (какой? чей? — поясняет предмет)
  {
    sentence: 'На поляне выросли высокие грибы.',
    targetWord: 'высокие',
    role: 'opredelenie', // грибы (какие?) высокие
  },
  {
    sentence: 'Быстрая река несла лодку.',
    targetWord: 'быстрая',
    role: 'opredelenie', // река (какая?) быстрая
  },
  {
    sentence: 'Ласковое солнце пригревало землю.',
    targetWord: 'ласковое',
    role: 'opredelenie', // солнце (какое?) ласковое
  },

  // Обстоятельство (где? когда? как? куда? — поясняет действие)
  {
    sentence: 'Утром выпал первый снег.',
    targetWord: 'утром',
    role: 'obstoyatelstvo', // выпал (когда?) утром
  },
  {
    sentence: 'Ветер сильно дул с моря.',
    targetWord: 'сильно',
    role: 'obstoyatelstvo', // дул (как?) сильно
  },
  {
    sentence: 'Осенью птицы улетают на юг.',
    targetWord: 'осенью',
    role: 'obstoyatelstvo', // улетают (когда?) осенью
  },
];
