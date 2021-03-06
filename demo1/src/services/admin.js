const utils = require('../utils');
const Model = require('../models');

class Admin {
  async findOne (selector) {
    return Model.admin.coll.findOne(selector);
  }

  async save (body) {
    const roles = body.roles.map(role => utils.newObjectId(role));
    const result = await Model.admin.coll.insertOne({ roles });
    return result;
  }
}

module.exports = new Admin();
