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
  }

};

module.exports = _.assign(module.exports, models);
