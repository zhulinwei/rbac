const moment = require('moment');
const mongodb = require('mongodb');
const createError = require('http-errors');

class Utils {
  newObjectId (id) {
    try {
      return new mongodb.ObjectId(id);
    } catch (err) {
      throw new createError.BadRequest('the id length must be 24');
    }
  }

  objectIdToDate (id) {
    if (!id || typeof id !== 'string' || id.length !== 24) throw createError.BadRequest('无效的ID');
    return this.newObjectId(id).getTimestamp();
  }

  dateToObjectId (date) {
    return this.newObjectId(`${moment(date).unix().toString(16)}0000000000000000`);
  }
}

module.exports = new Utils();
