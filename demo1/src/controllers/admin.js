const Service = require('../services');

class AdminController {
  async save (ctx, next) {
    const { roles } = ctx.request.body;
    if (!roles || roles.length < 1) throw new Error('无效的角色权限');

    await Service.admin.save({ roles });
  }

  async list (ctx, next) {
    const { selector = {}, options = {} } = ctx.request.body;
    await Service.admin.list(selector, options);
  }
}

module.exports = new AdminController();
