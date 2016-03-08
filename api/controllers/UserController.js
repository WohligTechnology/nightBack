/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  fail: function(req, res) {
    res.json({
      value: false
    });
  },
  success: function(req, res) {
    res.json({
      value: true
    });
  },
  register: function(req, res) {
    req.body.status = 1;
    var callback = function(err, data) {
      if (err || _.isEmpty(data)) {
        res.json({
          error: err,
          value: false
        });
      } else {
        res.json({
          data: data,
          value: true
        });
      }
    };
    User.register(req.body, callback);
  },
  login: function(req, res) {
    var callback = function(err, data) {
      if (err || _.isEmpty(data)) {
        res.json({
          error: err,
          value: false
        });
      } else {
        req.session.user = data;
        req.session.save();
        res.json({
          data: data,
          value: true
        });
      }
    };
    Passport.authenticate('local', {
      failureRedirect: '/login'
    }, callback)(req, res);
  },
  logout: function(req, res) {
    req.session.destroy(function(err) {
      if (err) {
        res.json({
          value: false,
          error: err
        });
      } else {
        res.json({
          value: true
        });
      }
    });
  },
  loginFacebook: function(req, res) {
    var callback = function(err, data) {
      if (err || _.isEmpty(data)) {
        res.json({
          error: err,
          value: false
        });
      } else {
        req.session.user = data;
        req.session.save(function(err) {
          if (err) {
            res.json(err);
          } else {
            res.json({
              data: data,
              value: true
            });
          }
        });
      }
    };
    Passport.authenticate('facebook', {
      scope: ['public_profile', 'user_friends', 'email']
    }, callback)(req, res);
  },
  profile: function(req, res) {
    var user = req.session.user;
    if (user) {
      res.json(user);
    } else {
      res.json({
        value: false
      });
    }
  },
  loginTwitter: function(req, res) {
    var callback = function(err, data) {
      if (err || _.isEmpty(data)) {
        res.json({
          error: err,
          value: false
        });
      } else {
        req.session.user = data;
        // console.log(req.session);
        req.session.save(function(err) {
          if (err) {
            res.json(err);
          } else {
            res.json({
              data: data,
              value: true
            });
          }
        });
      }
    };
    Passport.authenticate('twitter', {}, callback)(req, res);
  },

  loginTwitterCallback: function(req, res) {
    var callback = function(err, data) {
      if (err || _.isEmpty(data)) {
        res.json({
          error: err,
          value: false
        });
      } else {
        req.session.user = data;
        // console.log(req.session);
        req.session.save(function(err) {
          if (err) {
            res.json(err);
          } else {
            res.json({
              data: data,
              value: true
            });
          }
        });
      }
    };
    Passport.authenticate('twitter', {}, callback)(req, res);
  },
  loginGoogle: function(req, res) {
    Passport.authenticate('google', {
      scope: ['https://www.googleapis.com/auth/plus.login']
    })(req, res);
  },
  loging: function(req, res) {
    var callback = function(err, data) {
      if (err || _.isEmpty(data)) {
        res.json({
          error: err,
          value: false
        });
      } else {
        req.session.user = data;
        // console.log(req.session);
        req.session.save(function(err) {
          if (err) {
            res.json(err);
          } else {
            res.json({
              data: data,
              value: true
            });
          }
        });
      }
    };
    Passport.authenticate('google', {
      failureRedirect: '/login'
    }, callback)(req, res);
  },
  test: function(req, res) {

    sails.log.error('Test is been Called');
    res.json({
      value: "done"
    });
  }

};
