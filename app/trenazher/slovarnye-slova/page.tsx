'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { VOCAB_WORDS, type VocabGrade, type VocabWord } from '@/lib/vocab-words';
import TrackPageView from '@/components/TrackPageView';
import { trackUsage } from '@/lib/track';

type Mode = 'practice' | 'timed';

const GRADES: VocabGrade[] = [1, 2, 3, 4];
const VOWELS = 'аеёиоуыэюя';
const CONSONANTS = 'бвгджзйклмнпрстфхцчшщ';

// Реальные пары, которые дети действительно путают в непроверяемых словах:
// безударные гласные (о/а — «аканье», е/и/я — «иканье») и парные по
// глухости-звонкости согласные (б/п, в/ф, г/к, д/т, ж/ш, з/с — оглушение
// на конце слова или перед глухим). Дистракторы берутся именно отсюда,
// а не случайно из алфавита — иначе упражнение не проверяет нужную орфограмму.
const VOWEL_CONFUSIONS: Record<string, string[]> = {
  а: ['о'],
  о: ['а'],
  е: ['и', 'я'],
  и: ['е'],
  я: ['и', 'е'],
  э: ['е'],
  ё: ['е'],
  ю: ['у'],
  у: ['ю'],
  ы: ['и'],
};

const CONSONANT_CONFUSIONS: Record<string, string[]> = {
  б: ['п'],
  п: ['б'],
  в: ['ф'],
  ф: ['в'],
  г: ['к'],
  к: ['г'],
  д: ['т'],
  т: ['д'],
  ж: ['ш'],
  ш: ['ж'],
  з: ['с'],
  с: ['з'],
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Варианты букв для пропуска: правильная + до 2 реально путаемых букв.
// Если для буквы нет известной «пары» (редкие й/ъ/ь/щ и т.п.) — достраиваем
// случайными буквами той же группы (гласная/согласная), чтобы вариантов
// всегда было 3. Никогда не показываем неправильное слово целиком — ребёнок
// выбирает только букву.
function makeOptions(targetChar: string): string[] {
  const lower = targetChar.toLowerCase();
  const isVowel = VOWELS.includes(lower);
  const source = isVowel ? VOWELS : CONSONANTS;
  const confusions = isVowel ? VOWEL_CONFUSIONS : CONSONANT_CONFUSIONS;

  const priority = (confusions[lower] ?? []).filter((c) => c !== lower);
  const filler = shuffle(source.split('').filter((c) => c !== lower && !priority.includes(c)));
  const distractors = [...priority, ...filler].slice(0, 2);

  const isUpper = targetChar === targetChar.toUpperCase() && targetChar !== lower;
  return shuffle([lower, ...distractors]).map((c) => (isUpper ? c.toUpperCase() : c));
}

export default function SlovarnyeSlovaTrainerPage() {
  const [grade, setGrade] = useState<VocabGrade>(2);
  const [mode, setMode] = useState<Mode>('practice');
  const [started, setStarted] = useState(false);

  const [word, setWord] = useState<VocabWord | null>(null);
  const [ptr, setPtr] = useState(0); // индекс текущего пропуска в word.blanks
  const [filled, setFilled] = useState<number[]>([]); // позиции угаданных букв
  const [options, setOptions] = useState<string[]>([]);
  const [phase, setPhase] = useState<'answer' | 'reveal'>('answer');
  const [lastResult, setLastResult] = useState<'correct' | 'wrong' | null>(null);

  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [streak, setStreak] = useState(0);

  const [timeLeft, setTimeLeft] = useState(60);
  const [timedFinished, setTimedFinished] = useState(false);

  const queueRef = useRef<VocabWord[]>([]);

  function drawWord(): VocabWord {
    if (queueRef.current.length === 0) {
      queueRef.current = shuffle(VOCAB_WORDS[grade]);
    }
    return queueRef.current.pop()!;
  }

  function loadWord() {
    const w = drawWord();
    setWord(w);
    setPtr(0);
    setFilled([]);
    setOptions(makeOptions(w.word[w.blanks[0]]));
    setPhase('answer');
    setLastResult(null);
  }

  function begin(m: Mode) {
    queueRef.current = shuffle(VOCAB_WORDS[grade]);
    setMode(m);
    setStarted(true);
    setScore({ correct: 0, total: 0 });
    setStreak(0);
    setTimedFinished(false);
    setTimeLeft(60);
    // загрузка первого слова
    const w = drawWord();
    setWord(w);
    setPtr(0);
    setFilled([]);
    setOptions(makeOptions(w.word[w.blanks[0]]));
    setPhase('answer');
    setLastResult(null);
    trackUsage(`trainer:slovarnye-slova-${m}`);
  }

  // Таймер для режима «на время»
  useEffect(() => {
    if (!started || mode !== 'timed' || timedFinished) return;
    if (timeLeft <= 0) {
      setTimedFinished(true);
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [started, mode, timeLeft, timedFinished]);

  function handlePick(letter: string) {
    if (phase !== 'answer' || !word || timedFinished) return;
    const pos = word.blanks[ptr];
    const target = word.word[pos];
    const correct = letter.toLowerCase() === target.toLowerCase();

    if (!correct) {
      setPhase('reveal');
      setLastResult('wrong');
      setScore((s) => ({ correct: s.correct, total: s.total + 1 }));
      setStreak(0);
      const delay = mode === 'timed' ? 900 : 1500;
      setTimeout(loadWord, delay);
      return;
    }

    // Верная буква для текущего пропуска
    const newFilled = [...filled, pos];
    if (ptr + 1 < word.blanks.length) {
      setFilled(newFilled);
      setPtr(ptr + 1);
      setOptions(makeOptions(word.word[word.blanks[ptr + 1]]));
    } else {
      // Слово полностью собрано верно
      setFilled(newFilled);
      setPhase('reveal');
      setLastResult('correct');
      setScore((s) => ({ correct: s.correct + 1, total: s.total + 1 }));
      setStreak((s) => s + 1);
      const delay = mode === 'timed' ? 600 : 900;
      setTimeout(loadWord, delay);
    }
  }

  function renderWord() {
    if (!word) return null;
    const chars = word.word.split('');
    const currentPos = word.blanks[ptr];
    return (
      <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
        {chars.map((ch, i) => {
          const isBlank = word.blanks.includes(i);
          if (!isBlank) {
            return (
              <span key={i} className="text-5xl sm:text-6xl font-black text-[#3a1c6e]">
                {ch}
              </span>
            );
          }
          const isFilled = filled.includes(i);
          const showCorrect = phase === 'reveal'; // на reveal показываем все буквы верными
          if (isFilled || showCorrect) {
            const revealedWrong = showCorrect && !isFilled && lastResult === 'wrong';
            return (
              <span
                key={i}
                className={`text-5xl sm:text-6xl font-black pop-in ${
                  revealedWrong ? 'text-red-500' : 'text-green-600'
                }`}
              >
                {ch}
              </span>
            );
          }
          const isCurrent = i === currentPos;
          return (
            <span
              key={i}
              className={`inline-flex items-center justify-center w-10 sm:w-12 h-14 sm:h-16 rounded-xl text-4xl sm:text-5xl font-black align-bottom ${
                isCurrent
                  ? 'bg-orange/20 border-2 border-orange text-orange animate-pulse'
                  : 'bg-gray-200 border-2 border-gray-300 text-gray-400'
              }`}
            >
              {isCurrent ? '?' : ''}
            </span>
          );
        })}
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <TrackPageView type="trainer:slovarnye-slova" />

      <div className="border-b border-white/15 px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">📖 Словарные слова — тренажёр</h1>
      </div>

      <div className="max-w-2xl mx-auto py-8 px-6">
        {/* Настройки */}
        <div className="card mb-8">
          <label className="block text-sm font-medium mb-3 text-white/90">Класс</label>
          <div className="flex gap-3 flex-wrap mb-6">
            {GRADES.map((g) => (
              <button
                key={g}
                onClick={() => {
                  setGrade(g);
                  setStarted(false);
                }}
                className={`px-5 py-2 rounded-lg font-bold transition-colors text-sm ${
                  grade === g
                    ? 'bg-orange text-white'
                    : 'bg-white/10 border border-white/25 text-white/70 hover:text-white'
                }`}
              >
                {g} класс
              </button>
            ))}
          </div>

          <label className="block text-sm font-medium mb-3 text-white/90">Режим</label>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => begin('practice')}
              className="btn-primary px-6 py-3"
            >
              🎯 Тренировка
            </button>
            <button
              onClick={() => begin('timed')}
              className="btn-secondary px-6 py-3"
            >
              ⏱️ На время (60 сек)
            </button>
          </div>
          <p className="text-white/50 text-xs mt-3">
            Всего слов в {grade} классе: {VOCAB_WORDS[grade].length}
          </p>
        </div>

        {/* Игровое поле */}
        {started && !timedFinished && word && (
          <div className="card bg-white text-center">
            {/* Статистика */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-600 text-sm">
                Верно: <span className="text-green-600 font-bold text-lg">{score.correct}</span>
                <span className="text-gray-400"> / {score.total}</span>
              </span>
              {streak >= 2 && (
                <span className="text-orange font-bold text-sm">🔥 подряд: {streak}</span>
              )}
              {mode === 'timed' && (
                <span className={`font-bold text-xl ${timeLeft <= 10 ? 'text-red-500' : 'text-orange'}`}>
                  ⏱️ {timeLeft}
                </span>
              )}
            </div>

            {/* Слово */}
            <div className={`my-10 ${lastResult === 'wrong' && phase === 'reveal' ? 'shake' : ''}`}>
              {renderWord()}
            </div>

            {/* Варианты букв */}
            {phase === 'answer' ? (
              <div className="flex justify-center gap-4">
                {options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handlePick(opt)}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl text-3xl sm:text-4xl font-black text-white shadow-lg hover:scale-105 active:scale-95 transition-transform"
                    style={{ background: 'linear-gradient(135deg, #7C3AED, #f72585)' }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            ) : (
              <div className="h-16 sm:h-20 flex items-center justify-center">
                {lastResult === 'correct' ? (
                  <p className="text-green-600 font-black text-2xl pop-in">✅ Верно!</p>
                ) : (
                  <p className="text-red-500 font-black text-2xl">✏️ Запомни, как пишется!</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Итог режима «на время» */}
        {started && timedFinished && (
          <div className="card bg-white text-center py-10">
            <p className="text-3xl font-black text-[#3a1c6e] mb-2">⏱️ Время вышло!</p>
            <p className="text-gray-600 mb-1">Правильно собрано слов:</p>
            <p className="text-6xl font-black text-orange mb-6">{score.correct}</p>
            <p className="text-gray-500 mb-8">из {score.total} показанных</p>
            <div className="flex justify-center gap-3 flex-wrap">
              <button onClick={() => begin('timed')} className="btn-primary px-6 py-3">
                🔁 Ещё раз
              </button>
              <button onClick={() => begin('practice')} className="btn-secondary px-6 py-3">
                🎯 Тренировка
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
