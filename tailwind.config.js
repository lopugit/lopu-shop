const config = {
  prefix: 'x',
  mode: 'jit',
  content: [
    './src/theme/layout/*.liquid',
    './src/theme/templates/*.liquid',
    './src/theme/templates/customers/*.liquid',
    './src/theme/sections/*.liquid',
    './src/theme/snippets/*.liquid',
  ],
  theme: {
    screens: {
      'md': '750px',
      'lg': '990px',
    },
    extend: {
      fontFamily: {
        'heading': 'var(--font-heading-family)'
      },
    },
    colors: {
      yellow: "#FDE516",
      purple: "#A416FD",
      white: "#FFFFFF",
      black: "#000000",
    }
  },
  plugins: [],
}

module.exports = config