/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050014', // Deep purple/black
        surface: '#0F0529',    // Slightly lighter purple for cards
        primary: '#A855F7',    // Neon purple/violet
        secondary: '#7C3AED',  // Darker violet
        text: '#FFFFFF',
        muted: '#94A3B8',
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
