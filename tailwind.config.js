module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'source-sans': ['Source Sans Pro', 'ui-sans-serif', 'system-ui'],
    },
    extend: {
      boxShadow: {
        red: '0 2px 10px rgba(239, 68, 68, 0.85)',
      },
      height: {
        landing: '600px',
      },
      minHeight: {
        landingTile: '600px',
      },
      backgroundImage: (theme) => ({
        'landing-image':
          "linear-gradient(45deg, rgba(185,28,28,0.75) 20% , rgba(55, 65, 81, 0.6)60%), url('/img/landing-bg.jpg')",
      }),
      zIndex: {
        '-2': '-2',
        '-1': '-1',
      },
    },
  },
  variants: {
    extend: {
      translate: ['hover', 'focus'],
    },
  },
  plugins: [],
}
