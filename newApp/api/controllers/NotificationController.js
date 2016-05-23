var gcm = require('node-gcm');
var apns = require("apns"),
    options, connection, notification;
module.exports = {
    save: function(req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        if (req.body) {
            Notification.saveData(req.body, callback);
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },
    delete: function(req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        if (req.body) {
            if (req.body._id && req.body._id != "") {
                Notification.deleteData(req.body, callback);
            } else {
                res.json({
                    value: false,
                    data: "Invalid Id"
                });
            }
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },
    getOne: function(req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        if (req.body) {
            if (req.body._id && req.body._id != "") {
                Notification.getOne(req.body, callback);
            } else {
                res.json({
                    value: false,
                    data: "Invalid Id"
                });
            }
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },
    getAll: function(req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        if (req.body) {
            Notification.getAll(req.body, callback);
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },
    sendNoti: function(req, res) {
        var message = new gcm.Message();
        var title = "Blazen Notification";
        var body = "Notification";
        message.addNotification('title', title);
        message.addNotification('body', body);
        var reg = ["exWnILOyZtc:APA91bGtjPhPzmHiHjJU8-ctNPkZlWTM3WxrBd4fuWBiphFz7z4RPwi_G-_I5ytGOncfN-_ajPq86E87OfnoPM18UqP1QtaeyIgfhxnjCu2eusB0wkhpeT3cVJaXsOEq3CkuOagaYfwd"];
        var sender = new gcm.Sender('AIzaSyCJ54QPYUUE7z8icWKKHFvG_hIrrisK0DM');
        sender.send(message, {
            registrationTokens: reg
        }, function(err, response) {
            if (err) {
                res.json({
                    value: false,
                    comment: err
                });
            } else {
                res.json({
                    value: true,
                    comment: response
                });
            }
        });
    },
    //////////////////////////////////MOBILE
    getAllMob: function(req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        if (req.body) {
            if (req.body.pagenumber && req.body.pagesize) {
                if (req.session.passport) {
                    req.body.user = req.session.passport.user._id;
                    callGet();
                } else {
                    callGet();
                }
            } else {
                res.json({
                    value: false,
                    data: "Please provide params"
                });
            }

            function callGet() {
                Notification.getAllMob(req.body, callback);
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
            if (req.body._id && req.body._id != "" && req.body.pagenumber && req.body.pagesize) {
                Notification.getOneMob(req.body, callback);
            } else {
                res.json({
                    value: false,
                    data: "Invalid Params"
                });
            }
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },
    searchData: function(req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        if (req.body) {
            Notification.searchData(req.body, callback);
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    }
};
