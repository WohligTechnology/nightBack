var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  name: String,
  image: String,
  order: Number,
  link: String,
  type: String,
  modificationTime: Date,
  status: Number
});

module.exports = mongoose.model('HomeSlider', schema);
var models = {};

module.exports = _.assign(module.exports, models);
