const webpackMerge = require('webpack-merge');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const compileTypeScript = ({
  hotReload,
  forkTypeChecking,
  compilerOptions
}) => config =>
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
            hotReload ? 'react-hot-loader/webpack' : void 0,
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                compilerOptions
              }
            }
          ].filter(Boolean)
        }
      ]
    },
    plugins: [
      forkTypeChecking ? new ForkTsCheckerWebpackPlugin() : void 0
    ].filter(Boolean)
  });

module.exports = compileTypeScript;
