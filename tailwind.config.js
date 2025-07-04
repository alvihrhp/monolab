/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2f304e',
          50: '#f8f8fc',
          100: '#f0f0f8',
          200: '#dcddef',
          300: '#bdbde0',
          400: '#9a9acd',
          500: '#7c7dbb',
          600: '#656ba8',
          700: '#555b97',
          800: '#474c7e',
          900: '#2f304e',
          950: '#252645',
        },
        secondary: {
          DEFAULT: '#0068b2',
          50: '#f0f8ff',
          100: '#e0f1fe',
          200: '#bae4fd',
          300: '#7dd0fc',
          400: '#38baf8',
          500: '#0fa3e9',
          600: '#0082c7',
          700: '#0068b2',
          800: '#045a92',
          900: '#0a4b79',
          950: '#072f50',
        },
        tertiary: {
          DEFAULT: '#f4961c',
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#f4961c',
          700: '#c2661a',
          800: '#9a4f17',
          900: '#7c3f15',
          950: '#451f08',
        },
        neutral: {
          DEFAULT: '#ffffff',
          50: '#ffffff',
          100: '#fefefe',
          200: '#fefefe',
          300: '#fdfdfd',
          400: '#fcfcfc',
          500: '#fafafa',
          600: '#f5f5f5',
          700: '#e5e5e5',
          800: '#d4d4d4',
          900: '#a3a3a3',
          950: '#525252',
        },
        black: {
          DEFAULT: '#000000',
          50: '#f7f7f7',
          100: '#e3e3e3',
          200: '#c8c8c8',
          300: '#a4a4a4',
          400: '#818181',
          500: '#666666',
          600: '#515151',
          700: '#434343',
          800: '#383838',
          900: '#000000',
          950: '#000000',
        },
      },
      fontFamily: {
        'gotham': ['var(--font-gotham)'],
      },
    },
  },
  plugins: [],
} 