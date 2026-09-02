// Программная озвучка русским женским голосом (для случаев без кнопки ListenButtonRu —
// например, озвучить выбранный ответ сразу при клике).
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

export function speakRu(text: string) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ru-RU';
  utterance.rate = 0.9;
  const voice = pickBestVoice(window.speechSynthesis.getVoices());
  if (voice) utterance.voice = voice;
  window.speechSynthesis.speak(utterance);
}

// Озвучка слова по слогам с реальным повышением высоты голоса на ударном
// слоге. Комбинирующий значок ударения (U+0301) многие движки TTS (особенно
// на Android/в мобильном приложении) молча игнорируют, из-за чего ударение
// звучит неверно. Раздельные utterance с разным pitch — единственный способ,
// который гарантированно слышен на любом движке, т.к. pitch — параметр
// синтеза, а не подсказка для словарного поиска.
export function speakRuStressedWord(syllables: string[], stressIndex: number) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;

  window.speechSynthesis.cancel();
  const voice = pickBestVoice(window.speechSynthesis.getVoices());

  function speakSyllable(i: number) {
    if (i >= syllables.length) return;
    const utterance = new SpeechSynthesisUtterance(syllables[i]);
    utterance.lang = 'ru-RU';
    if (voice) utterance.voice = voice;
    const isStressed = i === stressIndex;
    utterance.rate = isStressed ? 0.82 : 0.92;
    utterance.pitch = isStressed ? 1.1 : 1;
    utterance.onend = () => speakSyllable(i + 1);
    window.speechSynthesis.speak(utterance);
  }

  speakSyllable(0);
}
