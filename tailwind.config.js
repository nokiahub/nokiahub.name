/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        text: 'var(--text)',
        textLight: 'var(--text-light)',
        heading: 'var(--heading)',
        headingBlack: 'var(--heading-black)',
        accent: 'var(--accent)',
        background: 'var(--background)'
      }
    }
  },
  plugins: []
};
