var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');
let fetch = require('node-fetch');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('url-encoder', { title: 'Express' });
});

router.post('/', 
[
  check('name')
    .isLength({ min: 1 })
    .withMessage('请输入网址')
],
function(req, res, next) {
  const errors = validationResult(req);
  console.log(req.body);
  console.log(errors);


  let userInput = req.body;
  userInput.email = encodeURIComponent(userInput.name);

  let fetchOption = {};

  fetchOption.method = "post";
  fetchOption.body = userInput.name;
  fetchOption.headers = {};
  fetchOption.headers["Content-Type"] = 'application/json';

  let url = "http://localhost:8888"

  fetch(url, fetchOption);

  res.render('url-encoder', { title: 'Express', userInput: userInput, errors: errors.array(), validInput: errors.isEmpty()});
});
module.exports = router;
