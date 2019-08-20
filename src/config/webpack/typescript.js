const webpackMerge = require('webpack-merge');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const typescript = config => webpackConfig =>
  webpackMerge(webpackConfig, {
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            config.hotReload ? 'react-hot-loader/webpack' : void 0,
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
      config.forkTypeChecking ? new ForkTsCheckerWebpackPlugin() : void 0
    ].filter(Boolean)
  });

module.exports = typescript;
