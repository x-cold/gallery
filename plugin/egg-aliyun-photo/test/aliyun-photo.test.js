'use strict';

const mock = require('egg-mock');

describe('test/aliyun-photo.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/aliyun-photo-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, aliyunPhoto')
      .expect(200);
  });
});
