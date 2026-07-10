'use client';

import { useState, useEffect, useRef } from 'react';

// Голоса, которые обычно звучат приятнее и естественнее стандартного системного.
// Порядок — приоритет: сначала пробуем найти лучший, при отсутствии откатываемся дальше.
const PREFERRED_VOICE_NAMES = [
  'Google UK English Female',
  'Kate',
  'Serena',
  'Google UK English Male',
  'Daniel',
  'Hazel',
  'Microsoft Libby Online (Natural) - English (United Kingdom)',
  'Microsoft Sonia Online (Natural) - English (United Kingdom)',
];

function pickBestVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  const gb = voices.filter((v) => v.lang === 'en-GB' || v.lang === 'en_GB');
  const pool = gb.length > 0 ? gb : voices.filter((v) => v.lang.startsWith('en'));

  for (const name of PREFERRED_VOICE_NAMES) {
    const match = pool.find((v) => v.name.includes(name));
    if (match) return match;
  }

  return pool[0] ?? null;
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

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-GB';
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
