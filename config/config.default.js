'use strict';

module.exports = appInfo => {
  const config = {};

  // should change to your own
  config.keys = appInfo.name + '_1505540765646_9754';

  // add your config here
  config.ejs = {};

  config.static = {
    maxAge: 3600
  };

  config.view = {
    mapping: {
      '.ejs': 'ejs',
    },
  };

  return config;
};
