export interface Game {
  id: string;
  name: string;
  description: string;
  icon: string;
  url: string;
}

export const GAMES: Game[] = [
  { id: 'krestiki-noliki', name: 'Крестики-нолики', description: 'Классическая игра против компьютера — три в ряд быстрее соперника', icon: '🎯', url: '/trenazher/krestiki-noliki' },
  { id: 'ugaday-slovo', name: 'Угадай слово', description: 'Отгадай загаданное слово по буквам, пока не кончились жизни', icon: '🔤', url: '/trenazher/ugaday-slovo' },
  { id: 'pyatnashki', name: 'Пятнашки', description: 'Собери числа по порядку, двигая плитки по одной', icon: '🔢', url: '/trenazher/pyatnashki' },
  { id: 'slova-iz-slova', name: 'Слова из слова', description: 'Найди маленькие слова, спрятанные в одном большом слове', icon: '🧠', url: '/trenazher/slova-iz-slova' },
  { id: 'sudoku-igra', name: 'Судоку', description: 'Заполни сетку числами так, чтобы они не повторялись в строке, столбце и квадрате', icon: '🔲', url: '/trenazher/sudoku-igra' },
  { id: 'sobery-slovo', name: 'Собери слово', description: 'Расставь перепутанные буквы в правильном порядке', icon: '🔡', url: '/trenazher/sobery-slovo' },
  { id: 'matematicheskaya-lesenka', name: 'Математическая лесенка', description: 'Поднимайся по лесенке примеров — чем выше, тем сложнее', icon: '🪜', url: '/trenazher/matematicheskaya-lesenka' },
  { id: 'zmeyka-s-chislami', name: 'Змейка с числами', description: 'Веди змейку и собирай числа по порядку от 1 и дальше', icon: '🐍', url: '/trenazher/zmeyka-s-chislami' },
  { id: 'morskoy-boy', name: 'Морской бой', description: 'Найди и потопи все корабли компьютера по координатам', icon: '🚢', url: '/trenazher/morskoy-boy' },
  { id: 'ugaday-chislo', name: 'Угадай число', description: 'Отгадай число за минимум попыток с подсказками «больше/меньше»', icon: '🎲', url: '/trenazher/ugaday-chislo' },
  { id: 'naydi-lishnee', name: 'Найди лишнее', description: 'Для дошкольников: по форме, по цвету, по размеру', icon: '🧩', url: '/trenazher/naydi-lishnee' },
  { id: 'chto-izmenilos', name: 'Что изменилось?', description: 'Запомни фигуры и найди, что изменилось', icon: '👀', url: '/trenazher/chto-izmenilos' },
  { id: 'naydi-paru', name: 'Найди пару', description: 'Игра на память: переверни и найди одинаковые фигуры', icon: '🃏', url: '/trenazher/naydi-paru' },
  { id: 'sobery-po-poryadku', name: 'Собери по порядку', description: 'Расставь фигуры от маленькой к большой', icon: '📏', url: '/trenazher/sobery-po-poryadku' },
  { id: 'zakonomernosti', name: 'Закономерности', description: 'Продолжи ряд из картинок — найди закономерность', icon: '🔁', url: '/trenazher/zakonomernosti' },
  { id: 'shapes-colors', name: 'Формы и цвета', description: 'Учим фигуры и цвета вместе', icon: '🔷', url: '/trenazher/shapes-colors' },
];
