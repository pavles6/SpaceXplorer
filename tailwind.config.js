module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'source-sans': ['Source Sans Pro', 'ui-sans-serif', 'system-ui'],
    },
    extend: {
      height: {
        landing: '600px',
      },
      minHeight: {
        previewCard: '600px',
      },
      width: {
        previewCard: 'calc(100% - 2.5rem)',
      },
      backgroundImage: (theme) => ({
        'landing-image':
          "linear-gradient(45deg, rgba(185,28,28,0.75) 20% , rgba(55, 65, 81, 0.6)60%), url('/img/landing-bg.jpg')",
        'launches-preview-bg':
          " linear-gradient(45deg, rgba(23,23,23,0.8) 0%, rgba(0,0,0,0.25) 100%), url('/img/launches-preview.jpg')",
      }),
      zIndex: {
        '-2': '-2',
        '-1': '-1',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
