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

        <div className="grid grid-cols-3 gap-2">
          {methods.map((method) => (
            <button
              key={method.id}
              onClick={() => handleSelect(method.id)}
              disabled={loading}
              className={`p-2 rounded-lg border-2 transition-all flex flex-col items-center text-center gap-1 ${
                selectedMethod === method.id
                  ? 'border-orange bg-orange/10 shadow-md shadow-orange/30'
                  : 'border-[#2D2350] hover:border-orange/50 bg-[#2A1B4D]'
              } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <span className="text-base">{method.icon}</span>
              <p className="font-bold text-white text-[11px] leading-tight">{method.name}</p>
              {selectedMethod === method.id && <span className="text-orange text-[10px]">✓ Выбрано</span>}
            </button>
          ))}
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
