'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/api.test.js', () => {
  it('should GET /api/photostore', () => {
    return app.httpRequest()
      .get('/api/photostore?name=mythum')
      .expect(200)
      .expect(res => {
        assert(res.body.Code === 'Success');
      });
  });
});
