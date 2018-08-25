const _ = require('lodash');
const utils = require('../../utils');
const Service = require('../../services');

console.log(Service.admin.findOne)
class RBAC {
  static async __getPermissions(uid) {
    if (!uid) throw new Error('请先登录~');  
    const user = await Service.admin.findOne({ _id: utils.newObjectId(uid) })
    if (!user) throw new Error('无效的管理员~');  

    const roleIds = user.roles;
    const roles = await Promise.all(roleIds.map(roleId => {
      let role = Service.role.findOne({ _id: utils.newObjectId(roleId) });
      return role;
    }));
    if (!roles || roles.length < 1) throw new Error('您暂时没有权限操作，请联系管理员~');

    const permissionIds = [].concat.apply([], roles.map(role => role.permissions));
    const permissions = await Service.permission.find({
      _id: {
        $in: permissionIds.map(permissionId => utils.newObjectId(permissionId))
      }
    });
    return permissions || [];
  }

  async check(ctx, next) {
    const source = ctx.url;
    const uid = ctx.cookies.get('uid');
    const action = ctx.method.toLowerCase();
    const permissions = await RBAC.__getPermissions(uid);
    const exists = _.find(permissions, permission => permission.action === action && permission.source === source);
    if (!exists) throw new Error('您暂时没有权限操作，请联系管理员~');
    await next();
  } 
}

module.exports = new RBAC();
