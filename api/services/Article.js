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
  views: Number,
  modificationTime: Date
});

module.exports = mongoose.model('Article', schema);
var models = {
  saveData: function(data, callback) {
    var project = this(data);
    if (data._id) {
        data.modificationTime= new Date();
      this.findOneAndUpdate({
        _id: data._id
      }, data, callback);
    } else {
      project.save(function(err, data) {
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
