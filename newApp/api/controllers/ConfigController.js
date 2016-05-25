var request = require("request");
module.exports = {
    save: function(req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        if (req.body) {
            Config.saveData(req.body, callback);
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
                Config.deleteData(req.body, callback);
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
                Config.getOne(req.body, callback);
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
            Config.getAll(req.body, callback);
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },
    getData: function(req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        if (req.body) {
            Config.getData(req.body, callback);
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
            Config.searchData(req.body, callback);
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },
    checkUser: function(req, res) {
        if (req.body) {
            if (req.body.key && req.body.key != "") {
                Config.checkUser(req.body, function(err, data) {
                    if (err) {
                        res.json({
                            value: false,
                            data: err
                        });
                    } else {
                        if (data._id) {
                            req.session.user = data;
                            res.json({
                                value: true
                            });
                        } else {
                            res.json({
                                value: false
                            });
                        }
                    }
                });
            } else {
                res.json({
                    value: false,
                    data: "Invalid call"
                });
            }
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
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
    ////////////////////////////MOBILE
    getAllMob: function(req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        if (req.body) {
            Config.getAllMob(req.body, callback);
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },
    urlToJson: function(req, res) {
        if (req.query && req.query.url && req.query.url != "") {
            request.get({
                url: req.query.url
            }, function(err, http, body) {
                if (err) {
                    console.log(err);
                    res.json({
                        value: false,
                        data: err
                    });
                } else {
                    body = JSON.parse(body);
                    res.json({
                        value: true,
                        data: body
                    });
                }
            });
        } else {
            res.json({
                value: false,
                data: "Please provide url"
            });
        }
    }
};
