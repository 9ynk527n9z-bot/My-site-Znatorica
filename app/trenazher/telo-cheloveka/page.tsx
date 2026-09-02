'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import { praiseFor } from '@/lib/praise';

const ROUNDS_PER_SESSION = 10;

interface BodyPart {
  id: string;
  emoji: string;
  name: string;
}

const BODY_PARTS: BodyPart[] = [
  { id: 'glaz', emoji: '👁️', name: 'Глаз' },
  { id: 'ukho', emoji: '👂', name: 'Ухо' },
  { id: 'nos', emoji: '👃', name: 'Нос' },
  { id: 'rot', emoji: '👄', name: 'Рот' },
  { id: 'noga', emoji: '🦵', name: 'Нога' },
  { id: 'stupnya', emoji: '🦶', name: 'Ступня' },
  { id: 'ruka', emoji: '💪', name: 'Рука' },
  { id: 'palec', emoji: '👆', name: 'Палец' },
  { id: 'golova', emoji: '🗣️', name: 'Голова' },
  { id: 'zhivot', emoji: '🫃', name: 'Живот' },
  { id: 'zub', emoji: '🦷', name: 'Зуб' },
];

// Вопросы про то, ЗАЧЕМ нужна часть тела/орган — теория на этой же теме (см.
// app/6-7-let/okruzhayushchiy/telo-cheloveka) учит функциям органов чувств,
// сердца и лёгких, а не только их названиям. Тренажёр раньше проверял только
// называние — теперь вперемешку идут и такие вопросы.
interface FunctionQuestion {
  id: string;
  prompt: string;
  answer: BodyPart;
  distractorIds: string[];
}

const HEART: BodyPart = { id: 'serdce', emoji: '❤️', name: 'Сердце' };
const LUNGS: BodyPart = { id: 'legkie', emoji: '🫁', name: 'Лёгкие' };
const FUNCTION_ANSWER_POOL: BodyPart[] = [...BODY_PARTS, HEART, LUNGS];

const FUNCTION_QUESTIONS: FunctionQuestion[] = [
  { id: 'vidim', prompt: 'Каким органом мы видим?', answer: { id: 'glaz', emoji: '👁️', name: 'Глаз' }, distractorIds: ['ukho', 'nos', 'rot'] },
  { id: 'slyshim', prompt: 'Каким органом мы слышим музыку?', answer: { id: 'ukho', emoji: '👂', name: 'Ухо' }, distractorIds: ['glaz', 'nos', 'rot'] },
  { id: 'nyukhaem', prompt: 'Каким органом мы чувствуем запах?', answer: { id: 'nos', emoji: '👃', name: 'Нос' }, distractorIds: ['glaz', 'ukho', 'rot'] },
  { id: 'probuem', prompt: 'Каким органом мы чувствуем вкус еды?', answer: { id: 'rot', emoji: '👄', name: 'Рот' }, distractorIds: ['glaz', 'ukho', 'nos'] },
  { id: 'kachaet-krov', prompt: 'Какой орган качает кровь по всему телу?', answer: HEART, distractorIds: ['legkie', 'zhivot', 'golova'] },
  { id: 'dyshim', prompt: 'Каким органом мы дышим?', answer: LUNGS, distractorIds: ['serdce', 'zhivot', 'nos'] },
  { id: 'moem-ruki', prompt: 'Что нужно помыть перед едой, чтобы не занести микробы в рот?', answer: { id: 'ruka', emoji: '💪', name: 'Рука' }, distractorIds: ['noga', 'stupnya', 'golova'] },
  { id: 'chistim', prompt: 'Что нужно чистить утром и вечером, чтобы не было дырок от кариеса?', answer: { id: 'zub', emoji: '🦷', name: 'Зуб' }, distractorIds: ['rot', 'nos', 'palec'] },
];

const BUTTON_COLORS = [
  'border-purple-600 bg-purple-500 hover:bg-purple-600',
  'border-sky-600 bg-sky-500 hover:bg-sky-600',
  'border-amber-600 bg-amber-500 hover:bg-amber-600',
  'border-pink-600 bg-pink-500 hover:bg-pink-600',
];

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

type SequenceItem = { kind: 'naming'; part: BodyPart } | { kind: 'function'; q: FunctionQuestion };

interface QuizRound {
  prompt: string;
  answer: BodyPart;
  options: BodyPart[];
  showEmoji: boolean;
}

const NAMING_PROMPT = 'Как называется эта часть тела?';

function makeSequence(): SequenceItem[] {
  const naming: SequenceItem[] = shuffle(BODY_PARTS)
    .slice(0, Math.ceil(ROUNDS_PER_SESSION / 2))
    .map((part) => ({ kind: 'naming', part }));
  const functionItems: SequenceItem[] = shuffle(FUNCTION_QUESTIONS)
    .slice(0, Math.floor(ROUNDS_PER_SESSION / 2))
    .map((q) => ({ kind: 'function', q }));
  return shuffle([...naming, ...functionItems]);
}

