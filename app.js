const express = require('express');
const routes = require('./routes/index');
const routes1 = require('./routes/page1');

const app = express();
app.use('/', routes);
app.use('/page1', routes1);

module.exports = app;