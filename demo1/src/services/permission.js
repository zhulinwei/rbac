const Model = require('../models');

class Permission {
  async findOne(selector, options) {
    return await Model.permission.findOne(selector, options);
  }
  
  async save(body) {
    return await Model.permission.coll.insertOne(body);
  }

  async list(selector, options) {
    selector = selector || {};
    options = options || {};
    return await Model.permission.coll.find(selector, options).toArray();
  }
}

module.exports = new Permission();
