'use client';

import { useState } from 'react';
import { getAllowedMethods } from '@/lib/payment-methods';

interface PaymentMethodsProps {
  onSelect: (methodId: string) => void;
  loading?: boolean;
}

export default function PaymentMethods({ onSelect, loading = false }: PaymentMethodsProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>('bank_card');
  const methods = getAllowedMethods();

  const methodGroups = {
    Карты: methods.filter(m => m.id === 'bank_card'),
    'Системы платежей': methods.filter(m => ['sbp', 'yandex_kassa', 'qiwi'].includes(m.id)),
    Банки: methods.filter(m => m.id === 'sberbank'),
    'Мобильные операторы': methods.filter(m => m.id === 'mobile_payment'),
  };

  const handleSelect = (methodId: string) => {
    setSelectedMethod(methodId);
    onSelect(methodId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold mb-4">Выберите способ оплаты</h3>
        <p className="text-gray-400 text-sm mb-6">
          ✅ Все способы разрешены в РФ и защищены ГОСТ
        </p>

        <div className="space-y-6">
          {Object.entries(methodGroups).map(
            ([groupName, groupMethods]) =>
              groupMethods.length > 0 && (
                <div key={groupName}>
                  <h4 className="text-sm font-semibold text-gray-400 mb-3">{groupName}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {groupMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => handleSelect(method.id)}
                        disabled={loading}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          selectedMethod === method.id
                            ? 'border-orange bg-orange/10 shadow-lg shadow-orange/30'
                            : 'border-[#2D2350] hover:border-orange/50 bg-[#16102A]'
                        } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{method.icon}</span>
                          <div>
                            <p className="font-bold text-white">{method.name}</p>
                            {method.id === 'sbp' && (
                              <p className="text-xs text-gray-400">Моментальный перевод по номеру телефона</p>
                            )}
                            {method.id === 'bank_card' && (
                              <p className="text-xs text-gray-400">Национальная платёжная система MIR</p>
                            )}
                            {method.id === 'yandex_kassa' && (
                              <p className="text-xs text-gray-400">Электронный кошелёк Яндекса</p>
                            )}
                          </div>
                        </div>
                        {selectedMethod === method.id && (
                          <div className="mt-2 text-orange text-sm font-bold">✓ Выбрано</div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      </div>

      {/* Security Info */}
      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
        <p className="text-green-400 text-sm">
          🔒 <span className="font-bold">Безопасно:</span> Все платежи защищены стандартами безопасности РФ (ГОСТ). Данные карт не хранятся на наших серверах.
        </p>
      </div>
    </div>
  );
}
