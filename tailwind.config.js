// tailwind.config.js
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            50: '#EBF5FF',
            100: '#E1EFFE',
            200: '#C3DDFD',
            300: '#A4CAFE',
            400: '#76A9FA',
            500: '#4F46E5', // indigo-600 in Tailwind
            600: '#4338CA', // indigo-700 in Tailwind
            700: '#3730A3', // indigo-800 in Tailwind
            800: '#312E81', // indigo-900 in Tailwind
            900: '#1E1B4B',
          },
        },
        spacing: {
          '72': '18rem',
          '84': '21rem',
          '96': '24rem',
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        },
        boxShadow: {
          'outline-primary': '0 0 0 3px rgba(79, 70, 229, 0.45)',
        },
        animation: {
          'bounce-slow': 'bounce 2s infinite',
        },
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/aspect-ratio'),
      require('@tailwindcss/typography'),
    ],
  };