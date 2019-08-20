const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const defineEnv = (nodeEnv, additionalDefinitions) => config =>
  webpackMerge(config, {
    plugins: [
      new webpack.DefinePlugin({
        ...(additionalDefinitions || {}),
        'process.env.NODE_ENV': JSON.stringify(nodeEnv),
        'process.env.BROWSER': JSON.stringify(true)
      })
    ]
  });

module.exports = defineEnv;
