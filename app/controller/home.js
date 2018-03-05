'use strict';

const { Controller } = require('egg');
const galleriesService = require('../service/gallery');

class HomeController extends Controller {
  async list() {
    var galleries = galleriesService.getGalleries();
    await this.ctx.render('list.ejs', {
      galleries: galleries,
      title: '相册列表',
      avatar: 'https://avatars3.githubusercontent.com/u/6903313'
    });
  }

  async detail() {
    var id = this.ctx.params.id;
    var album = galleriesService.getGalleryById(id);
    if (!album) {
      this.ctx.body = {
        code: 404
      }
      return;
    }
    await this.ctx.render('detail.ejs', {
      photos: album.photos,
      desc: album.meta.desc,
      title: album.meta.name,
      name: album.meta.name,
      description: '',
      avatar: 'https://avatars3.githubusercontent.com/u/6903313'
    });
  }
}

module.exports = HomeController;

