const express = require('express');
const routes = require('./routes/index');
const routes1 = require('./routes/page1');
const path = require('path');
const exphbs  = require('express-handlebars');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
// app.set('view engine', 'pug');
app.engine('hbs', exphbs({
    layoutsDir: 'views',
    defaultLayout: 'layout',
    extname: '.hbs'
  }));
app.set('view engine', 'hbs');
app.use('/', routes1);
app.use('/page1', routes1);

module.exports = app;