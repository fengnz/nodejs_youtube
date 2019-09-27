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
    .equals('男')
    .withMessage('你只能指择男性'),
],
function(req, res, next) {
  const errors = validationResult(req);
  console.log(req.body);
  console.log(errors);
  res.render('index', { title: 'Express', userInput: req.body });
});
module.exports = router;
