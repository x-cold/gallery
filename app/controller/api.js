'use strict';

const { Controller } = require('egg');

class ApiController extends Controller {
  // test case: http://localhost:7001/api/photostore?name=mythum
  async getPhotoStore() {
    const { app, ctx } = this;
    const { aliyunPhoto } = app;
    try {
      const result = await aliyunPhoto.request('GetPhotoStore', {
        StoreName: ctx.query.name,
      });
      ctx.body = result;
    } catch(error) {
      throw error;
    }
  }
}

module.exports = ApiController;
