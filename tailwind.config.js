const postcss = require('postcss');
const _ = require('lodash');
const plugin = require('tailwindcss/plugin');

/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'index.html',
      'src/main.ts'
    ]
  },
  theme: {
    screens: {
      md: '768px',
      lg: '1200px',
      xl: '1920px',
      light: { raw: "(prefers-color-scheme: light)" },
      dark: { raw: "(prefers-color-scheme: dark)" },
    },
    colors: {
      'white': 'white',
      'transparent': 'rgba(0,0,0,0)',
      'gray-light': '#F6F6F6',
      'gray-dark': '#7E7E7E',
      black: {
        'dark': '#1a1c1f',
        default: '#2C3135',
        'light': 'rgb(39, 46, 48)',
        'lighter': '#2E363B'
      },
      'hyper-green': '#34eda3',
      'purple': '#cf51ad',
      'blue': '#51B1CF',
      'red': '#db2146',
    },
    container: {
      center: true,
      padding: '1.5rem',
    },
    fontFamily: {
      body: ['Work Sans', 'arial' ,'sans-serif'],
      variable: ['Work Sans Variable', 'Work Sans', 'arial', 'sans-serif'],
      mono: ['Inconsolata', 'consolas', 'menlo', 'courier', 'monospaced'],
    },
    fontSize: {
      'base': '1rem',
      '12': '0.75rem',
      '14': '0.875rem',
      '18': '1.125rem',
      '19': '1.1875rem',
      '20': '1.25rem',
      '21': '1.3125rem',
      '22': '1.375rem',
      '24': '1.5rem',
      '26': '1.625rem',
      '28': '1.75rem',
      '32': '2rem',
      '38': '2.375rem',
      '44': '2.75rem',
      '48': '3rem',
      '60': '3.75rem',
      '74': '4.625rem',
    },
    lineHeight: {
      'base': '100%',
      '90': '90%',
      '95': '95%',
      '105': '105%',
      '110': '110%',
      '115': '115%',
      '120': '120%',
      '130': '130%',
      '145': '145%',
      '160': '160%',
    },
    letterSpacing: {
      '02': '-0.02em',
      '03': '-0.03em',
    },
    spacing: {
			px: '1px',
			'0': '0',
			'4': '0.25rem',
      '8': '0.5rem',
      '12': '0.75rem',
			'16': '1rem',
			'24': '1.5rem',
      '32': '2rem',
      '36': '2.25rem',
			'48': '3rem',
      '64': '4rem',
      '70': '4.375rem',
      '80': '5rem',
      '98': '6.125rem',
      '128': '8rem',
		},
    zIndex: {
      '-1': '-1',
      '0': 0,
      '10': 10,
      '20': 20,
      '30': 30,
      '40': 40,
      '50': 50,
      'auto': 'auto',
    },
    themeVariants: {
      'dark': 'dark-mode',
    },
    flexGrow: {
      '0': 0,
      '1': 1,
      '2': 2,
    },
    borderWidth: {
      default: '1px',
      '0': '0',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '5': '5px',
      '6': '6px',
      '8': '8px',
    },
    extend: {
      boxShadow: {
        morphic: '-3px -3px 6px 2px #ffffff, 2px 3px 8px 0px rgba(0, 0, 0, 0.5)',
        'morphic-small': '-1px -3px 6px 0px white, 1px 2px 3px -1px rgba(0, 0, 0, 0.5)',
        'morphic-light': '-2px -2px 8px 2px white, 2px 3px 8px 0px rgba(0, 0, 0, 0.25)',
        'inset-morphic-light': 'inset 2px 3px 8px 0px rgba(0, 0, 0, 0.25), inset -2px -2px 8px 2px white',
        'inset-morphic-small': 'inset 1px 2px 3px 0px rgba(0, 0, 0, 0.25), inset -1px -2px 3px 2px white',
        'morphic-dark': '5px 5px 8px #212528, -2px -2px 6px #404244',
        'morphic-dark-small': '1px 1px 3px #1c2022, -1px -1px 3px #484b4e',
      },
      inset: {
        '1': '1rem',
        '2': '2rem',
        '3': '3rem',
        '4': '4rem',
        '10': '10rem',
      },
      fontSize: {
        '09': '.9rem',
        'l': '1.15rem',
      },
      fill: theme => ({
        'bisa-blue': theme('colors.bisa-blue'),
        'bisa-orange': theme('colors.bisa-orange'),
      })
    },
  },
  variants: {
    appearance: ['responsive'],
    backgroundAttachment: ['responsive'],
    backgroundColor: ['responsive', 'hover', 'focus'],
    backgroundPosition: ['responsive'],
    backgroundRepeat: ['responsive'],
    backgroundSize: ['responsive'],
    borderCollapse: ['responsive'],
    borderColor: ['responsive', 'hover', 'focus'],
    borderRadius: ['responsive'],
    borderStyle: ['responsive'],
    borderWidth: ['responsive'],
    cursor: ['responsive', 'hover'],
    display: ['responsive'],
    flexDirection: ['responsive'],
    divideColor: ['responsive', 'hover', 'focus'],
    flexWrap: ['responsive'],
    alignItems: ['responsive'],
    alignSelf: ['responsive'],
    justifyContent: ['responsive'],
    alignContent: ['responsive'],
    flex: ['responsive'],
    flexGrow: ['responsive'],
    flexShrink: ['responsive'],
    order: ['responsive'],
    float: ['responsive'],
    fontFamily: ['responsive', 'variable-font'],
    fontWeight: ['responsive', 'hover', 'focus'],
    height: ['responsive'],
    lineHeight: ['responsive'],
    listStylePosition: ['responsive'],
    listStyleType: ['responsive'],
    margin: ['responsive'],
    maxHeight: ['responsive'],
    maxWidth: ['responsive'],
    minHeight: ['responsive'],
    minWidth: ['responsive'],
    objectFit: ['responsive'],
    objectPosition: ['responsive'],
    opacity: ['responsive', 'hover'],
    outline: ['responsive', 'focus'],
    overflow: ['responsive'],
    padding: ['responsive'],
    pointerEvents: ['responsive'],
    position: ['responsive'],
    inset: ['responsive'],
    resize: ['responsive'],
    boxShadow: ['responsive', 'hover', 'focus'],
    fill: ['responsive'],
    stroke: ['responsive'],
    tableLayout: ['responsive'],
    textAlign: ['responsive'],
    textColor: ['responsive', 'hover', 'focus'],
    fontSize: ['responsive'],
    fontStyle: ['responsive'],
    textTransform: ['responsive'],
    textDecoration: ['responsive', 'hover', 'focus'],
    transitionDuration: ['responsive', 'hover', 'focus'],
    fontSmoothing: ['responsive'],
    letterSpacing: ['responsive'],
    userSelect: ['responsive'],
    verticalAlign: ['responsive'],
    visibility: ['responsive'],
    whitespace: ['responsive'],
    wordBreak: ['responsive'],
    width: ['responsive'],
    zIndex: ['responsive'],
  },
  plugins: [
    function({ addVariant, e }) {
      addVariant('variable-font', ({ container, separator }) => {
        const supportsRule = postcss.atRule({ name: 'supports', params: '(font-variation-settings: \'wght\' 200)' })
        supportsRule.append(container.nodes)
        container.append(supportsRule)
        supportsRule.walkRules(rule => {
          rule.selector = `.${e(`variable-font${separator}${rule.selector.slice(1)}`)}`
        })
      })
    },
    function({ addUtilities }) {
      const backfaceVisibility = {
        '.backface-visibility-visible': {
          'backface-visibility': 'visible',
        },
        '.backface-visibility-hidden': {
          'backface-visibility': 'hidden',
        },
      }
      addUtilities(backfaceVisibility, ['responsive', 'hover'])
    },
    function({ addUtilities, e, theme, variants }) {
      const colors = theme('colors', {})
      const decorationVariants = variants('textDecoration', [])

      const textDecorationColorUtility = _.map(colors, (color, name) => ({
        [`.decoration-${e(name)}`]: {
          textDecorationColor: `${color}`
        }
      }))

      addUtilities(textDecorationColorUtility, decorationVariants)
    },
  ],
}
