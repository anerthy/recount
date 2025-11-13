export default {
  content: ['./src/**/*.{astro,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#13ecc8',
        'background-light': '#f6f8f8',
        'background-dark': '#10221f',
      },
      fontFamily: {
        display: ['Manrope', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        full: '9999px',
      },
    },
  },
};
