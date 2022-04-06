module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
    './src/**/*.jsx',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        steins: ['SteinsFont', 'Garamond-font'],
      },
    },
  },
  variants: {},
  plugins: [],
};
