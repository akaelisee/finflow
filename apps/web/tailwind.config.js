/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#378adb',
          50: '#eef7ff',
          100: '#dcedff',
          200: '#b3dbff',
          300: '#75c0ff',
          400: '#2ea1ff',
          500: '#0684f5',
          600: '#0066d1',
          700: '#0052a8',
          800: '#08468a',
          900: '#0c3c72',
        },
      },
    },
  },
  plugins: [],
};
