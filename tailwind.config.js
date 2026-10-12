/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // "Counsel" palette — deep navy + champagne gold on cool off-white.
        // Same class names as every earlier system (bg-pine, text-ink, text-seal)
        // so changing what a name POINTS TO restyles the whole site from here;
        // renaming them would mean editing every component for nothing.
        // src/index.css carries the same values as CSS variables — the two must
        // move together.
        paper: '#F6F7FA',
        card: '#FFFFFF',
        ink: '#0B1020',
        'ink-soft': '#283044',
        pine: '#14213D',
        'pine-deep': '#0E1830',
        'pine-tint': '#EDF0F6',
        seal: '#C9A24A',
        // Gold is a mid tone: it clears 4.5:1 against ink but only ~2.5:1
        // against white. seal is for dark surfaces, seal-deep for light ones.
        'seal-deep': '#8A6A1E',
        'seal-tint': '#F7F1E1',
        mist: '#5B6478',
        line: '#E3E7EF',
        'ink-muted': '#9BA4B9', // muted text on dark bg-ink surfaces only

        /* Back-compat aliases */
        primary: '#14213D',
        'primary-hover': '#0E1830',
        'primary-light': '#EDF0F6',
        accent: '#C9A24A',
        'bg-page': '#F6F7FA',
        page: '#F6F7FA',
        'bg-surface': '#FFFFFF',
        surface: '#FFFFFF',
        'text-heading': '#0B1020',
        heading: '#0B1020',
        'text-body': '#39414F',
        body: '#39414F',
        'text-muted': '#5B6478',
        muted: '#5B6478',
        border: '#E3E7EF',
        success: '#14213D',
        'success-light': '#EDF0F6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        // Tighter and softer than before, and tinted navy rather than neutral
        // black: a wide grey blur is what makes a card look cheap.
        card: '0 1px 2px rgba(11,16,32,.04), 0 10px 28px -16px rgba(11,16,32,.10)',
        lift: '0 2px 6px rgba(11,16,32,.05), 0 26px 50px -22px rgba(11,16,32,.22)',
        hair: '0 0 0 1px rgba(11,16,32,.06)',
      },
      borderRadius: {
        // One step less rounded across the board. Pill buttons read consumer
        // app; a 10px corner reads tailored.
        xl: '0.625rem',
        '2xl': '0.875rem',
        '3xl': '1.25rem',
      },
    },
  },
  plugins: [],
}
