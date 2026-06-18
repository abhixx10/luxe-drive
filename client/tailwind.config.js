/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        night: '#050507',
        onyx: '#121217',
        graphite: '#1d1d24',
        champagne: '#d8b66a',
        ember: '#d94a38',
        chrome: '#d7dee8',
        mint: '#5eead4'
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 60px rgba(216, 182, 106, 0.18)',
        glass: '0 24px 80px rgba(0, 0, 0, 0.32)'
      }
    }
  },
  plugins: []
};
