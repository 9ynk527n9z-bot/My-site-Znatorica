// Банк историй для тренажёра «Пересказ по картинкам» (4–5 лет).
// Каждая история — 3 шага в единственно верном логичном порядке (без вариативности).
export interface StoryStep {
  emoji: string;
  text: string;
}

export interface Story {
  id: string;
  title: string;
  steps: StoryStep[]; // steps[0] — первый шаг истории, ... , последний — конец истории
}

export const STORIES_4_5: Story[] = [
  {
    id: 'utro',
    title: 'Утро',
    steps: [
      { emoji: '😴', text: 'Мальчик спит' },
      { emoji: '⏰', text: 'Звонит будильник' },
      { emoji: '🥣', text: 'Мальчик завтракает' },
    ],
  },
  {
    id: 'snegovik',
    title: 'Снеговик',
    steps: [
      { emoji: '❄️', text: 'Идёт снег' },
      { emoji: '⛄', text: 'Дети лепят снеговика' },
      { emoji: '🥕', text: 'Снеговику приделали морковку-нос' },
    ],
  },
  {
    id: 'yabloko',
    title: 'Яблоко',
    steps: [
      { emoji: '🌳', text: 'На дереве растёт яблоко' },
      { emoji: '🍎', text: 'Яблоко падает в корзину' },
      { emoji: '😋', text: 'Девочка ест яблоко' },
    ],
  },
  {
    id: 'dozhd',
    title: 'Дождь',
    steps: [
      { emoji: '☀️', text: 'Светит солнце' },
      { emoji: '🌧️', text: 'Начинается дождь' },
      { emoji: '☂️', text: 'Мальчик открывает зонтик' },
    ],
  },
  {
    id: 'tort',
    title: 'Торт',
    steps: [
      { emoji: '🥚', text: 'Мама берёт яйца и муку' },
      { emoji: '🎂', text: 'В духовке печётся торт' },
      { emoji: '🍰', text: 'Семья ест торт за столом' },
    ],
  },
  {
    id: 'kupanie',
    title: 'Купание',
    steps: [
      { emoji: '🛁', text: 'Мама наливает воду в ванну' },
      { emoji: '🧼', text: 'Малыш моется с мылом' },
      { emoji: '🛌', text: 'Чистый малыш ложится спать' },
    ],
  },
  {
    id: 'cvetok',
    title: 'Цветок',
    steps: [
      { emoji: '🌱', text: 'В землю посадили семечко' },
      { emoji: '🌿', text: 'Из земли вырос росток' },
      { emoji: '🌸', text: 'Росток расцвёл цветком' },
    ],
  },
  {
    id: 'shar',
    title: 'Воздушный шарик',
    steps: [
      { emoji: '🎈', text: 'Мальчик держит воздушный шарик' },
      { emoji: '💨', text: 'Ветер вырывает шарик из рук' },
      { emoji: '😢', text: 'Мальчик грустит, глядя вслед шарику' },
    ],
  },
];
