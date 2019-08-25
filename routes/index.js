const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('这是我的网站!');
});

module.exports = router;