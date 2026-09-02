'use client';

import { useState } from 'react';

export default function FeedbackForm({ onSubmitted }: { onSubmitted?: () => void }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [honeypot, setHoneypot] = useState(''); // невидимое поле-приманка для ботов
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const MAX_LENGTH = 1000;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    const trimmed = message.trim();
    if (!trimmed) {
      setError('Пожалуйста, напишите отзыв.');
      return;
    }
    if (trimmed.length > MAX_LENGTH) {
      setError(`Отзыв слишком длинный (максимум ${MAX_LENGTH} символов).`);
      return;
    }

    setLoading(true);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          name: name.trim() || undefined,
          message: trimmed,
          rating: rating ?? undefined,
          honeypot,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Не удалось отправить отзыв.');
      }

      setSent(true);
      setName('');
      setMessage('');
      setRating(null);
      onSubmitted?.();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Не удалось отправить отзыв.');
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="card text-center">
        <p className="text-lg font-bold mb-2">Спасибо за отзыв! 💜</p>
        <p className="text-white/80">
          Ваш отзыв появится на сайте после проверки модератором. Мы читаем каждое сообщение, но
          публикуем не всё автоматически.
        </p>
        <button
          className="btn-secondary mt-6"
          onClick={() => setSent(false)}
        >
          Оставить ещё один отзыв
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-5">
      <h3 className="text-xl font-bold">Оставить отзыв</h3>

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Honeypot: скрыто от людей через CSS, но видно ботам-парсерам форм. */}
      <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
        <label htmlFor="feedback-website">Website</label>
        <input
          id="feedback-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Имя (необязательно)</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={100}
          placeholder="Например, Анна"
          className="w-full px-4 py-2 rounded-lg bg-black border border-[#2D2350] focus:border-orange transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Оценка (необязательно)</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(rating === star ? null : star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(null)}
              className="text-3xl leading-none transition-transform hover:scale-110"
              aria-label={`${star} из 5`}
            >
              <span
                className={
                  (hoverRating ?? rating ?? 0) >= star ? 'text-orange' : 'text-white/25'
                }
              >
                ★
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Ваш отзыв *</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={MAX_LENGTH}
          rows={5}
          required
          placeholder="Расскажите, что понравилось или что можно улучшить"
          className="w-full px-4 py-2 rounded-lg bg-black border border-[#2D2350] focus:border-orange transition-colors resize-none"
        />
        <p className="text-right text-xs text-white/50 mt-1">
          {message.length}/{MAX_LENGTH}
        </p>
      </div>

      <p className="text-xs text-white/60">
        Отзыв не публикуется автоматически — он появится на сайте только после проверки
        модератором.
      </p>

      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? 'Отправка…' : 'Отправить отзыв'}
      </button>
    </form>
  );
}
