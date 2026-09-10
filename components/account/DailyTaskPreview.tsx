'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

type Level = '4-5' | '6-7' | '1' | '2' | '3' | '4';
type DailyTask = { subject: string; title: string; description: string; href: string };
type CycleState = { date: string; taskHref: string; usedHrefs: string[] };

const LEVEL_LABELS: Record<Level, string> = {
  '4-5': '4–5 лет', '6-7': '6–7 лет', '1': '1 класс',
  '2': '2 класс', '3': '3 класс', '4': '4 класс',
};

const t = (subject: string, title: string, description: string, slug: string): DailyTask =>
  ({ subject, title, description, href: `/trenazher/${slug}` });

// Существующие тренажёры, вручную распределённые по возрасту и школьной программе.
const TASKS: Record<Level, DailyTask[]> = {
  '4-5': [
    t('Математика', 'Счёт до 5', 'Посчитать предметы и выбрать правильное число', 'schet-do-5'),
    t('Математика', 'Счёт до 10', 'Закрепить числа и количество предметов', 'schet-do-10'),
    t('Логика', 'Найди лишнее', 'Найти предмет, который не подходит к остальным', 'naydi-lishnee'),
    t('Логика', 'Найди пару', 'Подобрать одинаковые или связанные картинки', 'naydi-paru'),
    t('Логика', 'Что изменилось?', 'Заметить изменение и потренировать внимание', 'chto-izmenilos'),
    t('Логика', 'Сравнение предметов', 'Сравнить предметы по размеру и признакам', 'sravnenie-predmetov'),
    t('Развитие речи', 'Назови одним словом', 'Объединить предметы в одну смысловую группу', 'slova-obobshchenie-4-5let'),
    t('Развитие речи', 'Звуки', 'Послушать слово и распознать нужный звук', 'zvuki-4-5let'),
    t('Развитие речи', 'Слоги', 'Разделить простые слова на слоги', 'slogi-4-5let'),
    t('Развитие речи', 'Пересказ', 'Рассказать историю в правильном порядке', 'pereskaz-4-5let'),
    t('Окружающий мир', 'Домашние и дикие животные', 'Определить, где живут разные животные', 'domashnie-dikie'),
    t('Окружающий мир', 'Времена года', 'Узнать сезон по его признакам', 'vremena-goda'),
  ],
  '6-7': [
    t('Математика', 'Счёт до 20', 'Потренировать числа от 1 до 20', 'schet-do-20-ru'),
    t('Математика', 'Сложение', 'Решить примеры в пределах 10', 'slozhenie-5-10'),
    t('Математика', 'Вычитание', 'Решить примеры в пределах 10', 'vychitanie-5-10'),
    t('Математика', 'Состав числа', 'Собрать число из двух частей', 'sostav-chisla'),
    t('Грамота', 'Русский алфавит', 'Повторить буквы и их порядок', 'russkiy-alfavit'),
    t('Грамота', 'Гласные и согласные', 'Различить гласные и согласные звуки', 'glasnye-soglasnye'),
    t('Грамота', 'Чтение по слогам', 'Прочитать слово и понять его смысл', 'chtenie-6-7let'),
    t('Развитие речи', 'Пересказ', 'Восстановить последовательность событий', 'pereskaz-6-7let'),
    t('Развитие речи', 'Диалоги', 'Выбрать подходящую реплику в разговоре', 'dialogi-6-7let'),
    t('Логика', 'Закономерности', 'Продолжить ряд по найденному правилу', 'zakonomernosti'),
    t('Окружающий мир', 'Природные явления', 'Узнать явление природы по описанию', 'prirodnye-yavleniya-6-7let'),
    t('Окружающий мир', 'Тело человека', 'Познакомиться с частями тела и их работой', 'telo-cheloveka'),
  ],
  '1': [
    t('Математика', 'Задачи для 1 класса', 'Решить короткие задачи на сложение и вычитание', 'zadachi-1klass'),
    t('Математика', 'Сложение до 20', 'Потренировать сложение с переходом через десяток', 'slozhenie-do-20'),
    t('Математика', 'Состав числа', 'Подобрать пары чисел для заданной суммы', 'sostav-chisla'),
    t('Математика', 'Время', 'Определить время по часам', 'vremya'),
    t('Русский язык', 'Знаки препинания', 'Выбрать знак в конце предложения', 'punktuaciya-1klass'),
    t('Русский язык', 'Гласные и согласные', 'Различить гласные и согласные звуки', 'glasnye-soglasnye'),
    t('Русский язык', 'Ударение', 'Найти ударный слог в слове', 'udarenie'),
    t('Чтение', 'Проза — читай и понимай', 'Прочитать рассказ и ответить на вопросы', 'proza-1klass'),
    t('Чтение', 'Стихи — читай и понимай', 'Прочитать стихотворение и понять его смысл', 'stihi-1klass'),
    t('Логика', 'Аналогии', 'Найти связь между предметами и словами', 'analogii-1klass'),
    t('Окружающий мир', 'Природа', 'Разобраться в явлениях живой природы', 'priroda-1klass'),
    t('Безопасность', 'Правила безопасности', 'Выбрать безопасное поведение', 'bezopasnost-1klass'),
  ],
  '2': [
    t('Математика', 'Двузначные числа', 'Потренировать действия с двузначными числами', 'dvuznachnye'),
    t('Математика', 'Деление', 'Понять деление на равные части', 'delenie'),
    t('Математика', 'Таблица умножения', 'Закрепить примеры на умножение', 'tablitsa-umnozheniya'),
    t('Математика', 'Периметр', 'Найти периметр фигуры', 'perimetr-2klass'),
    t('Русский язык', 'Корень слова', 'Найти лишнее среди однокоренных слов', 'koren-slova-2klass'),
    t('Русский язык', 'Синонимы и антонимы', 'Подобрать близкие и противоположные слова', 'sinonimy-antonimy-2klass'),
    t('Русский язык', 'Предложение', 'Составить и правильно оформить предложение', 'predlozhenie-2klass'),
    t('Логика', 'Логические задачи', 'Решить задачу на сравнение', 'logicheskie-zadachi-2klass'),
    t('Логика', 'Ребусы', 'Разгадать слово по картинкам и знакам', 'rebusy-2klass'),
    t('Чтение', 'Загадки', 'Прочитать загадку и найти отгадку', 'zagadki-2klass'),
    t('Окружающий мир', 'Живая и неживая природа', 'Распределить объекты по группам', 'priroda-zhivaya-nezhivaya-2klass'),
  ],
  '3': [
    t('Математика', 'Уравнения', 'Найти неизвестное в уравнении', 'uravneniya-3klass'),
    t('Математика', 'Площадь и периметр', 'Вычислить площадь и периметр', 'ploshchad-perimetr-3klass'),
    t('Математика', 'Деление с остатком', 'Выполнить деление и определить остаток', 'delenie-s-ostatkom'),
    t('Математика', 'Трёхзначные числа', 'Потренировать действия с числами', 'trekhznachnye'),
    t('Математика', 'Внетабличное умножение', 'Решить примеры удобным способом', 'vnetablichnoe-umnozhenie-3klass'),
    t('Русский язык', 'Разбор слова по составу', 'Найти части слова', 'razbor-sostav-3klass'),
    t('Русский язык', 'Спряжение', 'Определить форму глагола', 'spryazhenie-3klass'),
    t('Русский язык', 'Сложные предложения', 'Найти части сложного предложения', 'slozhnie-predlozheniya-3klass'),
    t('Логика', 'Комбинаторика', 'Посчитать количество вариантов', 'kombinatorika-3klass'),
    t('Логика', 'Взвешивание', 'Решить задачу с весами', 'vzveshivanie-3klass'),
    t('Английский язык', 'Грамматика', 'Закрепить базовые правила', 'grammatika-3klass-english'),
  ],
  '4': [
    t('Математика', 'Порядок действий', 'Решить примеры со скобками', 'poryadok-deystviy'),
    t('Математика', 'Единицы измерения', 'Перевести величины в другие единицы', 'edinitsy-izmereniya-4klass'),
    t('Математика', 'Геометрия', 'Решить задачу с фигурами', 'geometriya-4klass'),
    t('Математика', 'Скорость, время, расстояние', 'Найти неизвестную величину', 'skorost-vremya-rasstoyanie-4klass'),
    t('Математика', 'Умножение и деление столбиком', 'Потренировать письменные вычисления', 'umnozhenie-delenie-stolbikom-4klass'),
    t('Русский язык', 'Члены предложения', 'Определить роль слова', 'sintaksis-4klass'),
    t('Русский язык', 'Склонение', 'Определить падеж и окончание', 'sklonenie-4klass'),
    t('Русский язык', 'Стили речи', 'Определить стиль текста', 'stili-rechi-4klass'),
    t('Чтение', 'Анализ текста', 'Прочитать текст и ответить на вопросы', 'analiz-teksta-4klass'),
    t('Литература', 'Классика — угадай автора', 'Определить автора произведения', 'klassika-4klass'),
    t('Логика', 'Логические таблицы', 'Сопоставить условия в таблице', 'logicheskie-tablitsy-4klass'),
    t('Логика', 'Переливания', 'Решить задачу с сосудами', 'perelivanie-4klass'),
  ],
};

