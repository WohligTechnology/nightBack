var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = new Schema({
  name: String,
  content: String,
  modificationTime: Date,
  status: Number
});
module.exports = mongoose.model('Config', schema);
var models = {};
module.exports = _.assign(module.exports, models);
