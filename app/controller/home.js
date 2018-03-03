'use strict';
const galleriesService = require('../service/gallery');

module.exports = app => {
  class HomeController extends app.Controller {
    * list() {
      var galleries = galleriesService.getGalleries();
      yield this.ctx.render('list.ejs', {
        galleries: galleries,
        title: '相册列表',
        avatar: 'https://avatars3.githubusercontent.com/u/6903313'
      });
    }

    * detail() {
      var id = this.ctx.params.id;
      var album = galleriesService.getGalleryById(id);
      if (!album) {
        yield this.ctx.body = {
          code: 404
        }
        return;
      }
      yield this.ctx.render('detail.ejs', {
        photos: album.photos,
        desc: album.meta.desc,
        title: album.meta.name,
        name: album.meta.name,
        description: '',
        avatar: 'https://avatars3.githubusercontent.com/u/6903313'
      });
    }
  }
  return HomeController;
};
