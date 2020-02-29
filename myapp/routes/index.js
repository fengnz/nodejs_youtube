var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' + " - "+ process.env.GET_HOSTS_FROM});
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
  check('phone')
    .isLength({ min: 1 })
    .withMessage('请输入你的电话')
    .custom(value => {
      console.log(value);
      if (!/^\d{8}$/.test(value) || value.charAt(0) !== value.charAt(7)) {
        throw new Error('电话号码必须是8位数, 而且第一位数和最后一位数要一样');
      }
      return true;
    }),
    sanitizeBody('phone').toInt()
],
function(req, res, next) {
  const errors = validationResult(req);
  console.log(req.body);
  console.log(errors);
  res.render('index', { title: 'Express', userInput: req.body, errors: errors.array(), validInput: errors.isEmpty()});
});
module.exports = router;
