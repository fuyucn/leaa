/* eslint-disable */
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const lessToJS = require('less-vars-to-js');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

const env = require('@leaa/www/configs/next-dotenv-object');

const withDotenv = require('@leaa/www/configs/next-dotenv');
const withImage = require('@leaa/www/configs/next-image');
const withAntd = require('@leaa/www/configs/next-antd');

const antdVariables = lessToJS(fs.readFileSync(path.resolve(__dirname, './styles/variables.less'), 'utf8'));

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = file => {};
}

const webpackConfig = (config, options) => {
  config.plugins.push(
    new LodashModuleReplacementPlugin({ paths: true }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn|en/),
    new webpack.NormalModuleReplacementPlugin(
      // fixed wechat HMR
      /\/eventsource$/,
      path.resolve(__dirname, './configs/next-eventsource.js'),
    ),
    new FilterWarningsPlugin({
      // ignore ANTD chunk styles [mini-css-extract-plugin] warning
      exclude: /Conflicting order between:/,
    }),
  );

  // comstom antd icon
  config.resolve.alias['@ant-design/icons/lib/dist$'] = path.resolve(__dirname, './configs/next-antd-icon');
  config.resolve.alias['swiper$'] = 'swiper/dist/js/swiper.js';

  config.node = {
    fs: 'empty',
  };

  return config;
};

module.exports = withDotenv(
  withImage(
    withAntd({
      cssModules: true,
      cssLoaderOptions: {
        sourceMap: false,
        importLoaders: 1,
        localIdentName: '[local]--[hash:8]',
      },
      lessLoaderOptions: {
        javascriptEnabled: true,
        modifyVars: antdVariables,
      },
      webpack: webpackConfig,
      // target: 'serverless',
      env,
    }),
  ),
);
