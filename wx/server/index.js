const db = require('../db');
const theatersCrawler = require('./crawler/theatersCrawler.js');
const trailersCrawler = require('./crawler/trailersCrawler.js');
const saveTheaters = require('./save/saveTheaters.js');
const saveTrailers = require('./save/saveTrailers.js');
const uploadToQiniu = require('./qiniu/index.js');
const Theaters = require('../model/Theaters.js');
const Trailers = require('../model/Trailers.js');

(async () => {
  //连接数据库
  await db;
  //爬取数据
  // const data = await theatersCrawler();
  const data = await trailersCrawler();
  //将爬取的数据保存在数据库中
  // await saveTheaters(data);
  await saveTrailers(data);
  //上传图片到七牛中
  // await uploadToQiniu('posterKey', Theaters);
  await uploadToQiniu('coverKey', Trailers);
  await uploadToQiniu('posterKey', Trailers);
  await uploadToQiniu('videoKey', Trailers);
})()