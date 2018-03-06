'use strict';

const RPCClient = require('@alicloud/pop-core').RPCClient;

const ALIYUN_PHOTO = Symbol('app#aliyunPhoto');

module.exports = {
  /**
   * aliyunPhoto
   * @member {Object} Application#aliwork
   */
  get aliyunPhoto() {
    if (!this[ALIYUN_PHOTO]) {
      this[ALIYUN_PHOTO] = new RPCClient(this.config.aliyunPhoto);
    }
    return this[ALIYUN_PHOTO];
  },
};
