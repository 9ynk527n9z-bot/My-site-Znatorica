'use client';

import { useState, useEffect, useRef } from 'react';

// Только женские британские голоса, которые обычно звучат приятнее и
// естественнее стандартного системного — порядок и есть приоритет.
const PREFERRED_FEMALE_VOICE_NAMES = [
  'Microsoft Libby Online (Natural) - English (United Kingdom)',
  'Microsoft Sonia Online (Natural) - English (United Kingdom)',
  'Google UK English Female',
  'Serena',
  'Martha',
  'Kate',
  'Microsoft Hazel',
];

// Известные мужские имена голосов — на случай, если в системе нет ни одного
// из PREFERRED_FEMALE_VOICE_NAMES и приходится выбирать из общего пула en-GB,
// такие голоса туда всё равно не должны попасть.
const KNOWN_MALE_VOICE_NAMES = ['Male', 'Daniel', 'Arthur', 'Fred', 'George', 'Ryan', 'Oliver'];

function pickBestVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  const gb = voices.filter((v) => v.lang === 'en-GB' || v.lang === 'en_GB');
  const pool = gb.length > 0 ? gb : voices.filter((v) => v.lang.startsWith('en'));

  for (const name of PREFERRED_FEMALE_VOICE_NAMES) {
    const match = pool.find((v) => v.name.includes(name));
    if (match) return match;
  }

  const femalePool = pool.filter(
    (v) => !KNOWN_MALE_VOICE_NAMES.some((male) => v.name.includes(male))
  );
  return femalePool[0] ?? pool[0] ?? null;
}

interface ListenButtonProps {
  text: string;
  label?: string;
}

export default function ListenButton({ text, label = '🔊 Прослушать' }: ListenButtonProps) {
  const [supported, setSupported] = useState(true);
  const [playing, setPlaying] = useState(false);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setSupported(false);
      return;
    }

    const loadVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        voiceRef.current = pickBestVoice(voices);
      }
    };

    loadVoice();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoice);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', loadVoice);
  }, []);

  const speak = () => {
    if (!supported) return;

    window.speechSynthesis.cancel();

    // Известный баг Chrome/Chromium: speak() сразу после cancel() иногда
    // озвучивает предыдущий текст, а не новый (гонка внутри самого браузера,
    // не в нашем коде) — так и получилось "Juice" на экране, а слышно "Cheese".
    // Небольшая пауза перед новым speak() — стандартный обход этого бага.
    window.setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-GB';
      utterance.rate = 0.9;
      if (voiceRef.current) utterance.voice = voiceRef.current;

      utterance.onstart = () => setPlaying(true);
      utterance.onend = () => setPlaying(false);
      utterance.onerror = () => setPlaying(false);

      window.speechSynthesis.speak(utterance);
    }, 50);
  };

  if (!supported) {
    return (
      <p className="text-gray-500 text-sm italic">
        Озвучка не поддерживается в этом браузере — попроси взрослого прочитать текст вслух.
      </p>
    );
  }

  return (
    <button
      onClick={speak}
      disabled={playing}
      className="no-print inline-flex items-center gap-2 bg-orange/20 text-orange hover:bg-orange/30 font-bold px-4 py-2 rounded-lg transition-colors disabled:opacity-60"
    >
      {playing ? '▶️ Звучит...' : label}
    </button>
  );
}
