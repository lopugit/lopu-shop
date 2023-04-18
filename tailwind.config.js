const config = {
  prefix: 'x-',
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
      fontSize: {
      },
      fontFamily: {
        'pixel': 'DePixelBreit',
        'zakum': 'Zakum',
        'magical': 'Magical',
      },
      spacing: {}
    },
    borderWidth: {
      DEFAULT: '1px',
      0: '0',
      1: '1px',
      2: '2px',
      3: '3px',
      4: '4px',
      5: '5px',
      6: '6px',
      7: '7px',
      8: '8px',
      9: '9px',
      10: '10px',
    },
    colors: {
      yellow: "#FDE516",
      green: "#00FF00",
      green2: "#A2FB64",
      green3: "#45BF53",
      green4: "#0E5803",
      lava: "#FF7B1C",
      lightbrown: "#FFD9A7",
      brown2: "#A76B40",
      brown: "#684328",
      purple: "#A416FD",
      white: "#FFFFFF",
      black: "#000000",
      buttongray: "#CACACD",
      llgray: "#F2F2F2",
      lightgray: "#E5E5E5",
      darkgray: "#2D2D2D",
      red: "#FF0000",
    }
  },
  plugins: [],
}

for (let i = 0; i <= 10; i++) {
  const ii = '0' + i
  config.theme.extend.spacing[ii] = (i / 10) * 0.25 + 'rem'
  config.theme.extend.spacing[ii + 'vh'] = i / 10 + 'vh'
  config.theme.extend.spacing[ii + 'vw'] = i / 10 + 'vw'
  config.theme.extend.spacing[ii + 'p'] = i / 10 + '%'
  config.theme.extend.spacing[i + 'px'] = i + 'px'
}
for (let i = 0; i <= 500; i++) {
  config.theme.extend.spacing[i] = i * 0.25 + 'rem'
  config.theme.extend.spacing[i + 'vh'] = i + 'vh'
  config.theme.extend.spacing[i + 'vw'] = i + 'vw'
  config.theme.extend.spacing[i + 'p'] = i + '%'
  config.theme.extend.spacing[i + 'px'] = i + 'px'
}
for (let i = 0; i <= 250; i++) {
  config.theme.extend.fontSize[i + 'px'] = i + 'px'
}
for (let i = 0; i <= 2200; i++) {
  if (i % 10 === 0) {
    config.theme.extend.spacing[i + 'px'] = i + 'px'
  }
}



module.exports = config