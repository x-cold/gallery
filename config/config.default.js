'use strict';

exports.keys = appInfo.name + '_1505540765646_9754';

exports.static = {
  maxAge: 3600
};

exports.view = {
  mapping: {
    '.ejs': 'ejs',
  },
};

// normal oss bucket
exports.oss = {
  client: {
    accessKeyId: 'your access key',
    accessKeySecret: 'your access secret',
    bucket: 'your bucket name',
    endpoint: 'oss-cn-hongkong.aliyun.com',
    timeout: '60s',
  },
};
