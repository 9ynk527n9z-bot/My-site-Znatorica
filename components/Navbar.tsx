'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [, setSearchOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-black/92 backdrop-blur-sm border-b border-[#2D2350] px-6 h-16 flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="font-black text-2xl text-white hover:text-orange transition-colors">
        🐿️ Знаторика
      </Link>

      {/* Search (Desktop) */}
      <div className="hidden md:block flex-1 mx-12">
        <input
          type="text"
          placeholder="Поиск темы..."
          className="w-full px-4 py-2 rounded-lg bg-[#16102A] text-white placeholder-gray-400 border border-[#2D2350] focus:border-orange transition-colors"
          onFocus={() => setSearchOpen(true)}
        />
      </div>

      {/* Auth Links */}
      <div className="flex gap-4">
        {isLoggedIn ? (
          <Link
            href="/account"
            className="bg-orange text-white px-4 py-2 rounded-lg font-bold hover:opacity-90 transition-opacity"
          >
            👤 Кабинет
          </Link>
        ) : (
          <>
            <Link
              href="/login"
              className="text-gray-400 hover:text-white transition-colors hidden sm:block"
            >
              Вход
            </Link>
            <Link
              href="/register"
              className="bg-orange text-white px-4 py-2 rounded-lg font-bold hover:opacity-90 transition-opacity"
            >
              Регистрация
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
