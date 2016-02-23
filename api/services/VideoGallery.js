var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  title: String,
  video: String,
  order: Number,
  modificationTime: Date,
  category: { type: Schema.Types.ObjectId, ref: 'VideoGalleryCategory' },
  status: Number
});

module.exports = mongoose.model('VideoGallery', schema);
var models = {};

module.exports = _.assign(module.exports, models);
