const Router = require('koa-router');
const ctrl = require('../controllers');

class Routers {
  constructor() {
    const router = new Router;

    // router.get('/', ctrl.rbac.chek)
    
    router.get('/permissions', ctrl.permission.list);
    router.post('/permissions', ctrl.permission.save);

    router.get('/roles', ctrl.role.list);
    router.post('/roles', ctrl.role.save);


    return router; 
  }
}

module.exports = new Routers();
