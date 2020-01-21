/* eslint-disable import/no-extraneous-dependencies */

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = ({ extractCSS, analyzer }) => {
  const styleLoader = extractCSS ? MiniCssExtractPlugin.loader : 'style-loader';

  return {
    stats: 'errors-warnings', // control what bundle information gets displayed.
    watchOptions: {
      aggregateTimeout: 1500, // in ms
      poll: 1000, // interval in ms
    },
    module: {
      rules: [
        {
          test: (str) => str.endsWith('.css') && !str.endsWith('.module.css'),
          use: [styleLoader, 'css-loader', 'postcss-loader'],
        },
        {
          test: (str) => str.endsWith('.scss') && !str.endsWith('.module.scss'),
          use: [styleLoader, 'css-loader', 'postcss-loader', 'sass-loader'],
        },
        {
          test: /\.module.css$/,
          use: [
            styleLoader,
            'css-loader?modules&importLoaders=true&localsConvention=asIs',
            'postcss-loader',
          ],
        },
        {
          test: /\.module.scss$/,
          use: [
            styleLoader,
            'css-loader?modules&importLoaders=true&localsConvention=asIs',
            'postcss-loader',
            'sass-loader',
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({}),
      analyzer === 1 ? new WebpackBundleAnalyzer() : false,
    ].filter(Boolean),
  };
};
