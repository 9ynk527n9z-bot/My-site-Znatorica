/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        violet: '#7C3AED',
        'violet-mid': '#6B21A8',
        orange: '#F97316',
        bg: '#0A0812',
        'bg-card': '#16102A',
        border: '#2D2350',
      },
      borderRadius: {
        DEFAULT: '16px',
      },
    },
  },
  plugins: [],
};
