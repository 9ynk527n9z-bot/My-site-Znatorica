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
        bg: '#1E1035',
        'bg-card': '#2A1B4D',
        border: '#2D2350',
        black: '#1E1035',
      },
      borderRadius: {
        DEFAULT: '16px',
      },
    },
  },
  plugins: [],
};
