// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './app/**/*.{ts,tsx,js,jsx}',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'particle-float': 'particle-float 15s infinite linear',
        'nebula-float': 'nebula-float 30s infinite linear',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'particle-float': {
          '0%': {
            transform: 'translateY(100vh) translateX(-20vw)',
          },
          '100%': {
            transform: 'translateY(-20vh) translateX(20vw)',
          },
        },
        'nebula-float': {
          '0%': {
            transform: 'translate(-50%, -50%) rotate(0deg)',
          },
          '100%': {
            transform: 'translate(-50%, -50%) rotate(360deg)',
          },
        },
        'twinkle': {
          '0%, 100%': { 
            opacity: 0.2, 
            transform: 'scale(0.8)' 
          },
          '50%': { 
            opacity: 1, 
            transform: 'scale(1.2)' 
          },
        },
        'float': {
          '0%, 100%': { 
            transform: 'translateY(0)' 
          },
          '50%': { 
            transform: 'translateY(-20px)' 
          },
        },
      },
      backgroundImage: {
        'space-gradient': 'linear-gradient(to right, #0D1B2A, #2C3E50, #001D3D)',
      },
    },
  },
  plugins: [],
};