function makeRound(item: SequenceItem): QuizRound {
  if (item.kind === 'naming') {
    const distractors = shuffle(BODY_PARTS.filter((p) => p.id !== item.part.id)).slice(0, 3);
    const options = shuffle([item.part, ...distractors]);
    return { prompt: NAMING_PROMPT, answer: item.part, options, showEmoji: true };
  }
  const distractors = item.q.distractorIds
    .map((id) => FUNCTION_ANSWER_POOL.find((p) => p.id === id))
    .filter((p): p is BodyPart => !!p);
  const options = shuffle([item.q.answer, ...distractors]);
  return { prompt: item.q.prompt, answer: item.q.answer, options, showEmoji: false };
}

export default function TeloChelovekaTrainerPage() {
  const [started, setStarted] = useState(false);
  const [sequence, setSequence] = useState<SequenceItem[]>([]);
  const [round, setRound] = useState(0);
  const [quizRound, setQuizRound] = useState<QuizRound | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [pickedId, setPickedId] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [finished, setFinished] = useState(false);

  function begin() {
    const seq = makeSequence();
    setSequence(seq);
    setStarted(true);
    setFinished(false);
    setRound(1);
    setScore({ correct: 0, total: 0 });
    const firstRound = makeRound(seq[0]);
    setQuizRound(firstRound);
    setFeedback(null);
    setPickedId(null);
  }

  function nextRound() {
    if (round >= ROUNDS_PER_SESSION) {
      setFinished(true);
      return;
    }
    const nextIndex = round;
    const nextQuiz = makeRound(sequence[nextIndex]);
    setRound((r) => r + 1);
    setQuizRound(nextQuiz);
    setFeedback(null);
    setPickedId(null);
  }

  function handlePick(option: BodyPart) {
    if (feedback || !quizRound) return;
    setPickedId(option.id);
    const correct = option.id === quizRound.answer.id;
    setFeedback(correct ? 'correct' : 'wrong');
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    setTimeout(nextRound, correct ? 1000 : 1500);
  }

  return (
    <div className="bg-black min-h-screen">
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">🧑 Тело человека</h1>
      </div>

      <TrainerGate type="trainer:telo-cheloveka">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {!started && (
            <div className="card text-center py-10">
              <p className="text-6xl mb-4">🧑‍⚕️</p>
              <p className="text-xl font-bold mb-2">Части тела и что они умеют</p>
              <p className="text-gray-400 mb-6">
                Называй части тела по картинке и отвечай, каким органом мы видим, слышим,
                дышим и зачем моем руки — выбирай правильный ответ среди четырёх кнопок!
              </p>
              <button onClick={begin} className="btn-primary px-8 py-4 text-lg">
                ▶️ Начать игру
              </button>
            </div>
          )}

          {started && !finished && quizRound && (
            <div className="card bg-white text-center">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-500 text-sm">
                  Раунд {round} из {ROUNDS_PER_SESSION}
                </span>
                <span className="text-gray-600 text-sm">
                  Верно: <span className="text-green-600 font-bold">{score.correct}</span> / {score.total}
                </span>
              </div>

              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${(round / ROUNDS_PER_SESSION) * 100}%`,
                    background: 'linear-gradient(90deg, #a855f7, #ec4899)',
                  }}
                />
              </div>

              <p className="text-xl font-bold text-[#3a1c6e] mb-4">{quizRound.prompt}</p>
              {quizRound.showEmoji && <div className="text-8xl mb-6">{quizRound.answer.emoji}</div>}

              <div className="grid grid-cols-2 gap-4 mb-6">
                {quizRound.options.map((option, i) => {
                  const isPicked = pickedId === option.id;
                  const isAnswer = option.id === quizRound.answer.id;
                  const showState = feedback && (isPicked || isAnswer);
                  return (
                    <button
                      key={option.id}
                      onClick={() => handlePick(option)}
                      disabled={!!feedback}
                      className={`flex items-center justify-center py-6 px-4 rounded-2xl border-4 text-2xl font-black text-white transition-all ${
                        showState
                          ? isAnswer
                            ? 'border-green-500 bg-green-500 pop-in'
                            : 'border-red-500 bg-red-500 shake'
                          : `${BUTTON_COLORS[i % BUTTON_COLORS.length]} hover:scale-105`
                      }`}
                    >
                      {option.name}
                    </button>
                  );
                })}
              </div>

              <div className="h-8">
                {feedback === 'correct' && <p className="text-green-600 font-black text-xl pop-in">✅ Верно!</p>}
                {feedback === 'wrong' && (
                  <p className="text-red-500 font-black text-xl">
                    Правильно: «{quizRound.answer.name}» 👀
                  </p>
                )}
              </div>
            </div>
          )}

          {finished && (
            <div className="card bg-white text-center py-10">
              <p className="text-3xl font-black text-[#3a1c6e] mb-2">{praiseFor(score.correct, score.total).title}</p>
              <p className="text-gray-600 mb-1">Правильных ответов:</p>
              <p className="text-6xl font-black text-orange mb-6">{score.correct}</p>
              <p className="text-gray-500 mb-8">из {score.total}</p>
              <div className="flex justify-center gap-3 flex-wrap">
                <button onClick={begin} className="btn-primary px-6 py-3">
                  🔁 Играть ещё
                </button>
              </div>
            </div>
          )}
        </div>
      </TrainerGate>
    </div>
  );
}
