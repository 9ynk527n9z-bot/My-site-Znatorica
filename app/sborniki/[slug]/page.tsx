'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getProduct, isSaleActive } from '@/lib/products';
import PaymentMethods from '@/components/PaymentMethods';

export default function SbornikPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const rawProduct = getProduct(slug);
  const product = rawProduct?.fileName ? rawProduct : undefined;

  const [owned, setOwned] = useState(false);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('bank_card');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setChecked(true);
      return;
    }
    fetch(`/api/products/${slug}/status`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => setOwned(!!data.owned))
      .catch(() => {})
      .finally(() => setChecked(true));
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen py-20 px-6 text-center">
        <p className="text-white/70">Сборник не найден.</p>
        <Link href="/sborniki" className="text-orange hover:underline">
          ← Все сборники
        </Link>
      </div>
    );
  }

  async function handleBuy() {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('/api/payments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          returnUrl: `${window.location.origin}/sborniki/${slug}`,
          paymentMethod: selectedPaymentMethod,
          productSlug: slug,
        }),
      });
      if (!response.ok) throw new Error('Failed to create payment');
      const data = await response.json();
      if (data.confirmationUrl) window.location.href = data.confirmationUrl;
    } catch (error) {
      console.error(error);
      alert('Ошибка при создании платежа');
    } finally {
      setLoading(false);
    }
  }

  async function handleDownload() {
    const token = localStorage.getItem('token');
    const response = await fetch(`/api/products/${slug}/download`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      alert('Не удалось скачать файл');
      return;
    }
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = product!.fileName!;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/sborniki" className="text-orange hover:underline text-sm">
          ← Все сборники
        </Link>

        <div className="card border-orange mt-4">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-white/75 mb-6">{product.description}</p>
          <p className="text-white/50 text-sm mb-6">{product.pages} страниц · PDF, для печати</p>

          <div className="bg-black/30 border border-white/10 rounded-lg p-5 mb-8">
            <p className="font-bold text-white mb-3">📖 Что внутри:</p>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-white/70 text-sm">
              <li>✏️ Прописи букв и цифр</li>
              <li>🔢 Примеры на счёт и состав числа</li>
              <li>🧩 6 кроссвордов и 6 филвордов</li>
              <li>⚖️ Сравнение чисел с картинками</li>
              <li>🕐 Задания на определение времени</li>
              <li>🌀 Лабиринты и штриховка</li>
              <li>🔤 Анаграммы и словарные слова</li>
              <li>✍️ Графический диктант</li>
              <li>✅ Страница ответов для проверки взрослым</li>
              <li>🏆 Диплом за прохождение сборника</li>
            </ul>
          </div>

          {!checked ? (
            <p className="text-white/50">Загрузка…</p>
          ) : owned ? (
            <div className="bg-green-500/20 border border-green-500 rounded-lg p-4 text-center">
              <p className="text-green-400 font-bold mb-4">✅ Сборник куплен</p>
              <button onClick={handleDownload} className="btn-primary w-full">
                Скачать PDF
              </button>
            </div>
          ) : (
            <>
              {isSaleActive(product) ? (
                <div className="text-center mb-6">
                  <span className="inline-block bg-orange text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                    🔥 Только сегодня
                  </span>
                  <p>
                    <span className="text-white/40 text-2xl line-through mr-3">{product.price} ₽</span>
                    <span className="text-5xl font-bold text-orange">{product.salePrice} ₽</span>
                  </p>
                </div>
              ) : (
                <p className="text-5xl font-bold text-orange mb-6 text-center">{product.price} ₽</p>
              )}
              <div className="mb-6">
                <PaymentMethods onSelect={setSelectedPaymentMethod} loading={loading} />
              </div>
              <button onClick={handleBuy} disabled={loading} className="btn-primary w-full disabled:opacity-50">
                {loading ? 'Обработка…' : 'Купить'}
              </button>
              <p className="text-center text-xs text-gray-500 mt-3">
                Разовый платёж, без подписки. Скачивание доступно сразу после оплаты.
              </p>
              <p className="text-center text-xs text-gray-600 mt-2">
                Нажимая кнопку оплаты, вы принимаете условия{' '}
                <Link href="/oferta" className="text-orange hover:underline">
                  Публичной оферты
                </Link>
                , включая порядок возврата денежных средств.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
