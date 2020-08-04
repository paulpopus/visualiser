const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
  mode: 'development',
  entry: ['./src/main.ts'],
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      },
      {
        test: /\.scss$/i,
        use: [
          // Creates `style` nodes from JS strings
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: `${__dirname}/postcss.config.js`,
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  output: {
    path: __dirname + '/dist',
    filename: './main.js',
  },
};
