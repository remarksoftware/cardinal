const webpackMerge = require('webpack-merge');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const typescript = options => config =>
  webpackMerge(config, {
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            options.hotReload ? 'react-hot-loader/webpack' : void 0,
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true
              }
            }
          ].filter(Boolean)
        }
      ]
    },
    plugins: [
      options.forkTypeChecking ? new ForkTsCheckerWebpackPlugin() : void 0
    ].filter(Boolean)
  });

module.exports = typescript;
