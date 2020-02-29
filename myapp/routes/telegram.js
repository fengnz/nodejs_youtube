var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');
const HttpProxyAgent = require('http-proxy-agent');
let fetch = require('node-fetch');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('telegram', { title: 'Express' });
});

router.get('/bbf14ea8-4ede-4806-9a76-0da780cfdb2d', function (req, res, next) {
  res.send('这个链接要保密, 请不要用HTTP访问这个链接, 更不要在网上任何地方发布这个链接');
});

const botToken = "682267360:AAHmjSil8oylavD2pENLLpcMU1svaD7mVeA";

function postTelegram(payload) {
  let fetchOption = {};
  fetchOption.method = "post";
  fetchOption.body = JSON.stringify(payload);
  fetchOption.headers = {};
  fetchOption.headers["Content-Type"] = 'application/json';

  // Proxy settings

  let ip = '127.0.0.1';
  let port = '1080';
  let proxyAgent = new HttpProxyAgent("http://" + ip + ":" + port);
  fetchOption.agent = proxyAgent;


  let url = "http://localhost:8888";
  url = "https://api.telegram.org/bot" + botToken + "/";

  return fetch(url, fetchOption).catch(e => {
    console.log(e);
  });
}

router.post('/bbf14ea8-4ede-4806-9a76-0da780cfdb2d', function (req, res, next) {

  console.log(req.body);

  let body = req.body;

  if (!body.message.text) {
    res.send("Ok");
    return;
  }

  let payload = {
    "method": "sendMessage",
    "chat_id": body.message.chat.id + "",
    "text": body.message.text,
  };


  postTelegram(payload).then(x => {
    console.log(x);
    if (x.status && x.status == 200) {
      res.send("Ok");
    }
  }).catch(e => {
    console.log(e);
    res.status(500);
  });
});

router.post('/',
  [
    check('name')
      .isLength({ min: 1 })
      .withMessage('请输入网址')
  ],
  function (req, res, next) {
    const errors = validationResult(req);
    // console.log(req.body);
    // console.log(errors);


    let userInput = req.body;
    userInput.email = encodeURIComponent(userInput.name);

    const setWebhookUrl = "https://api.telegram.org/bot" + botToken + "/setWebhook?url=" + userInput.name;

    let payload = {
      "method": "sendMessage",
      "chat_id": "-1001294676322",
      "text": setWebhookUrl,
    };

    const tasks = [];
    const task1 = postTelegram(payload).then(response => {
      if (response) {
        console.log(response.status);
        console.log("这段代码在200后面");


        return response;
      }
    }).then(x => {
      console.log("这段代码在200后面, 而且只能放在then外面");
      try {
        console.log(x.bbb.ccc);
      } catch (e) {
      }
      return x;
    }).catch(e => {
      console.log("发现如下错误====>" + e);
      console.log(e);
    });

    const task2 = postTelegram(payload).then(response => {
      console.log("发完一个又发一个");
    });


    tasks.push(task1);
    tasks.push(task2);

    console.log('做点别的什么事, 不需要在200后面');


    Promise.all(tasks).then(x => {
      console.log('等所有异步任务完成了才执行这段代码');
    });

    res.render('telegram', { title: 'Express', userInput: userInput, errors: errors.array(), validInput: errors.isEmpty() });
  });
module.exports = router;
