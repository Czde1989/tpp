var express = require('express');
var router = express.Router();
const util = require('./util');

router.get('/hot', function (req, res, next) {
  util.sendDataFn(req, res, '_hot.json', true);
});
router.get('/cinema', function(req, res, next) {
  util.sendDataFn(req, res, '_cinema.json', true);
});
router.get('/info', function(req, res, next) {
  util.sendDataFn(req, res, '_info.json', false);
});
router.get('/evaluation', function (req, res, next) {
  util.sendDataFn(req, res, '_evaluation.json', false);
});
router.get('/swiper', function (req, res, next) {
  util.sendDataFn(req, res, 'swiper.json', false);
});
router.get('/city', function (req, res, next) {
  util.sendDataFn(req, res, 'city.json', false);
});
router.get('/cinema_detail', function (req, res, next) {
  util.sendDataFn(req, res, 'cinema_detail.json', false);
});
router.get('/coming', function (req, res, next) {
  let query = req.query,
    limit = query.limit,
    offset = query.offset;
  if (limit && offset) {
    let sendData = {
      errno: 0,
      total: 0,
      limit: limit,
      offset: offset,
      msg: 'ok',
      data: {}
    };
    util.readFile('coming.json').then(data => {
      let list = data.data.returnValue;
      let sendList = list.slice(offset * 1, offset * 1 + limit * 1);
      data.data.returnValue = sendList;
      sendData.data = data;
      sendData.total = list.length;
      res.send(sendData);
    }, msg => {
      sendData.errno = -1;
      sendData.msg = '暂时没有数据';
      res.send(sendData);
    })
  } else {
    util.sendDataFn(req, res, 'cinema_detail.json', false);
  }
});
router.get('/comingLimit', function(req, res, next) {
  console.log('go 2');
  let query = req.query,
    limit = + query.limit,
    offset = + query.offset,
    sendData = {
      errno: 0,
      total: 0,
      limit: limit,
      offset: offset,
      msg: 'ok',
      data: {}
    };
  util.readFile('coming.json').then(data => {
    let list = data.data.returnValue
    let sendList = list.slice(offset, offset + limit)
    data.data.returnValue = sendList
    sendData.data = data;
    sendData.total = list.length;
    res.send(sendData);
  }, msg => {
    sendData.errno = -1;
    sendData.msg = '暂时没有数据';
    res.send(sendData);
  })
});

module.exports = router;
