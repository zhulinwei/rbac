
const Koa = require('koa');
const PORT = process.env.PORT;
const { mongo } = require('./databases');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

async function start () {
  await mongo.init();
  // 注意：require('./router')必须要在mongo.init()之后，否则model中无法获取到db
  const router = require('./routers');
  app.use(bodyParser());
  app.use(router.routes());
  app.use(router.allowedMethods());
  app.listen(PORT);
}

start()
  .then(() => {
    console.log('mongodb_demo2 running at ' + 'http://127.0.0.1:' + PORT);
  })
  .catch(err => {
    console.log(err);
  });
