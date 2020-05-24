require('dotenv').config();
const { parsed: localEnv } = require('dotenv').config();
const webpack = require('webpack');

module.exports = {
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
    return config;
  },
  env: {
    REACT_APP_WORDPRESS_HOST: process.env.REACT_APP_WORDPRESS_HOST
  }
};
