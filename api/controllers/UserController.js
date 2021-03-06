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
        if (req.body) {
            User.register(req.body, callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Call"
            });
        }
    },
    login: function(req, res) {
        var callback = function(err, data) {
            if (err || _.isEmpty(data)) {
                res.json({
                    error: err,
                    value: false
                });
            } else {
                if (data._id) {
                    req.session.passport = {
                        user: data
                    };
                    req.session.save();
                    res.json({
                        data: "Login Successful",
                        value: true
                    });
                } else {
                    req.session.passport = {};
                    res.json({
                        data: {},
                        value: false
                    });
                }
            }
        };
        if (req.body) {
            if (req.body.email && req.body.email != "" && req.body.password && req.body.password != "") {
                User.login(req.body, callback);
            } else {
                res.json({
                    data: "Please provide params",
                    value: true
                });
            }
        } else {
            res.json({
                data: "Invalid Call",
                value: true
            });
        }
    },
    profile: function(req, res) {
        if (req.session.passport) {
            var user = req.session.passport.user;
            if (user) {
                res.json(user);
            } else {
                res.json({});
            }
        } else {
            res.json({});
        }
    },
    logout: function(req, res) {
        req.session.destroy(function(err) {
            if (err) {
                res.json({
                    value: false
                });
            } else {
                setTimeout(function() {
                    res.json({
                        value: true
                    });
                }, 3000);
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
                req.session.passport = { user: data };
                req.session.save(function(err) {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json({
                            data: "Login Successful",
                            value: true
                        });
                    }
                });
            }
        };
        passport.authenticate('facebook', {
            scope: ['public_profile', 'user_friends', 'email']
        }, callback)(req, res);
    },
    loginTwitter: function(req, res) {
        var callback = function(err, data) {
            if (err || _.isEmpty(data)) {
                res.json({
                    error: err,
                    value: false
                });
            } else {
                req.session.passport = { user: data };
                // console.log(req.session);
                req.session.save(function(err) {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json({
                            data: "Login Successful",
                            value: true
                        });
                    }
                });
            }
        };
        passport.authenticate('twitter', {}, callback)(req, res);
    },
    loginInsta: function(req, res) {
        var callback = function(err, data) {
            if (err || _.isEmpty(data)) {
                res.json({
                    error: err,
                    value: false
                });
            } else {
                req.session.passport = { user: data };
                // console.log(req.session);
                req.session.save(function(err) {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json({
                            data: "Login Successful",
                            value: true
                        });
                    }
                });
            }
        };
        passport.authenticate('instagram', {}, callback)(req, res);
    },
    loginGoogle: function(req, res) {
        passport.authenticate('google', {
            scope: ['https://www.googleapis.com/auth/plus.login']
        })(req, res);
    },
    loginGoogleCallback: function(req, res) {
        var callback = function(err, data) {
            if (err || _.isEmpty(data)) {
                res.json({
                    error: err,
                    value: false
                });
            } else {
                req.session.passport = { user: data };
                // console.log(req.session);
                req.session.save(function(err) {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json({
                            data: "Login Successful",
                            value: true
                        });
                    }
                });
            }
        };
        passport.authenticate('google', {
            failureRedirect: '/login'
        }, callback)(req, res);
    },
    getAll: function(req, res) {
        var callback = function(err, data) {
            if (err) {
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
        if (req.body) {
            User.getAll(req.body, callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Call"
            });
        }
    },
    getOne: function(req, res) {
        var callback = function(err, data) {
            if (err) {
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
        if (req.body) {
            if (req.body._id && req.body._id != "") {
                User.getOne(req.body, callback);
            } else {
                res.json({
                    value: false,
                    data: "Invalid Id"
                });
            }
        } else {
            res.json({
                value: false,
                data: "Invalid Call"
            });
        }
    },
    notificationSetting: function(data, callback) {
        var callback = function(err, data) {
            if (err || _.isEmpty(data)) {
                res.json({
                    error: err,
                    value: false
                });
            } else {
                req.session.passport = { user: data };

                res.json({
                    data: data,
                    value: true
                });
            }
        };
        if (req.body) {
            if (req.body._id && req.body._id == "0") {
                if (req.session.passport) {
                    req.body._id = req.session.passport.user._id;
                    callSave();
                } else {
                    res.json({
                        value: false,
                        data: "User not logged-in"
                    });
                }
            } else {
                callSave();
            }

            function callSave() {
                User.notificationSetting(req.body, callback);
            }
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },
    //////////////////////////////MOBILE
    saveMob: function(req, res) {
        var callback = function(err, data) {
            if (err || _.isEmpty(data)) {
                res.json({
                    error: err,
                    value: false
                });
            } else {
                req.session.passport = { user: data };

                res.json({
                    data: data,
                    value: true
                });
            }
        };
        if (req.body) {
            if (req.body._id && req.body._id == "0") {
                if (req.session.passport) {
                    req.body._id = req.session.passport.user._id;
                    callSave();
                } else {
                    res.json({
                        value: false,
                        data: "User not logged-in"
                    });
                }
            } else {
                callSave();
            }

            function callSave() {
                User.saveMob(req.body, callback);
            }
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },
    getOneMob: function(req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        if (req.body) {
            if (req.session.passport) {
                req.body._id = req.session.passport.user._id;
                User.getOneMob(req.body, callback);
            } else {
                res.json({
                    value: false,
                    data: "User not loggd-in"
                });
            }
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },
    changePasswordMob: function(req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        if (req.body) {
            if (req.session.passport) {
                req.body._id = req.session.passport.user._id;
                if (req.body.password && req.body.password != "" && req.body.editpassword && req.body.editpassword != "") {
                    User.changePasswordMob(req.body, callback);
                } else {
                    res.json({
                        value: false,
                        data: "Invalid Params"
                    });
                }
            } else {
                res.json({
                    value: false,
                    data: "User not loggd-in"
                });
            }
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },
    forgotPassword: function(req, res) {
        if (req.body) {
            if (req.body.email && req.body.email != "") {
                User.forgotPassword(req.body, res.callback);
            } else {
                res.json({
                    value: false,
                    data: "Please provide email-id"
                });
            }
        } else {
            res.json({
                value: false,
                data: "Invalid Call"
            });
        }
    },
    searchData: function(req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        if (req.body) {
            User.searchData(req.body, callback);
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },

    getLatest: function(req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        if (req.body) {
            User.getLatest(req.body, callback);
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },
    getCategory: function(req, res) {
        var callback = function(err, data) {
            if (err) {
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
        if (req.body) {
            User.getCategory(req.body, callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Call"
            });
        }
    },
    ///////////////////////////////
    test: function(req, res) {
        sails.log.error('Test is been Called');
        res.json({
            value: "done"
        });
    }
};
