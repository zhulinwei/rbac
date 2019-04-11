const Service = require('../services');

class PermissionController {
  async save (ctx, next) {
    console.log(ctx.request.body);
    const { name, action, source } = ctx.request.body;
    if (!name) throw new Error('无效的权限名称');
    if (!action) throw new Error('无效的权限操作行为');
    if (!source) throw new Error('无效的权限资源地址');

    await Service.permission.save({ name, action, source });
    ctx.status = 200;
    ctx.body = { ok: 1 };
  }

  async list (ctx, next) {
    let { selector, options } = ctx.request.body;
    selector = selector || {};
    options = options || {};
    ctx.body = await Service.permission.list(selector, options);
  }
}

module.exports = new PermissionController();
