var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');

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
  res.render('url-encoder', { title: 'Express', userInput: req.body, errors: errors.array(), validInput: errors.isEmpty()});
});
module.exports = router;
