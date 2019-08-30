const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  // res.send('<h1 style="color:blue; border: solid 1px">这里是网页1!</h1>');
  res.render('page1', { title: 'Title 1' });
});

router.get('/1', (req, res) => {
  // res.send('这里是网页1.1!');
  res.render('page1_1', { title: 'page 1.1' });
});

router.get('/2', (req, res) => {
  res.send('这里是网页1.2!');
});

router.get('/3', (req, res) => {
  res.send('这里是网页1.3!');
});

module.exports = router;