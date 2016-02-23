var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  content: String,
  link: String,
  type: Number,
  json: Schema.Types.Mixed,
  modificationTime: Date,
  sendingTime: Date,
  status: Number
});

module.exports = mongoose.model('Notification', schema);
var models = {};

module.exports = _.assign(module.exports, models);
