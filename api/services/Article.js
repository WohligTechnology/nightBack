var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  name: String,
  content: String,
  tags: {
    type: [String],
    index: true
  },
  status: Number,
  views:Number,
  modificationTime: Date
});

module.exports = mongoose.model('Article', schema);
var models = {
};

module.exports = _.assign(module.exports, models);
