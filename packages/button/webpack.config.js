/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const path = require('path');
const webpackMerge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const loadPresets = require('../../webpack/loadPresets');

const fallbackEnv = { mode: 'production', presets: [], extractCSS: false };
const modeConfig = (env) =>
  require(`../../webpack/webpack.${env.mode}.js`)(env);
const percentageLog = (percentage, message) => {
  console.info(`${(percentage * 100).toFixed()}% ${message}`);
};

module.exports = (env) => {
  console.log('📦 ', env);
  const { mode } = env || fallbackEnv;
  const config = webpackMerge(
    {
      mode,
      entry: [path.join(__dirname, 'index.ts')],
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
              options: {
                cacheDirectory: true,
                cwd: path.join(__dirname),
              },
            },
          },
        ],
      },
      output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        library: '@design-source/button',
        libraryTarget: 'umd',
        umdNamedDefine: true,
      },
      plugins: [
        new CleanWebpackPlugin({
          cleanAfterEveryBuildPatterns: ['dist', 'build'],
        }),
        new webpack.ProgressPlugin(percentageLog),
      ],
    },
    modeConfig(env),
    loadPresets(env),
  );

  return config;
};
