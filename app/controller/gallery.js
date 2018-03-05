'use strict';

const { Controller } = require('egg');
const galleriesService = require('../service/gallery');

class GalleryController extends Controller {
  * galleries() {
    var galleries = galleriesService.getGalleries();
    this.ctx.body = {
      code: 200,
      data: galleries
    };
  }

  * pushGallery() {
    var meta = this.req.body;
    meta = Object.assign({
      desc: '',
      tag: []
    }, meta);
    var flag = galleriesService.pushGallery({
      name: '测试相册',
      desc: '上海相册',
      tag: ['上海']
    });
  }
};

module.exports = GalleryController;
