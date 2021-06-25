module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    fontFamily: {
      'source-sans': ['Source Sans Pro', 'ui-sans-serif', 'system-ui'],
    },
    cursor: {
      auto: 'auto',
      default: 'default',
      pointer: 'pointer',
      wait: 'wait',
      text: 'text',
      move: 'move',
      'not-allowed': 'not-allowed',
      crosshair: 'crosshair',
      'zoom-in': 'zoom-in',
    },
    extend: {
      boxShadow: {
        red: '0 2px 10px rgba(239, 68, 68, 0.85)',
      },
      height: {
        landing: '600px',
        landingMd: 'calc(600px / 1.3)',
        landingSm: 'calc(600px / 1.8)',
        landingXs: 'calc(600px / 2)',
        launchHeader: '400px',
        launchHeaderMd: 'calc(400px / 1.3)',
        launchHeaderSm: 'calc(400px / 1.8)',
        launchHeaderXs: 'calc(400px / 2.3)',
        galleryImage: '750px',
        galleryImageMd: 'calc(750px / 1.3)',
        galleryImageSm: 'calc(750px / 1.8)',
        galleryImageXs: 'calc(750px / 2.3)',
      },
      minHeight: {
        landingTile: '600px',
      },
      backgroundImage: (theme) => ({
        'landing-image-gradient':
          'linear-gradient(45deg, rgba(185,28,28,0.75) 20%, rgba(55, 65, 81, 0.6) 60%)',
        'launch-image-gradient':
          'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(31, 41, 55, 0.75) 115%)',
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
