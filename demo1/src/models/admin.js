const { mongo } = require('../databases');

class Admin {
  constructor() {
    this.coll = mongo.dbs.test.collection("admin");
  }
}

module.exports = new Admin();
