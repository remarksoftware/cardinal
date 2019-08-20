const webpackMerge = require('webpack-merge');

const sourceMapLoader = () => webpackConfig =>
  webpackMerge(webpackConfig, {
    module: {
      rules: [
        {
          test: /\.js$/,
          enforce: 'pre',
          exclude: /node_modules/,
          loader: 'source-map-loader'
        }
      ]
    }
  });

module.exports = sourceMapLoader;
