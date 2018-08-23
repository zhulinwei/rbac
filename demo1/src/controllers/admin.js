const Service = require('../services');

class AdminController {
  async save(ctx, next) {
    const { name, action, source } = ctx.request.body;
    if (!name) throw new Error('无效的权限名称');
    if (!action) throw new Error('无效的权限操作行为');
    if (!source) throw new Error('无效的权限资源地址');
    
    await Service.admin.save({ name, action, source });
  }

  async list(ctx, next) {
    let { selector, options } = ctx.request.body;
    selector = selector || {};
    options = options || {};
    await Service.admin.list(selector, options);
  }

}

module.exports = new AdminController();
