const Model = require('../models');

class Permission {
  async find (selector, options) {
    const result = await Model.permission.coll.find(selector, options).toArray();
    return result;
  }

  async save (body) {
    const result = await Model.permission.coll.insertOne(body);
    return result;
  }

  async list (selector, options) {
    selector = selector || {};
    options = options || {};
    const result = await Model.permission.coll.find(selector, options).toArray();
    return result;
  }
}

module.exports = new Permission();
