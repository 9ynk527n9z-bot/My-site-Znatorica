'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CODE_TOPIC_ROUTES } from '@/lib/code-topics';

type Kind = 'article' | 'topic';
type Tab = Kind | 'code';

interface ContentItem {
  id: string;
  kind: Kind;
  slug: string;
  title: string;
  description: string;
  segment: string | null;
  subject: string | null;
  tag: string | null;
  readTime: string | null;
  date: string | null;
  intro: string;
  body: { heading: string; body: string[] }[];
  related: { title: string; url: string }[] | null;
  published: boolean;
  manualEdit: boolean;
  updatedAt: string;
}

interface FormState {
  id: string | null;
  kind: Kind;
  slug: string;
  title: string;
  description: string;
  segment: string;
  subject: string;
  tag: string;
  readTime: string;
  date: string;
  intro: string;
  sectionsText: string; // формат: ## Заголовок \n абзацы (пустая строка = новый абзац)
  relatedText: string; // формат: Название | /url  (по строке на ссылку)
  published: boolean;
}

// ── сериализация тела в текст и обратно ───────────────────────────────
function bodyToText(body: { heading: string; body: string[] }[]): string {
  return body
    .map((s) => `## ${s.heading}\n${s.body.join('\n\n')}`)
    .join('\n\n');
}

