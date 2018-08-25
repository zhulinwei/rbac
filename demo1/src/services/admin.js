const _ = require('lodash');
const utils = require('../utils');
const Model = require('../models');
const Enum = require('../common/enum');

class Admin {
  async findOne(selector) {
    return Model.admin.coll.findOne(selector);
  } 

  async save(body) {
    const roles = body.roles.map(role => utils.newObjectId(role));
    return await Model.admin.coll.insertOne({ roles }); 
  }
}

module.exports = new Admin();
