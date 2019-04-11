const Service = require('../services');

class AdminController {
  async save (ctx, next) {
    const { roles } = ctx.request.body;
    if (!roles || roles.length < 1) throw new Error('无效的角色权限');

    await Service.admin.save({ roles });
  }

  async list (ctx, next) {
    let { selector, options } = ctx.request.body;
    selector = selector || {};
    options = options || {};
    await Service.admin.list(selector, options);
  }
}

module.exports = new AdminController();
