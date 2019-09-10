//引入qiniu模块
const qiniu = require('qiniu');

const accessKey = 'sKaPMInX8BZFKjKhprxw15xBVAvFp7aU0QNlTMMR';
const secretKey = 'V_IN1JcQbmLHvFiz0WZrJcvDNbF8KqkaFp58xrEG';
//定义鉴权对象
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
//定义配置对象
const config = new qiniu.conf.Config();
//存储区域   z2  -- 华南
config.zone = qiniu.zone.Zone_z2;
//bucketManager对象上就有所有的方法
const bucketManager = new qiniu.rs.BucketManager(mac, config);
// 存储空间的名称
const bucket = 'atguigu-movies';

module.exports = (resUrl, key) => {
  /*
    resUrl  网络资源的地址
    bucket  存储空间的名称 students
    key     重命名网络资源的名称
   */
  return new Promise((resolve, reject) => {
    bucketManager.fetch(resUrl, bucket, key, function (err, respBody, respInfo) {
      if (err) {
        reject('上传七牛方法出了问题' + err);
      } else {
        if (respInfo.statusCode == 200) {
          console.log('文件上传成功');
          resolve();
        }
      }
    });
  })
}