var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  notification: {
    type: Schema.Types.ObjectId,
    ref: 'Notification'
  },
  receiveTime: Date,
  readTime: Date,
  modificationTime: Date
});

module.exports = mongoose.model('UserNotification', schema);
var models = {
  saveData: function(data, callback) {
    var project = this(data);
    if (data._id) {
      this.findOneAndUpdate({
        _id: data._id
      }, data, callback);
    } else {
      this.save(function(err, data) {
        if (err) {
          callback(err, false);
        } else {
          callback(null, data);
        }
      });
    }
  },
  deleteData: function(data, callback) {
    this.findOneAndRemove({
      _id: data._id
    }, function(err, data) {

      if (err) {
        callback(err, false);
      } else {
        callback(null, data);
      }
    });
  },
  getAll: function(data, callback) {
    this.find().exec(callback);
  },
  getOne: function(data, callback) {
    this.findOne({
      "_id": data._id
    }).exec(callback);
  }
};

module.exports = _.assign(module.exports, models);
