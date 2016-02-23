var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  user: Schema.Types.ObjectId
});

module.exports = mongoose.model('UserNotification', schema);
var models = {};

module.exports = _.assign(module.exports, models);
