const app = require('./app');

const server = app.listen(3000, () => {
  console.log(`Express 运行在端口 ${server.address().port}`);
});