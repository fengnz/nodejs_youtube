var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', 
[
  check('name')
    .isLength({ min: 1 })
    .withMessage('请输入姓名'),
  check('gender')
    .isLength({ min: 1 })
    .withMessage('请输入性别')
    .equals('男')
    .withMessage('你只能指择男性'),
  check('email')
    .isLength({ min: 1 })
    .withMessage('请输入你的邮箱')
    .isEmail()
    .withMessage('您输入的不是邮箱'),
],
function(req, res, next) {
  const errors = validationResult(req);
  console.log(req.body);
  console.log(errors);
  res.render('index', { title: 'Express', userInput: req.body, errors: errors.array(), validInput: errors.isEmpty()});
});
module.exports = router;
