const Model = require('../models');

class Permission {
  async find(selector, options) {
    return await Model.permission.coll.find(selector, options).toArray();
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