function textToBody(text: string): { heading: string; body: string[] }[] {
  const sections: { heading: string; body: string[] }[] = [];
  const blocks = text.split(/\n(?=##\s)/); // делим по строкам, начинающимся с "## "
  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;
    const lines = trimmed.split('\n');
    let heading = '';
    let rest = trimmed;
    if (lines[0].startsWith('## ')) {
      heading = lines[0].slice(3).trim();
      rest = lines.slice(1).join('\n');
    }
    const paragraphs = rest
      .split(/\n{2,}/)
      .map((p) => p.replace(/\n/g, ' ').trim())
      .filter(Boolean);
    if (heading || paragraphs.length) sections.push({ heading, body: paragraphs });
  }
  return sections;
}

function relatedToText(related: { title: string; url: string }[] | null): string {
  if (!related) return '';
  return related.map((r) => `${r.title} | ${r.url}`).join('\n');
}

function textToRelated(text: string): { title: string; url: string }[] {
  return text
    .split('\n')
    .map((line) => {
      const idx = line.indexOf('|');
      if (idx < 0) return null;
      const title = line.slice(0, idx).trim();
      const url = line.slice(idx + 1).trim();
      if (!title || !url) return null;
      return { title, url };
    })
    .filter((x): x is { title: string; url: string } => x !== null);
}

function emptyForm(kind: Kind): FormState {
  return {
    id: null,
    kind,
    slug: '',
    title: '',
    description: '',
    segment: '',
    subject: '',
    tag: '',
    readTime: '5 мин',
    date: new Date().toISOString().slice(0, 10),
    intro: '',
    sectionsText: '',
    relatedText: '',
    published: true,
  };
}

function itemToForm(item: ContentItem): FormState {
  return {
    id: item.id,
    kind: item.kind,
    slug: item.slug,
    title: item.title,
    description: item.description,
    segment: item.segment ?? '',
    subject: item.subject ?? '',
    tag: item.tag ?? '',
    readTime: item.readTime ?? '',
    date: item.date ?? '',
    intro: item.intro,
    sectionsText: bodyToText(item.body ?? []),
    relatedText: relatedToText(item.related),
    published: item.published,
  };
}

export default function AdminContentPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('article');
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FormState | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forbidden, setForbidden] = useState<string[]>([]);

  const token = () => (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

  const loadItems = useCallback(
    async (kind: Kind) => {
      setLoading(true);
      const t = token();
      if (!t) {
        router.push('/login');
        return;
      }
      try {
        const res = await fetch(`/api/admin/content?kind=${kind}`, {
          headers: { Authorization: `Bearer ${t}` },
        });
        if (res.status === 403) {
          router.push('/login');
          return;
        }
        const data = await res.json();
        setItems(data.items ?? []);
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    },
    [router],
  );

  useEffect(() => {
    if (tab === 'code') {
      setLoading(false);
      return;
    }
    loadItems(tab);
  }, [tab, loadItems]);

  function startNew() {
    setError(null);
    setForbidden([]);
    setForm(emptyForm(tab === 'code' ? 'topic' : tab));
  }

  function startEdit(item: ContentItem) {
    setError(null);
    setForbidden([]);
    setForm(itemToForm(item));
  }

  async function handleSave() {
    if (!form) return;
    setSaving(true);
    setError(null);
    setForbidden([]);
    const t = token();
    if (!t) {
      router.push('/login');
      return;
    }

    const payload = {
      kind: form.kind,
      slug: form.slug,
      title: form.title,
      description: form.description,
      segment: form.segment || null,
      subject: form.subject || null,
      tag: form.tag || null,
      readTime: form.readTime || null,
      date: form.date || null,
      intro: form.intro,
      body: textToBody(form.sectionsText),
      related: textToRelated(form.relatedText),
      published: form.published,
    };

    const url = form.id ? `/api/admin/content/${form.id}` : '/api/admin/content';
    const method = form.id ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${t}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Ошибка сохранения');
        setForbidden(data.forbidden ?? []);
        setSaving(false);
        return;
      }
      setForm(null);
      await loadItems(form.kind);
    } catch {
      setError('Сетевая ошибка');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(item: ContentItem) {
    if (!confirm(`Удалить «${item.title}»? Действие необратимо.`)) return;
    const t = token();
    if (!t) return;
    const res = await fetch(`/api/admin/content/${item.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${t}` },
    });
    if (res.ok) await loadItems(item.kind);
  }

  const isArticle = form?.kind === 'article';

  return (
    <div className="bg-black min-h-screen">
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-6">
        <div className="max-w-6xl mx-auto flex items-center gap-4 flex-wrap">
          <Link href="/admin/dashboard" className="text-orange hover:underline">
            ← Назад в админку
          </Link>
          <h1 className="text-3xl font-bold">📚 Управление контентом</h1>
          <Link href="/admin/logs" className="ml-auto text-sm text-gray-400 hover:text-white">
            🧾 Журнал действий
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-10 px-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {([
            ['article', 'Статьи родителям'],
            ['topic', 'Новые темы'],
            ['code', 'Темы в коде (52)'],
          ] as [Tab, string][]).map(([value, label]) => (
            <button
              key={value}
              onClick={() => {
                setForm(null);
                setTab(value);
              }}
              className={`px-5 py-2 rounded-lg font-bold text-sm transition-colors ${
                tab === value ? 'bg-orange text-white' : 'bg-[#2A1B4D] text-gray-300 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Пояснение о гибриде */}
        <div className="mb-6 text-sm text-gray-400 bg-[#1E1035] border border-[#2D2350] rounded-lg p-4">
          {tab === 'code' ? (
            <>
              Эти 52 темы свёрстаны вручную в коде (цветные блоки «Шаг 1/2/3»). Здесь они{' '}
              <b className="text-white">только для просмотра</b> — их правит разработчик. Редактируемый контент —
              во вкладках «Статьи» и «Новые темы».
            </>
          ) : (
            <>
              Здесь можно <b className="text-white">создавать, править и удалять</b> контент. Всё сохраняется в базу
              и сразу видно на сайте. Как только вы правите запись вручную, она помечается{' '}
              <span className="text-green-400">✋ ручная</span> — и обновления из кода её больше не перезаписывают.
              Нельзя использовать слова «ФГОС», «УМК», «образовательная» — нет лицензии.
            </>
          )}
        </div>

        {/* Форма редактора */}
        {form && tab !== 'code' && (
          <div className="mb-8 bg-[#2A1B4D] border border-orange/40 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {form.id ? 'Редактирование' : 'Новая запись'} · {isArticle ? 'статья' : 'тема'}
              </h2>
              <button onClick={() => setForm(null)} className="text-gray-400 hover:text-white text-sm">
                ✕ Закрыть
              </button>
            </div>

            {error && (
              <div className="bg-red-500/15 border border-red-500/40 text-red-300 rounded-lg p-3 text-sm">
                {error}
                {forbidden.length > 0 && (
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    {forbidden.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm text-gray-400">Заголовок *</span>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-black border border-[#2D2350] focus:border-orange"
                />
              </label>
              <label className="block">
                <span className="text-sm text-gray-400">Slug (латиница) *</span>
                <input
                  value={form.slug}
                  disabled={!!form.id}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="kak-uchit-tablitsu"
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-black border border-[#2D2350] focus:border-orange disabled:opacity-50"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-sm text-gray-400">Краткое описание (для карточки и SEO)</span>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={2}
                className="w-full mt-1 px-3 py-2 rounded-lg bg-black border border-[#2D2350] focus:border-orange"
              />
            </label>

            {isArticle ? (
              <div className="grid sm:grid-cols-3 gap-4">
                <label className="block">
                  <span className="text-sm text-gray-400">Тег (рубрика)</span>
                  <input
                    value={form.tag}
                    onChange={(e) => setForm({ ...form, tag: e.target.value })}
                    placeholder="Здоровье и режим"
                    className="w-full mt-1 px-3 py-2 rounded-lg bg-black border border-[#2D2350] focus:border-orange"
                  />
                </label>
                <label className="block">
                  <span className="text-sm text-gray-400">Время чтения</span>
                  <input
                    value={form.readTime}
                    onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                    placeholder="5 мин"
                    className="w-full mt-1 px-3 py-2 rounded-lg bg-black border border-[#2D2350] focus:border-orange"
                  />
                </label>
                <label className="block">
                  <span className="text-sm text-gray-400">Дата (ГГГГ-ММ-ДД)</span>
                  <input
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    placeholder="2026-07-09"
                    className="w-full mt-1 px-3 py-2 rounded-lg bg-black border border-[#2D2350] focus:border-orange"
                  />
                </label>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm text-gray-400">Возрастная группа (необязательно)</span>
                  <input
                    value={form.segment}
                    onChange={(e) => setForm({ ...form, segment: e.target.value })}
                    placeholder="2-klass"
                    className="w-full mt-1 px-3 py-2 rounded-lg bg-black border border-[#2D2350] focus:border-orange"
                  />
                </label>
                <label className="block">
                  <span className="text-sm text-gray-400">Предмет (необязательно)</span>
                  <input
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="matematika"
                    className="w-full mt-1 px-3 py-2 rounded-lg bg-black border border-[#2D2350] focus:border-orange"
                  />
                </label>
              </div>
            )}

            <label className="block">
              <span className="text-sm text-gray-400">Вступление (первый абзац)</span>
              <textarea
                value={form.intro}
                onChange={(e) => setForm({ ...form, intro: e.target.value })}
                rows={3}
                className="w-full mt-1 px-3 py-2 rounded-lg bg-black border border-[#2D2350] focus:border-orange"
              />
            </label>

            <label className="block">
              <span className="text-sm text-gray-400">
                Разделы. Заголовок раздела — строкой с «## », абзацы разделяйте пустой строкой.
              </span>
              <textarea
                value={form.sectionsText}
                onChange={(e) => setForm({ ...form, sectionsText: e.target.value })}
                rows={12}
                placeholder={'## Заголовок раздела\nПервый абзац.\n\nВторой абзац.\n\n## Следующий раздел\n...'}
                className="w-full mt-1 px-3 py-2 rounded-lg bg-black border border-[#2D2350] focus:border-orange font-mono text-sm"
              />
            </label>

            <label className="block">
              <span className="text-sm text-gray-400">
                Блок «Смотрите также» (по строке: Название | /url)
              </span>
              <textarea
                value={form.relatedText}
                onChange={(e) => setForm({ ...form, relatedText: e.target.value })}
                rows={3}
                placeholder={'Генератор прописей | /generator/propisi-ru'}
                className="w-full mt-1 px-3 py-2 rounded-lg bg-black border border-[#2D2350] focus:border-orange font-mono text-sm"
              />
            </label>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                />
                Опубликовано (видно на сайте)
              </label>
              <div className="flex gap-3">
                <button onClick={() => setForm(null)} className="px-4 py-2 rounded-lg bg-[#1E1035] text-gray-300">
                  Отмена
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6 py-2 rounded-lg bg-orange text-white font-bold disabled:opacity-50"
                >
                  {saving ? 'Сохранение…' : 'Сохранить'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Список */}
        {tab === 'code' ? (
          <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#1E1035]">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-400 font-semibold">Адрес</th>
                  <th className="px-6 py-3 text-left text-gray-400 font-semibold">Управляется</th>
                </tr>
              </thead>
              <tbody>
                {CODE_TOPIC_ROUTES.map((route) => (
                  <tr key={route} className="border-t border-[#2D2350]">
                    <td className="px-6 py-3">
                      <a href={route} target="_blank" className="text-orange hover:underline text-sm">
                        {route}
                      </a>
                    </td>
                    <td className="px-6 py-3">
                      <span className="text-xs bg-gray-500/20 text-gray-300 px-2 py-1 rounded">💻 код</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-400 text-sm">{loading ? '' : `${items.length} записей`}</span>
              <button onClick={startNew} className="bg-orange text-white font-bold px-5 py-2 rounded-lg hover:opacity-90">
                + {tab === 'article' ? 'Новая статья' : 'Новая тема'}
              </button>
            </div>

            {loading ? (
              <div className="text-center text-gray-400 py-12">Загрузка…</div>
            ) : items.length === 0 ? (
              <div className="text-center text-gray-400 py-12">Пока пусто. Создайте первую запись.</div>
            ) : (
              <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-[#1E1035]">
                    <tr>
                      <th className="px-4 py-3 text-left text-gray-400 font-semibold">Заголовок</th>
                      <th className="px-4 py-3 text-left text-gray-400 font-semibold">Статус</th>
                      <th className="px-4 py-3 text-left text-gray-400 font-semibold">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id} className="border-t border-[#2D2350] hover:bg-[#1E1035]">
                        <td className="px-4 py-3">
                          <div className="text-white font-bold">{item.title}</div>
                          <a
                            href={item.kind === 'article' ? `/dlya-roditeley/${item.slug}` : `/tema/${item.slug}`}
                            target="_blank"
                            className="text-orange/80 hover:underline text-xs"
                          >
                            /{item.kind === 'article' ? 'dlya-roditeley' : 'tema'}/{item.slug}
                          </a>
                        </td>
                        <td className="px-4 py-3 space-x-1 whitespace-nowrap">
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              item.published ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                            }`}
                          >
                            {item.published ? 'опубл.' : 'черновик'}
                          </span>
                          {item.manualEdit && (
                            <span className="text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-300">✋ ручная</span>
                          )}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <button onClick={() => startEdit(item)} className="text-orange hover:underline text-sm mr-4">
                            Редактировать
                          </button>
                          <button onClick={() => handleDelete(item)} className="text-red-400 hover:underline text-sm">
                            Удалить
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
