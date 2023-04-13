/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#F28C18',

          secondary: '#6D3A9C',

          accent: '#51A800',

          neutral: '#1B1D1D',

          'base-100': '#f5f5f4',

          info: '#2563EB',

          success: '#16A34A',

          warning: '#D97706',

          error: '#DC2626',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
