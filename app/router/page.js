'use strict';

module.exports = app => {
  app.get('/', 'home.list');
  app.get('/detail/:id', 'home.detail');
  app.get('/upload', 'home.upload')
};
