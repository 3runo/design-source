/* eslint-disable @typescript-eslint/no-var-requires */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = () => ({
  stats: 'errors-only', // control what bundle information gets displayed.
  devtool: '',
  target: 'node',
  externals: [nodeExternals()],
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        extractComments: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  module: {
    rules: [
      {
        test: (str) => str.endsWith('.css') && !str.endsWith('.module.css'),
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: (str) => str.endsWith('.scss') && !str.endsWith('.module.scss'),
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.module.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?modules&importLoaders=true&localsConvention=dashes',
          'sass-loader',
        ],
      },
      {
        test: /\.module.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?modules&importLoaders=true&localsConvention=dashes',
        ],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
});
