'use strict';

const ossConfig = require('../config').oss;

module.exports = appInfo => {
  const config = {};

  // should change to your own
  config.keys = appInfo.name + '_1505540765646_9754';

  // add your config here
  config.ejs = {};

  config.static = {
    maxAge: 3600
  };

  // normal oss bucket
  config.oss = ossConfig;

  config.view = {
    mapping: {
      '.ejs': 'ejs',
    },
  };

  return config;
};
