'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async list() {
    const { ctx } = this;
    const galleries = ctx.service.gallery.getGalleries();
    await ctx.render('list.ejs', {
      galleries,
      title: '相册列表',
      avatar: 'https://avatars3.githubusercontent.com/u/6903313',
    });
  }

  async detail() {
    const { ctx } = this;
    const id = ctx.params.id;
    const album = ctx.service.gallery.getGalleryById(id);
    if (!album) {
      ctx.body = {
        code: 404,
      };
      return;
    }
    await ctx.render('detail.ejs', {
      photos: album.photos,
      desc: album.meta.desc,
      title: album.meta.name,
      name: album.meta.name,
      description: '',
      avatar: 'https://avatars3.githubusercontent.com/u/6903313',
    });
  }
}

module.exports = HomeController;

