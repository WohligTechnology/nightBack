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
        var reg = ["APA91bGkCOGCvZUMvlRwVN9F5TWuip1eqBQ5gLP-5fA5gDnM0m2tH6mtocL40BH-phKl8c950NBrdXIHSSOkA_Oc_3DLgVIM1Yaj5T6Mv58gf3_6PbV5tKKz_7vIAhpWRXPe6JHUV6_Z"];
        var sender = new gcm.Sender('AIzaSyDhPfaMrNrxf3FX4s1WdCP3Jvwccf3uVn0');
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
    }
};
