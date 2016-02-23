var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  user: Schema.Types.ObjectId,
  notification: Schema.Types.ObjectId,
  receiveTime: Date,
  readTime: Date,
  modificationTime: Date
});

module.exports = mongoose.model('UserNotification', schema);
var models = {};

module.exports = _.assign(module.exports, models);
