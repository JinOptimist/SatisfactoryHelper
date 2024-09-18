import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        satisfactory: '#f2c800',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      backgroundImage: {
        'menu-hover': "url('/assets/images/menu-active.png')",
        'hero': "url('/assets/images/hero.png')",
      },
    },
  },
  plugins: [],
};
export default config;
