/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: '#FAFAFC',
        card: '#FFFFFF',
        ink: '#171D2F',
        'ink-soft': '#333A52',
        pine: '#3A4FD8',
        'pine-deep': '#2A3AAE',
        'pine-tint': '#EEF1FD',
        seal: '#F97350',
        'seal-tint': '#FEEAE3',
        mist: '#666D85',
        line: '#E4E6EF',

        /* Back-compat aliases */
        primary: '#3A4FD8',
        'primary-hover': '#2A3AAE',
        'primary-light': '#EEF1FD',
        accent: '#F97350',
        'bg-page': '#FAFAFC',
        page: '#FAFAFC',
        'bg-surface': '#FFFFFF',
        surface: '#FFFFFF',
        'text-heading': '#171D2F',
        heading: '#171D2F',
        'text-body': '#494F66',
        body: '#494F66',
        'text-muted': '#666D85',
        muted: '#666D85',
        border: '#E4E6EF',
        success: '#3A4FD8',
        'success-light': '#EEF1FD',
      },
      fontFamily: {
        sans: ['Public Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(23,29,47,.05), 0 8px 24px -12px rgba(23,29,47,.12)',
        lift: '0 2px 4px rgba(23,29,47,.06), 0 18px 40px -16px rgba(23,29,47,.22)',
      },
    },
  },
  plugins: [],
}
