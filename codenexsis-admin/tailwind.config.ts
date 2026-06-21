import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#14121d',
        bg2: '#1d1a28',
        bg3: '#282435',
        line: 'rgba(255,255,255,0.08)',
        red: { DEFAULT: '#ef2b3d', hi: '#ff4258', lo: '#b8101f' },
        ink: { DEFAULT: '#f5f5f8', muted: '#b4b4c0', dim: '#74747f' },
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
