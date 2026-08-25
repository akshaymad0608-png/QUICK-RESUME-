/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // "Field Notes" palette — teal + amber, warm neutrals. Same class
        // names as before (bg-pine, text-ink, etc.) so every component that
        // already uses them restyles automatically; only the values moved.
        paper: '#FAF9F4',
        card: '#FFFFFF',
        ink: '#17211D',
        'ink-soft': '#3B453F',
        pine: '#086856',
        'pine-deep': '#095F51',
        'pine-tint': '#E3F5F1',
        seal: '#EFA425',
        'seal-tint': '#FDF1DC',
        mist: '#656D67',
        line: '#E3E6E0',
        'ink-muted': '#9CA6A0', // muted text on dark bg-ink surfaces only

        /* Back-compat aliases */
        primary: '#086856',
        'primary-hover': '#095F51',
        'primary-light': '#E3F5F1',
        accent: '#EFA425',
        'bg-page': '#FAF9F4',
        page: '#FAF9F4',
        'bg-surface': '#FFFFFF',
        surface: '#FFFFFF',
        'text-heading': '#17211D',
        heading: '#17211D',
        'text-body': '#414B45',
        body: '#414B45',
        'text-muted': '#656D67',
        muted: '#656D67',
        border: '#E3E6E0',
        success: '#086856',
        'success-light': '#E3F5F1',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(23,33,29,.05), 0 8px 24px -12px rgba(23,33,29,.12)',
        lift: '0 2px 4px rgba(23,33,29,.06), 0 18px 40px -16px rgba(23,33,29,.22)',
      },
    },
  },
  plugins: [],
}
