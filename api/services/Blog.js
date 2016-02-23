var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  name: String,
  image: String,
  tags: {
    type: [String],
    index: true
  },
  image: {
    type: [{
      image: String,
      title: String,
      order: Number,
      status: Number,
      modificationTime: Number
    }],
    index: true
  },
  video: {
    type: [{
      video: String,
      title: String,
      order: Number,
      status: Number,
      modificationTime: Number
    }],
    index: true
  },
  content: String,
  modificationTime: Date,
  status: Number
});

module.exports = mongoose.model('Blog', schema);
var models = {};

module.exports = _.assign(module.exports, models);
