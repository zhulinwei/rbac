const utils = require('../utils');
const Model = require('../models');

class Role {
  // constructor() {
  //   this.roleTypes = {
  //     USER: Enum.RoleTypes.USER,
  //     GUEST: Enum.RoleTypes.GUEST,
  //     ADMIN: Enum.RoleTypes.ADMIN,
  //     SUPER_ADMIN: Enum.RoleTypes.SUPER_ADMIN
  //   };
  // }

  // async findOne(selector, options) {
  //   return await Model.role.findOne(selector, options);
  // }

  async save (body) {
    const name = body.name;
    const permissions = body.permissions.map(permission => utils.newObjectId(permission));
    const result = await Model.role.coll.insertOne({ name, permissions });
    return result;
  }

  async findOne (selector) {
    const result = await Model.role.coll.findOne(selector);
    return result;
  }

  async list (selector, options) {
    selector = selector || {};
    options = options || {};
    const result = await Model.role.coll.find(selector, options).toArray();
    return result;
  }

  // 用于在入口判断用户是否有资格操作资源
  // async hasRole(role) {
  //   const count = await Model.role.count({ name: role });
  //   return count > 0;
  // }
}

module.exports = new Role();
