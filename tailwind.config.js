/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'cafe': {
          50: '#F5F0E9',
          100: '#E6D5C3',
          200: '#D4B79E',
          300: '#C19878',
          400: '#AB7A52',
          500: '#8B4513',
          600: '#723A0F',
          700: '#5A2E0C',
          800: '#422208',
          900: '#2A1605',
        },
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in',
        'fade-in-delayed': 'fadeIn 1.5s ease-in',
        'fade-in-delayed-more': 'fadeIn 2s ease-in',
        'float': 'float 3s ease-in-out infinite',
        'floatSmooth': 'floatSmooth 2s ease-in-out infinite',
        'spin': 'spin 4s linear infinite',
        'shine': 'shine 1.5s infinite',
        'fillContainer': 'fillContainer 2.5s ease-out forwards',
        'bubbleLg1': 'bubble 3s ease-in-out infinite',
        'bubbleLg2': 'bubble 2.5s ease-in-out infinite 0.2s',
        'bubbleLg3': 'bubble 3.5s ease-in-out infinite 0.4s',
        'bubbleMd1': 'bubble 3s ease-in-out infinite 0.1s',
        'bubbleMd2': 'bubble 2.8s ease-in-out infinite 0.3s',
        'bubbleMd3': 'bubble 3.2s ease-in-out infinite 0.5s',
        'bubbleMd4': 'bubble 2.7s ease-in-out infinite 0.7s',
        'bubbleSm1': 'bubble 2.4s ease-in-out infinite 0.1s',
        'bubbleSm2': 'bubble 2.6s ease-in-out infinite 0.3s',
        'bubbleSm3': 'bubble 2.8s ease-in-out infinite 0.5s',
        'bubbleSm4': 'bubble 2.5s ease-in-out infinite 0.7s',
        'bubbleSm5': 'bubble 2.7s ease-in-out infinite 0.9s',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'fade-in-scale': 'fadeInScale 0.5s ease-out',
        'fill': 'fill 5s ease-in-out forwards',
        'bubble': 'bubble 6s ease-in-out infinite',
        'coffee-pour': 'pourCoffee 3s ease-in-out infinite',
        'steam-rise': 'steamRise 3s ease-in-out infinite',
        'stir-coffee': 'stirCoffee 3s linear infinite',
        'milk-drop': 'milkDrop 2s ease-in-out infinite',
        'bean-bounce': 'beanBounce 2s ease-in-out infinite',
        'grinder': 'grinder 2.5s ease-in-out infinite',
        'cup-slide': 'cupSlide 1s ease-out',
        'latte-art': 'latteArt 3s ease-in-out',
        'coffee-drip': 'coffeeDrip 2s linear infinite',
        'spoon-stir': 'spoonStir 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        floatSmooth: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        shine: {
          '0%': { left: '-100%' },
          '100%': { left: '100%' },
        },
        fillContainer: {
          '0%': { height: '0%' },
          '100%': { height: '100%' },
        },
        bubble: {
          '0%': { 
            transform: 'translateY(100%) scale(0)',
            opacity: '0'
          },
          '50%': { 
            opacity: '0.8'
          },
          '100%': {
            transform: 'translateY(-100%) scale(1)',
            opacity: '0'
          }
        },
        fadeInUp: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        fadeInScale: {
          '0%': { 
            opacity: '0',
            transform: 'scale(0.95)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)'
          },
        },
        fill: {
          '0%': { height: '0%' },
          '100%': { height: '100%' }
        },
        pourCoffee: {
          '0%': { height: '0%', opacity: '0.5' },
          '50%': { opacity: '0.8' },
          '100%': { height: '100%', opacity: '0.6' }
        },
        steamRise: {
          '0%': { 
            transform: 'translateY(0) scaleX(1)',
            opacity: '0'
          },
          '50%': { 
            transform: 'translateY(-20px) scaleX(1.6)',
            opacity: '0.5'
          },
          '100%': { 
            transform: 'translateY(-40px) scaleX(1)',
            opacity: '0'
          }
        },
        stirCoffee: {
          '0%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(180deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        milkDrop: {
          '0%': { 
            transform: 'scale(1)',
            opacity: '1'
          },
          '50%': { 
            transform: 'scale(1.5)',
            opacity: '0.5'
          },
          '100%': { 
            transform: 'scale(2)',
            opacity: '0'
          }
        },
        beanBounce: {
          '0%, 100%': { 
            transform: 'translateY(0) rotate(0deg)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
          },
          '50%': { 
            transform: 'translateY(-25%) rotate(180deg)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
          }
        },
        grinder: {
          '0%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(90deg)' },
          '50%': { transform: 'rotate(180deg)' },
          '75%': { transform: 'rotate(270deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        cupSlide: {
          '0%': { 
            transform: 'translateX(-100%)',
            opacity: '0'
          },
          '100%': { 
            transform: 'translateX(0)',
            opacity: '1'
          }
        },
        latteArt: {
          '0%': { 
            clipPath: 'circle(0% at 50% 50%)'
          },
          '100%': { 
            clipPath: 'circle(100% at 50% 50%)'
          }
        },
        coffeeDrip: {
          '0%': { 
            height: '0%',
            opacity: '1'
          },
          '50%': { 
            height: '50%',
            opacity: '0.5'
          },
          '100%': { 
            height: '100%',
            opacity: '0'
          }
        },
        spoonStir: {
          '0%': { 
            transform: 'rotate(0deg) translateX(0)'
          },
          '25%': { 
            transform: 'rotate(45deg) translateX(10px)'
          },
          '50%': { 
            transform: 'rotate(180deg) translateX(0)'
          },
          '75%': { 
            transform: 'rotate(315deg) translateX(-10px)'
          },
          '100%': { 
            transform: 'rotate(360deg) translateX(0)'
          }
        },
      }
    },
  },
  plugins: [],
}