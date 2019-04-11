const Router = require('koa-router');
const ctrl = require('../controllers');

class Routers {
  constructor () {
    const router = new Router();

    // 权限管理
    router.get('/permissions', ctrl.permission.list);
    router.post('/permissions', ctrl.permission.save);

    // 角色管理
    router.get('/roles', ctrl.role.list);
    router.post('/roles', ctrl.role.save);

    // 用户管理
    router.get('/admin', ctrl.admin.list);
    router.post('/admin', ctrl.admin.save);

    router.get('/test', ctrl.rbac.check, (ctx, next) => {
      ctx.body = '通过检查，操作成功';
    });

    return router;
  }
}

module.exports = new Routers();
