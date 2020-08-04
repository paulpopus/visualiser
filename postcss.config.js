// TODO: add purgecss to this buildtrain.

module.exports = {
  dir: './dist',
  plugins: {
    // deals with tailwind specific functions
    'tailwindcss': './tailwind.config.js',
    // deals with nesting
    // deals with compatibility
    'postcss-preset-env': {},
  },
};
