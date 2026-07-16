/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: '#FAFAF7',
        ink: '#16170F',
        brand: { DEFAULT: '#0D9488', deep: '#0B5B54', soft: '#EAF6F4' },
        spark: '#E4572E',
        line: '#E8E6DD',
        // legacy aliases
        primary: '#0D9488',
        'primary-hover': '#0F766E',
        'primary-light': '#EAF6F4',
        accent: '#E4572E',
        'bg-page': '#FAFAF7',
        page: '#FAFAF7',
        'bg-surface': '#FFFFFF',
        surface: '#FFFFFF',
        'text-heading': '#16170F',
        heading: '#16170F',
        'text-body': '#55584E',
        body: '#55584E',
        'text-muted': '#9a9c90',
        muted: '#9a9c90',
        border: '#E8E6DD',
        success: '#10B981',
        'success-light': '#D1FAE5',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Bricolage Grotesque', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        paper: '0 1px 2px rgba(22,23,15,0.04), 0 12px 40px -12px rgba(22,23,15,0.14)',
        lift: '0 20px 60px -20px rgba(22,23,15,0.22)',
      },
    },
  },
  plugins: [],
}
