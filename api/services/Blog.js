var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  name: String,
  image: String,
  tags: {
    type: [String],
    index: true
  },
  images: {
    type: [{
      image: String,
      title: String,
      order: Number,
      status: Number,
      modificationTime: Number
    }],
    index: true
  },
  videos: {
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
