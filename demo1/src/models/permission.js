const { mongo } = require('../databases');

class Permission {
  constructor() {
    this.coll = mongo.dbs.test.collection("permission");
  }
}

module.exports = new Permission();
