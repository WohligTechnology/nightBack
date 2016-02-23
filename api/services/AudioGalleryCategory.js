var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  name: String,
  image: String,
  order: Number,
  modificationTime: Date,
  status: Number
});

module.exports = mongoose.model('AudioGalleryCategory', schema);
var models = {};

module.exports = _.assign(module.exports, models);
