/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        sans: ['"DM Sans"', 'sans-serif'], // Set DM Sans as default sans
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
