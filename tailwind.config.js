/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000', // Black
        surface: '#111111',    // Dark Gray/Off-black for cards
        primary: '#22C55E',    // Green (Tailwind green-500 matches request #22C55E)
        secondary: '#FFFFFF',  // White
        text: '#FFFFFF',       // White
        muted: '#A3A3A3',      // Neutral Gray
        gray: {
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa', // Lighter than standard gray-400
          500: '#71717a', // Lighter than standard gray-500
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['Inter', 'sans-serif'],
        display: ['Sora', 'sans-serif'], // New display font for headers
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
