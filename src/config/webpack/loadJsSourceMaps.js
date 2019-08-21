const webpackMerge = require('webpack-merge');

const loadJsSourceMaps = () => config =>
  webpackMerge(config, {
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

module.exports = loadJsSourceMaps;
