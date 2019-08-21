const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const minifyJs = () => config =>
  webpackMerge(config, {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          screw_ie8: true,
          warnings: false
        },
        mangle: {
          screw_ie8: true
        },
        output: {
          comments: false,
          screw_ie8: true
        }
      })
    ]
  });

module.exports = minifyJs;
