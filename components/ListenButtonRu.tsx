'use client';

import { useState, useEffect, useRef } from 'react';

// Приятные женские русские голоса — приоритет сверху вниз.
// При отсутствии — берём первый попавшийся голос с lang, начинающимся на "ru".
const PREFERRED_VOICE_NAMES = [
  'Milena',
  'Google русский',
  'Microsoft Svetlana Online (Natural) - Russian (Russia)',
  'Microsoft Svetlana',
  'Yuri',
  'Microsoft Irina',
  'Google Русский',
];

function pickBestVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  const ru = voices.filter((v) => v.lang.toLowerCase().startsWith('ru'));
  const pool = ru.length > 0 ? ru : voices;

  for (const name of PREFERRED_VOICE_NAMES) {
    const match = pool.find((v) => v.name.includes(name));
    if (match) return match;
  }

  return pool[0] ?? null;
}

interface ListenButtonRuProps {
  text: string;
  label?: string;
}

export default function ListenButtonRu({ text, label = '🔊 Прослушать' }: ListenButtonRuProps) {
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

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ru-RU';
    utterance.rate = 0.9;
    if (voiceRef.current) utterance.voice = voiceRef.current;

    utterance.onstart = () => setPlaying(true);
    utterance.onend = () => setPlaying(false);
    utterance.onerror = () => setPlaying(false);

    window.speechSynthesis.speak(utterance);
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
      className="no-print inline-flex items-center gap-2 bg-violet/20 text-violet hover:bg-violet/30 font-bold px-4 py-2 rounded-lg transition-colors disabled:opacity-60"
    >
      {playing ? '▶️ Звучит...' : label}
    </button>
  );
}
