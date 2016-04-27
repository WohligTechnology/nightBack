var mongoose = require('mongoose');
var md5 = require('md5');
var Schema = mongoose.Schema;
var sendgrid = require('sendgrid')('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');

var schema = new Schema({
    name: String,
    email: String,
    password: String,
    accessLevel: String,
    dob: Date,
    profilePic: String,
    status: Number,
    phone: String,
    location: String,
    forgotpassword: String,
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
        if (data.password && data.password != "") {
            data.password = md5(data.password);
        }
        var user = this(data);
        this.count({
            "email": data.email
        }).exec(function(err, data2) {
            if (err) {
                callback(err, data);
            } else {
                if (data2 === 0) {
                    user.save(function(err, data3) {
                        data3.password = '';
                        callback(err, data3);
                    });
                } else {
                    callback("Email already Exists", false);
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
        this.find({}, {
            password: 0,
            forgotpassword: 0
        }).exec(callback);
    },
    getOne: function(data, callback) {
        this.findOne({
            "_id": data._id
        }).exec(callback);
    },
    //////////////////////////////MOBILE
    getOneMob: function(data, callback) {
        this.findOne({
            "_id": data._id
        }, {
            _id: 0,
            password: 0,
            forgotpassword: 0
        }).exec(callback);
    },
    changePasswordMob: function(data, callback) {
        data.password = md5(data.password);
        data.editpassword = md5(data.editpassword);
        this.findOneAndUpdate({
            _id: data._id,
            password: data.password
        }, {
            password: data.editpassword
        }, function(err, data2) {
            if (err) {
                callback(err, null);
            } else {
                if (_.isEmpty(data2)) {
                    callback(null, {});
                } else {
                    data2.password = "";
                    data2.forgotpassword = "";
                    callback(null, data2);
                }
            }
        });
    },
    saveMob: function(data, callback) {
        if (data.password && data.password != "") {
            data.password = md5(data.password);
        }
        var project = this(data);
        if (data._id) {
            this.findOneAndUpdate({
                _id: data._id
            }, data, function(err, data2) {
                if (err) {
                    callback(err, false);
                } else {
                    data2.password = '';
                    data2.forgotpassword = '';
                    callback(null, data2);
                }
            });
        } else {
            project.save(function(err, data2) {
                if (err) {
                    callback(err, false);
                } else {
                    data2.password = '';
                    data2.forgotpassword = '';
                    callback(null, data2);
                }
            });
        }
    },
    login: function(data, callback) {
        data.password = md5(data.password);
        User.findOne({
            email: data.email,
            password: data.password
        }, function(err, data2) {
            if (err) {
                console.log(err);
                callback(er, null);
            } else {
                if (_.isEmpty(data2)) {
                    User.findOne({
                        email: data.email,
                        forgotpassword: data.password
                    }, function(err, data4) {
                        if (err) {
                            console.log(err);
                            callback(err, null);
                        } else {
                            if (_.isEmpty(data4)) {
                                callback(null, {
                                    comment: "User Not Found"
                                });
                            } else {
                                User.findOneAndUpdate({
                                    _id: data4._id
                                }, {
                                    password: data.password,
                                    forgotpassword: ""
                                }, function(err, data5) {
                                    if (err) {
                                        console.log(err);
                                        callback(err, null);
                                    } else {
                                        data5.password = "";
                                        data5.forgotpassword = "";
                                        callback(null, data5);
                                    }
                                });
                            }
                        }
                    });
                } else {
                    User.findOneAndUpdate({
                        _id: data2._id
                    }, {
                        forgotpassword: ""
                    }, function(err, data3) {
                        if (err) {
                            console.log(err);
                            callback(err, null);
                        } else {
                            data3.password = "";
                            data3.forgotpassword = "";
                            callback(null, data3);
                        }
                    });
                }
            }
        });
    },
    forgotPassword: function(data, callback) {
        this.findOne({
            email: data.email
        }, {
            password: 0,
            forgotpassword: 0
        }, function(err, found) {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                if (found) {
                    console.log(found);
                    if (!found.oauthLogin.length > 0) {
                        var text = "";
                        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                        for (var i = 0; i < 8; i++) {
                            text += possible.charAt(Math.floor(Math.random() * possible.length));
                        }
                        var encrypttext = md5(text);
                        this.findOneAndUpdate({
                            _id: found._id
                        }, {
                            forgotpassword: encrypttext
                        }, function(err, data2) {
                            if (err) {
                                console.log(err);
                                callback(err, null);
                            } else {
                                sendgrid.send({
                                    to: found.email,
                                    from: "info@wohlig.com",
                                    subject: "One Time Password For Blazen",
                                    html: "<html><body><p>Dear " + found.name + ",</p><p>Your One Time Password for Blazen is " + text + "</p></body></html>"
                                }, function(err, json) {
                                    if (err) {
                                        callback(err, null);
                                    } else {
                                        console.log(json);
                                        callback(null, {
                                            comment: "Mail Sent"
                                        });
                                    }
                                });
                            }
                        });
                    } else {
                        callback(null, {
                            comment: "User logged in through social login"
                        });
                    }
                } else {
                    callback(null, {
                        comment: "User not found"
                    });
                }
            }
        });
    },
    searchData: function(data, callback) {
        var check = new RegExp(data.search, "i");
        this.find({
            $or: [{
                name: {
                    '$regex': check
                }
            }, {
                email: {
                    '$regex': check
                }
            }]
        }, {
            password: 0,
            forgotpassword: 0
        }, {
            limit: 10
        }, function(err, data2) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data2);
            }
        });
    }
};

module.exports = _.assign(module.exports, models);
