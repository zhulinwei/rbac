const _ = require('lodash');
const utils = require('../../utils');
const Service = require('../../services');

class RBAC {
  constructor() {
    this.actions = {
      READ: 'get',
      CREATE: 'post',
      UPDATE: 'put',
      REMOVE: 'delete'
    };
    this.roles = [];
  }

  async _getPermissions(uid) {
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

  // async getRole(name) {
  //   const role = _.find(this.roles, role => role.name === name);
  //   if (role) return role;
  //   else return await Service.role.findOne({ name });
  // }

  async getRoles(user) {
    if (this.roles.length > 0) return this.roles;
    else return this.roles = await Service.role.list();
  }

  // async getPromission(role) {}

  async getPromissions(role) {}

  async existsRole(name) {
    if (this.roles.length < 1) this.roles = await Service.role.list();
    const exists = _.find(this.roles, role => role.name === name);
    return Boolean(exists); 
  } 

  async check(ctx, next) {
    const source = ctx.url;
    const action = ctx.method;
    const uid = ctx.cookies.get('uid');
    const permissions = await _getPermissions(uid);
    const exists = _.find(permissions, permission => permission.action === actions && permission.source === source);
    if (!exists) throw new Error('您暂时没有权限操作，请联系管理员~');
    await next();
  } 
}

module.exports = new RBAC();
