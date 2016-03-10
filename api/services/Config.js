var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = new Schema({
  name: String,
  content: String,
  modificationTime: Date,
  status: Number
});
module.exports = mongoose.model('Config', schema);
var models = {
  globalCallback: function(err, data, res) {
    if (err) {
      res.json({
        error: err,
        value: data
      });
    } else {
      res.json({
        data: data,
        value: true
      });
    }
  },
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
