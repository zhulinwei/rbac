const _ = require('lodash');
const Enum = require('../common/enum');

class Admin {
  constructor() {
    this.roleTypes = {
      USER: Enum.RoleTypes.USER,
      GUEST: Enum.RoleTypes.GUEST,
      ADMIN: Enum.RoleTypes.ADMIN,
      SUPER_ADMIN: Enum.RoleTypes.SUPER_ADMIN
    }; 
  }

 
  async setRole(uid, role) {
    const exists = _.find(Object.keys(this.roleTypes), roleType => this.roleTypes[roleType] === role);
    if (!exists) throw new Error('无效的角色类型');

  }
}

module.exports = new Admin();
