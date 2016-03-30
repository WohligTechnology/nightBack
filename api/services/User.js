var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  name: String,
  email: String,
  password: String,
  accessLevel: String,
  dob: Date,
  profilePic: String,
  status: Number,
  notification: {
    type: [{
      device: String,
      os: String,
      notificationId: String,
      modificationTime: Date
    }],
    index: true
  },
  oauthLogin: {
    type: [{
      socialProvider: String,
      socialId: String,
      modificationTime: Date
    }],
    index: true
  },
  config: {
    type: [{
      name: String,
      content: String,
      status: Number,
      modificationTime: Date
    }],
    index: true
  },
  modificationTime: Date
});


module.exports = mongoose.model('User', schema);
var models = {
  register: function(data, callback) {
    this.count({
      "email": data.email
    }).exec(function(err, data2) {
      if (err) {
        callback(err, data);
      } else {
        var user = this(data);
        if (data2 === 0) {
          user.save(function(err, data3) {
            callback(err, data3);
          });
        } else {
          callback("Email already Existing", false);
        }

      }
    });
  },
  saveData: function(data, callback) {
    var project = this(data);
    if (data._id) {
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
