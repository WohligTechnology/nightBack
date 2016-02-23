var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  title: String,
  video: String,
  order: Number,
  modificationTime: Date,
  status: Number
});

module.exports = mongoose.model('PhotoGalleryCategory', schema);
var models = {};

module.exports = _.assign(module.exports, models);
