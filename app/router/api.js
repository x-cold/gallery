'use strict';

module.exports = app => {
  app.get('/api/photostore', 'api.getPhotoStore');
  app.post('/api/photos', 'api.createPhoto')
};
