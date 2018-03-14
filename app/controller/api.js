'use strict';

const {
  Controller
} = require('egg')
const path = require('path')
const fs = require('fs')
const os = require('os')
const sendToWormhole = require('stream-wormhole')
const awaitWriteStream = require('await-stream-ready').write
const md5File = require('md5-file')
const OSS = require('ali-oss')
class ApiController extends Controller {
  // test case: http://localhost:7001/api/photostore?name=mythum
  async getPhotoStore() {
    const {
      app,
      ctx
    } = this;
    const {
      aliyunPhoto
    } = app;
    try {
      const result = await aliyunPhoto.request('GetPhotoStore', {
        StoreName: ctx.query.name,
      });
      ctx.body = result;
    } catch (error) {
      throw error;
    }
  }

  * createPhoto() {
    const {
      app,
      ctx
    } = this
    const {
      aliyunPhoto,
      oss
    } = app
    let params = {
      Size: 0,
      Ext: '',
      Md5: '',
      StoreName: 'mythum'
    }
    const stream = yield ctx.getFileStream()
    const filename = path.basename(stream.filename)
    const target = path.join(os.tmpdir(), filename)
    const writeStream = fs.createWriteStream(target)
    try {
      yield awaitWriteStream(stream.pipe(writeStream))
      params.Md5 = md5File.sync(target)
      params.Size = fs.statSync(target).size
      params.Ext = path.extname(target).substr(1)
    } catch (err) {
      yield sendToWormhole(stream)
      throw err
    }
    try {
      const transcationRes = yield aliyunPhoto.request('CreateTransaction', {
        StoreName: params.StoreName,
        Md5: params.Md5,
        Ext: params.Ext,
        Size: params.Size,
        LibraryId: 'scau'
      })
      const {
        FileId,
        SessionId,
        ObjectKey,
        Bucket,
        AccessKeyId,
        AccessKeySecret,
        OssEndpoint,
        StsToken
      } = transcationRes.Transaction.Upload
      let store = new OSS({
        accessKeyId: AccessKeyId,
        accessKeySecret: AccessKeySecret,
        endpoint: 'https://oss-cn-shanghai.aliyuncs.com',
        stsToken: StsToken,
        bucket: 'mythum'
      })
      const result = yield store.put(filename, fs.createReadStream(target), {
        headers: {
          'x-oss-security-token': StsToken
        }
      })
      // const uploadRes = await aliyunPhoto.request('CreatePhoto', {
      //   FileId,
      //   PhotoTitle: filename,
      //   SessionId,
      //   StoreName: params.StoreName,
      //   UploadType: 'manual',
      //   LibraryId: filename
      // })
      ctx.body = {
        transcationRes
      }
    } catch (error) {
      throw error
    }
    fs.unlink(target)
  }
}

module.exports = ApiController;