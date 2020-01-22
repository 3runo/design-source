/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const path = require('path');
const webpackMerge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const loadPresets = require('./webpack/loadPresets');
const cleanConfig = { cleanAfterEveryBuildPatterns: ['dist', 'build'] };
const fallBackConfig = { mode: 'production', presets: [], extractCSS: false };
function loadMode(env) {
  return require(`./webpack/webpack.${env.mode}.js`)(env);
}
function logConfig(percentage, message) {
  console.info(`${(percentage * 100).toFixed()}% ${message}`);
}

module.exports = (env) => {
  console.log('==> Bundling all packages', env);
  const { mode } = env || fallBackConfig;
  const config = webpackMerge(
    {
      mode,
      entry: {
        button: path.join(__dirname, './packages/button/index.ts'),
        anchor: path.join(__dirname, './packages/anchor/index.ts'),
      },
      resolve: {
        modules: [path.join(__dirname, 'node_modules'), path.join(__dirname)],
        extensions: ['.ts', '.tsx'],
      },
      module: {
        rules: [
          {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: { cacheDirectory: true },
            },
          },
        ],
      },
      output: {
        chunkFilename: '[id].js',
      },
      plugins: [
        new CleanWebpackPlugin(cleanConfig),
        new webpack.ProgressPlugin(logConfig),
      ],
    },
    loadMode(env),
    loadPresets(env),
  );

  return config;
};
