const webpackBaseConfig = require('./webpack.base.config.js');
const {LoaderOptionsPlugin} = require('webpack');

module.exports = function() {
  const myProdConfig = webpackBaseConfig;
  myProdConfig.mode = 'production';

  myProdConfig.plugins = myProdConfig.plugins.concat(
    new LoaderOptionsPlugin({
      minimize: true,
      options: {
        debug: false,
        devtool: false,
        eslint: {
          configFile: "./.eslintrc-prod"
        },
      },
    })
  );

  return myProdConfig;
};
