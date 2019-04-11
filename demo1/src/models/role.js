const { mongo } = require('../databases');

class Role {
  constructor () {
    this.coll = mongo.dbs.test.collection('role');
  }
}

module.exports = new Role();
