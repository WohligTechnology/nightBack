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
      timestamp: Date,
      os: String,
      notificationId: String
    }],
    index: true
  },
  oauthLogin: {
    type: [{
      socialProvider: String,
      socialId: String
    }],
    index: true
  }
});


module.exports = mongoose.model('User', schema);
var models = {
  register: function(data, callback) {
    this.count({
      "email": data.email
    }).exec(function(err, data2) {
      if (err) {
        callback(err,data);
      } else {
        var user = this(data);
        if(data2 === 0) {
          user.save(function(err,data3) {
            callback(err,data3);
          });
        }
        else {
          callback("Email already Existing", false);
        }

      }
    });
  }

};

module.exports = _.assign(module.exports, models);
