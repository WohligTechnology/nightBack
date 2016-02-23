
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  name: String,
  icon: String,
  type: String,
  iconType: String,
  order: Number,
  link: String,
  modificationTime: Date,
  status: Number
});

module.exports = mongoose.model('Navigation', schema);
var models = {};

module.exports = _.assign(module.exports, models);
