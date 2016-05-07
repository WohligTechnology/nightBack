/**
 * UploadController
 *
 * @description :: Server-side logic for managing uploads
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    index: function(req, res) {
        function callback2(err) {
            Config.GlobalCallback(err, fileNames, res);
        }
        var fileNames = [];
        req.file("file").upload({
            maxBytes: 10000000 // 10 MB Storage 1 MB = 10^6
        }, function(err, uploadedFile) {
            if (uploadedFile && uploadedFile.length > 0) {
                async.each(uploadedFile, function(n, callback) {
                    Config.uploadFile(n.fd, function(err, value) {
                        if (err) {
                            callback(err);
                        } else {
                            fileNames.push(value.name);
                            callback(null);
                        }
                    });
                }, callback2);
            } else {
                callback2(null, {
                    value: false,
                    data: "No files selected"
                });
            }
        });
    },
    readFile: function(req, res) {
        Config.readUploaded(req.query.file, req.query.width, req.query.height, req.query.style, res);
    },
    ///////////////////////////MOBILE
    fromApp: function(req, res) {
        function callback2(err) {
            if (err) {
                Config.GlobalCallback(err, fileNames, res);
            } else {
                var updateObj = {};
                if (req.body.profile == true) {
                    updateObj = {
                        _id: req.session.user._id,
                        profilePic: fileNames
                    };
                } else {
                    updateObj = {
                        _id: req.session.user._id,
                        bannerPic: fileNames
                    };
                }
                User.saveMob(updateObj, function(err, updated) {
                    if (err) {
                        console.log(err);
                        callback(err, null);
                    } else {
                        req.session.user = updated;
                        req.session.save();
                        res.json({
                            data: "Picture Updated",
                            value: true
                        });
                    }
                });
            }
        }
        var fileNames = [];
        if (req.session.user && req.body.profile && req.body.profile != "") {
            req.file("file").upload({
                maxBytes: 10000000 // 10 MB Storage 1 MB = 10^6
            }, function(err, uploadedFile) {
                if (uploadedFile && uploadedFile.length > 0) {
                    async.each(uploadedFile, function(n, callback) {
                        Config.uploadFile(n.fd, function(err, value) {
                            if (err) {
                                callback(err);
                            } else {
                                fileNames.push(value.name);
                                callback(null);
                            }
                        });
                    }, callback2);
                } else {
                    callback2(null, {
                        value: false,
                        data: "No files selected"
                    });
                }
            });
        } else {
            res.json({
                value: false,
                data: "User not logged-in or Invalid Params"
            });
        }
    },
};
