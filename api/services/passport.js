var LocalStrategy = require("passport-local");
var FacebookStrategy = require("passport-facebook");
var TwitterStrategy = require("passport-twitter");
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
module.exports = require("passport");

module.exports.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  },
  function(email, password, done) {
    User.findOne({
      email: email,
      password: password
    }).exec(
      function(err, data) {
        if (err) {
          done(err, false);
        } else {
          if (_.isEmpty(data)) {
            done("Wrong Email or Password", false);
          } else {
            done(null, data);
          }
        }
      }
    );
  }
));


module.exports.use(new FacebookStrategy({
    clientID: "141304936259731",
    clientSecret: "322f66550b62b9492e7271615de6ae40",
    callbackURL: "/user/loginFacebook/",
    enableProof: false
  },
  function(accessToken, refreshToken, profile, done) {
    if (!_.isEmpty(profile)) {
      User.find({
        "oauthLogin.socialId": profile.id + ""
      }).exec(function(err, data) {
        if (err) {
          done(err, false);
        } else {
          usertemp = {
            "name": profile.displayName,
            "oauthLogin": [{
              "socialId": profile.id + "",
              "socialProvider": profile.provider
            }],
            "status": 1
          };

          if (data.length !== 0) {
            done(err, data);
          } else {
            var user = User(usertemp);
            user.save(function(err, data2) {
              done(err, data2);
            });
          }

        }
      });

    } else {
      done("There is an Error", false);
    }
  }
));


module.exports.use(new TwitterStrategy({
    consumerKey: "gZPPSIqZHL3mqlgq76bBc4Yqq",
    consumerSecret: "FGZTNSrJjztzlSsoX5TzvnWzVTFfpbw4D8veCFH8ME75Jup2CK",
    callbackURL: "/user/loginTwitterCallback/",
  },
  function(token, tokenSecret, profile, done) {

    if (!_.isEmpty(profile)) {

      User.find({
        "oauthLogin.socialId": profile.id + ""
      }).exec(function(err, data) {
        if (err) {
          done(err, false);
        } else {
          usertemp = {
            "name": profile.displayName,
            "oauthLogin": [{
              "socialId": profile.id + "",
              "socialProvider": profile.provider
            }],
            "status": 1
          };

          if (data.length !== 0) {
            done(err, data);
          } else {
            var user = User(usertemp);
            user.save(function(err, data2) {
              done(err, data2);
            });
          }

        }
      });

    } else {
      done("There is an Error", false);
    }
  }
));


module.exports.use(new GoogleStrategy({
    clientID: "529279279497-nfmukh8oafihcv3d7b321bjn3mgljtt6.apps.googleusercontent.com",
    clientSecret: "0PVXCteO1WhsnnCrI-X59aDQ",
    callbackURL: "/user/loging"
  },
  function(token, tokenSecret, profile, done) {
    if (!_.isEmpty(profile)) {
      User.find({
        "oauthLogin.socialId": profile.id + ""
      }).exec(function(err, data) {
        if (err) {
          done(err, false);
        } else {
          usertemp = {
            "name": profile.displayName,
            "oauthLogin": [{
              "socialId": profile.id + "",
              "socialProvider": profile.provider
            }],
            "status": 1
          };

          if (data.length !== 0) {
            done(err, data);
          } else {
            var user = User(usertemp);
            user.save(function(err, data2) {
              done(err, data2);
            });
          }

        }
      });

    } else {
      done("There is an Error", false);
    }
  }
));