function todayKey() {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}

function stableIndex(seed: string, length: number) {
  let hash = 0;
  for (const char of seed) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return hash % length;
}

function readCycle(level: Level): CycleState | null {
  try {
    const value = window.localStorage.getItem(`znatorika-daily-task-cycle:${level}`);
    if (!value) return null;
    const parsed = JSON.parse(value) as CycleState;
    return Array.isArray(parsed.usedHrefs) ? parsed : null;
  } catch {
    return null;
  }
}

function pickTask(level: Level, recentTrainerTypes: string[]) {
  const date = todayKey();
  const available = TASKS[level];
  const previous = readCycle(level);
  if (previous?.date === date) {
    const savedTask = available.find((item) => item.href === previous.taskHref);
    if (savedTask) return savedTask;
  }
  const validHrefs = new Set(available.map((item) => item.href));
  let usedHrefs = (previous?.usedHrefs ?? []).filter((href) => validHrefs.has(href));
  let unused = available.filter((item) => !usedHrefs.includes(item.href));
  if (unused.length === 0) {
    usedHrefs = [];
    unused = available;
  }
  const recent = new Set(recentTrainerTypes.slice(0, 6).map((type) => `/trenazher/${type.replace(/^trainer:/, '')}`));
  const fresh = unused.filter((item) => !recent.has(item.href));
  const candidates = fresh.length ? fresh : unused;
  const selected = candidates[stableIndex(`${date}:${level}:${usedHrefs.length}`, candidates.length)];
  window.localStorage.setItem(`znatorika-daily-task-cycle:${level}`, JSON.stringify({
    date, taskHref: selected.href, usedHrefs: [...usedHrefs, selected.href],
  } satisfies CycleState));
  return selected;
}

