/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpackMerge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const loadPresets = require('../../webpack/loadPresets');
const cleanConfig = { cleanAfterEveryBuildPatterns: ['dist', 'build'] };
const fallBackConfig = { mode: 'production', presets: [], extractCSS: false };
function loadMode(env) {
  return require(`../../webpack/webpack.${env.mode}.js`)(env);
}

module.exports = (env) => {
  console.log('📦 ', env);
  const { mode } = env || fallBackConfig;
  const config = webpackMerge(
    {
      mode,
      entry: path.join(__dirname, 'index.ts'),
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
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        library: '@design-source/anchor',
        libraryTarget: 'umd',
        umdNamedDefine: true,
      },
      plugins: [new CleanWebpackPlugin(cleanConfig)],
    },
    loadMode(env),
    loadPresets(env),
  );

  return config;
};
