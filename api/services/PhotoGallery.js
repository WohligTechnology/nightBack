var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  title: String,
  image: String,
  order: Number,
  modificationTime: Date,
  category: { type: Schema.Types.ObjectId, ref: 'PhotoGalleryCategory' },
  status: Number
});

module.exports = mongoose.model('PhotoGallery', schema);
var models = {};

module.exports = _.assign(module.exports, models);
