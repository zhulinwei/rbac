const utils = require('../utils');
const Model = require('../models');
const Enum = require('../common/enum');

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

  async save(body) {
    const name = body.name;
    const permissions = body.permissions.map(permission => utils.newObjectId(permission));
    return await Model.role.coll.insertOne({ name, permissions });
  }

  async findOne(selector) {
    return await Model.role.coll.findOne(selector); 
  }

  async list(selector, options) {
    selector = selector || {};
    options = options || {};
    return await Model.role.coll.find(selector, options).toArray();
  } 

  // 用于在入口判断用户是否有资格操作资源
  // async hasRole(role) {
  //   const count = await Model.role.count({ name: role });
  //   return count > 0;
  // }
}

module.exports = new Role();
