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
