'use strict';

const {
  aliyunPhoto,
} = require('../.config');
const appName = require('../package').name;

exports.keys = appName + '_1505540765646_9754';

exports.static = {
  maxAge: 3600,
};

exports.view = {
  mapping: {
    '.ejs': 'ejs',
  },
};

exports.aliyunPhoto = aliyunPhoto;
