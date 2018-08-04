const webpackBaseConfig = require('./webpack.base.config.js');
const {LoaderOptionsPlugin} = require('webpack');

module.exports = function() {
  const devConfig = webpackBaseConfig;
  devConfig.mode = 'development';
  devConfig.devtool = 'inline-source-map';
  devConfig.cache = true;
  devConfig.watchOptions = {
    ignored: [/node_modules/],
    aggregateTimeout: 100,
    poll: 1000
  };
  devConfig.plugins = devConfig.plugins.concat(
    new LoaderOptionsPlugin({
      options: {
        debug: true,
        eslint: {
          failOnWarning: false,
          failOnError: false,
          fix: true,
          quiet: false,
        },
      },
    })
  );
  return devConfig;
};