export default function DailyTaskPreview({ recentTrainerTypes = [] }: { recentTrainerTypes?: string[] }) {
  const [level, setLevel] = useState<Level | null>(null);
  const [ready, setReady] = useState(false);
  const [cycleVersion, setCycleVersion] = useState(0);

  useEffect(() => {
    const saved = window.localStorage.getItem('znatorika-preview-level') as Level | null;
    if (saved && saved in LEVEL_LABELS) setLevel(saved);
    setReady(true);
  }, []);

  const selectedTask = useMemo(
    () => ready && level ? pickTask(level, recentTrainerTypes) : null,
    [ready, level, recentTrainerTypes, cycleVersion],
  );

  const chooseLevel = (nextLevel: Level) => {
    window.localStorage.setItem('znatorika-preview-level', nextLevel);
    setLevel(nextLevel);
  };

  const chooseAnother = () => {
    if (!level) return;
    const state = readCycle(level);
    if (state) window.localStorage.setItem(`znatorika-daily-task-cycle:${level}`, JSON.stringify({ ...state, date: '' }));
    setCycleVersion((value) => value + 1);
  };

  return (
    <section className="rounded-3xl border border-white/30 bg-gradient-to-br from-white/18 via-[#B8D7DF]/14 to-[#D7C6DC]/12 p-5 shadow-[0_10px_24px_rgba(20,16,45,0.14)] backdrop-blur-sm sm:p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-violet-200/55 bg-[#2A174A] text-lg shadow-[0_3px_10px_rgba(10,5,30,0.3)]">💡</div>
        <div><h2 className="text-xl font-extrabold text-[#FF9F1C]">Что сделать сегодня</h2><p className="text-sm text-white/60">Одно небольшое занятие на 5–7 минут</p></div>
      </div>
      {!ready ? (
        <div className="rounded-2xl border border-white/25 bg-white/10 p-4 text-white/60">Подбираем задание…</div>
      ) : !level ? (
        <div className="rounded-2xl border border-white/25 bg-white/10 p-4">
          <p className="mb-3 text-base font-bold">Для какого уровня подобрать задание?</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {(Object.keys(LEVEL_LABELS) as Level[]).map((item) => (
              <button key={item} onClick={() => chooseLevel(item)} className="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold transition-colors hover:border-orange/60 hover:bg-orange/15">{LEVEL_LABELS[item]}</button>
            ))}
          </div>
        </div>
      ) : selectedTask ? (
        <div className="rounded-2xl border border-white/25 bg-white/10 p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-1 flex flex-wrap items-center gap-2"><span className="rounded-full bg-orange/20 px-3 py-1 text-xs font-bold text-orange">{LEVEL_LABELS[level]}</span><span className="text-sm text-white/60">{selectedTask.subject}</span></div>
              <p className="text-lg font-bold">{selectedTask.title}</p><p className="mt-1 text-base text-white/70">{selectedTask.description}</p>
            </div>
            <Link href={selectedTask.href} className="btn-primary shrink-0 text-center">Начать →</Link>
          </div>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/50">
            <button onClick={() => setLevel(null)} className="underline decoration-white/25 underline-offset-4 hover:text-white/80">Изменить уровень</button>
            <button onClick={chooseAnother} className="underline decoration-white/25 underline-offset-4 hover:text-white/80">Другое задание</button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
