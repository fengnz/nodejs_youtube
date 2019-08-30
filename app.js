const express = require('express');
const routes = require('./routes/index');
const routes1 = require('./routes/page1');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use('/', routes);
app.use('/page1', routes1);

module.exports = app;