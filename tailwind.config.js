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
      },
      spacing: {}
    },
    colors: {
      yellow: "#FDE516",
      green: "#00FF00",
      green2: "#A2FB64",
      green3: "#45BF53",
      lava: "#FF7B1C",
      lightbrown: "#FFD9A7",
      brown2: "#A76B40",
      brown: "#684328",
      purple: "#A416FD",
      white: "#FFFFFF",
      black: "#000000",
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
for (let i = 0; i <= 100; i++) {
  config.theme.extend.spacing[i] = i * 0.25 + 'rem'
  config.theme.extend.spacing[i + 'vh'] = i + 'vh'
  config.theme.extend.spacing[i + 'vw'] = i + 'vw'
  config.theme.extend.spacing[i + 'p'] = i + '%'
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