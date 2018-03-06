'use strict';

const { Controller } = require('egg');

class GalleryController extends Controller {
  async galleries() {
    const { ctx } = this;
    const galleries = ctx.service.gallery.getGalleries();
    ctx.body = {
      code: 200,
      data: galleries,
    };
  }

  async pushGallery() {
    const { ctx } = this;
    let meta = ctx.request.body;
    meta = Object.assign({
      desc: '',
      tag: [],
    }, meta);
    const flag = ctx.service.gallery.pushGallery({
      name: '测试相册',
      desc: '上海相册',
      tag: [ '上海' ],
      meta,
    });
    ctx.body = {
      code: 200,
      data: flag,
    };
  }
}

module.exports = GalleryController;
