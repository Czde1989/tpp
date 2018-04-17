/*
* 工具函数
* */
const fs = require('fs');

const readFile = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile("./database/" + file, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        reject("read file data error!---" + err);
      } else {
        data = JSON.parse(data);
        resolve(data);
      }
    });
  })
};
const writeFile = (file, data) => {
  return new Promise((resolve, reject) => {
    data = JSON.stringify(data);
    fs.writeFile('./database/' + file, data, (err) => {
      if (err) {
        reject("fail ----" + err);
      } else {
        resolve("write success!");
      }
    })
  });
};

const sendDataFn = (req, res, filename, needcity) => {
  let query = req.query,
      name = query.name || '',
      city = query.city,
      readFileName = '',
      sendData = {
        errno: 0,
        city: city,
        msg: 'ok',
        data: {}
      };
  if (needcity) {
    readFileName = city + filename;
  } else {
    readFileName = filename;
  }
  readFile(name + readFileName).then((data) => {
    sendData.data = data;
    res.send(sendData);
  }, (msg) => {
    sendData.errno = -1;
    sendData.msg = '暂时没有数据';
    res.send(sendData);
  })
};

module.exports = {
  writeFile,
  readFile,
  sendDataFn
};
