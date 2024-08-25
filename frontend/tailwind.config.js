/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },

      colors: {
        'primary-blue': '#013FB7',
        'secondary-blue': '#3C5BFF',
        'primary-green': '#054D0F',
        'secondary-green': '#00B507',
        'primary-orange': '#C23A00',
        'secondary-orange': '#EF940A',
        'primary-gray-green': '#415E45',
        'secondary-gray-green': '#7D977E',
        'text-gray': '#A29F9F',
        'container-gray': '#E6E6E6',
      },

      animation: {
        loading: 'loading 1s ease-in-out forwards',
        scaling: 'scaling 3s ease-in-out infinite',
        animateBtn: 'animateBtn 3s ease-in-out infinite',
        bounce: 'bounce 0.5s linear',
      },
      keyframes: {
        loading: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },

        scaling: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        },
        animateBtn: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scaleX(1.05)' },
        },
        bounce: {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(0, 0) scale(0.5)' },
          '70%': { transform: 'translate(0, 0) scale(0.85)' },
          '100%': { transform: 'translate(0, 0) scale(1)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
