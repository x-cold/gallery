'use strict';
const galleriesService = require('../services/gallery');

module.exports = app => {
  class GalleryController extends app.Controller {
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
  }
  return GalleryController;
};
