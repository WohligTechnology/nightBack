var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  name: String,
  image: String,
  tags: {
    type: [String],
    index: true
  },
  content: String,
  video: String,
  modificationTime: Date,
  status: Number
});

module.exports = mongoose.model('Blog', schema);
var models = {};

module.exports = _.assign(module.exports, models);
