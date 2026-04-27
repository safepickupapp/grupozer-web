// tokens/tailwind.config.js
// Drop-in Tailwind preset for Grupo ZER.
// Mirrors tokens/tokens.css. If you change one, change the other.

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette (closed set — see CLAUDE.md)
        navy:    { DEFAULT: '#00205C', 90: '#0a2c66', 80: '#1a3b75' },
        sky:     { DEFAULT: '#4197CB', soft: '#e6f0f8' },
        gray:    { DEFAULT: '#76777A', 60: '#9ea0a3', 20: '#e7e7e9', 10: '#f3f3f4' },
        paper:    '#fafafa',
        ink:      '#1c1c20',
        'footer-bg': '#0a1430',
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      fontWeight: {
        extralight: '200',
        light:      '300',
        normal:     '400',
        medium:     '500',
        semibold:   '600',
        bold:       '700',
        extrabold:  '800',
      },
      fontSize: {
        // Fluid scale via clamp()
        h1:    ['clamp(40px, 6.4vw, 84px)', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
        h2:    ['clamp(32px, 4.2vw, 52px)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        h3:    ['clamp(22px, 2.4vw, 28px)', { lineHeight: '1.2',  letterSpacing: '-0.02em' }],
        lede:  ['clamp(16px, 1.2vw, 19px)', { lineHeight: '1.55' }],
      },
      borderRadius: {
        sm: '8px',
        md: '14px',
        lg: '22px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0, 32, 92, 0.04), 0 1px 3px rgba(0, 32, 92, 0.06)',
        md: '0 8px 24px -10px rgba(0, 32, 92, 0.18), 0 2px 6px rgba(0, 32, 92, 0.06)',
        lg: '0 30px 60px -20px rgba(0, 32, 92, 0.28), 0 12px 24px -12px rgba(0, 32, 92, 0.12)',
      },
      maxWidth: {
        container: '1200px',
      },
      transitionTimingFunction: {
        'brand-out': 'cubic-bezier(0.2, 0.7, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
