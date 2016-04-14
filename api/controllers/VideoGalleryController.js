module.exports = {
    save: function(req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        if (req.body) {
            VideoGallery.saveData(req.body, callback);
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
                VideoGallery.deleteData(req.body, callback);
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
                VideoGallery.getOne(req.body, callback);
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
            VideoGallery.getAll(req.body, callback);
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },
    sort: function(req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        if (req.body) {
            VideoGallery.sort(req.body, callback);
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },
    /////////////////////////////////////MOBILE
    getAllMob: function(req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        if (req.body) {
            if (req.body.pagenumber && req.body.pagesize) {
                VideoGallery.getAllMob(req.body, callback);
            } else {
                res.json({
                    value: false,
                    data: "Please provide params"
                });
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
                VideoGallery.getOneMob(req.body, callback);
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
            VideoGallery.searchData(req.body, callback);
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    }
};
