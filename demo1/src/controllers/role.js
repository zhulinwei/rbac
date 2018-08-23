const Service = require('../services');

class RoleController {
  async save(ctx, next) {
    const { name, permissions } = ctx.request.body;
    if (!name) throw new Error('无效的角色名称');
    if (!permissions || permissions.length < 1) throw new Error('无效的权限操列表');
    
    await Service.role.save({ name, permissions });
    ctx.status = 200;
    ctx.body = { ok: 1 };
  }

  async list(ctx, next) {
    let { selector, options } = ctx.request.body;
    selector = selector || {};
    options = options || {};
    ctx.body = await Service.role.list(selector, options);
  }

}

module.exports = new RoleController();
