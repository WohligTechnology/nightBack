/**
 * UploadController
 *
 * @description :: Server-side logic for managing uploads
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var process = require('child_process');
var fs = require("fs");
module.exports = {
    index: function(req, res) {
        function callback2(err) {
            Config.GlobalCallback(err, fileNames, res);
        }
        var fileNames = [];
        req.file("file").upload({
            maxBytes: 10000000 // 10 MB Storage 1 MB = 10^6
        }, function(err, uploadedFile) {
            if (err) {
                console.log(err);
                res.json({
                    value: false,
                    data: err
                });
            } else if (uploadedFile && uploadedFile.length > 0) {
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
    zipUpload: function(req, res) {
        if (req.body && req.body.type && req.body.type != "") {
            var filename = "";
            if (req.body.type == "app") {
                filename = "app2.zip";
                callMe();
            } else if (req.body.type == "back") {
                filename = "back.zip";
                callMe();
            } else {
                res.json({
                    value: false,
                    data: "Inavlid Params"
                });
            }

            function callMe() {
                if (req.file('file')._files[0].stream.headers["content-type"] === "application/zip") {
                    req.file("file").upload({
                        maxBytes: 100000000,
                        dirname: "../../zip",
                        saveAs: filename
                    }, function(err, uploadedFile) {
                        if (err) {
                            res.json({
                                value: false,
                                data: err
                            });
                        } else if (uploadedFile && uploadedFile.length > 0) {
                            process.exec("cd zip/ && unzip " + filename, function(err, stdout, stderr) {
                                if (err) {
                                    console.log(err);
                                    res.json({
                                        value: false,
                                        data: err
                                    });
                                } else if (stderr) {
                                    console.log(stderr);
                                    res.json({
                                        value: false,
                                        data: stderr
                                    });
                                } else {
                                    process.exec("cp -r zip/" + filename.split(".")[0] + " newApp/", function(err2, stdout2, stderr2) {
                                        if (err2) {
                                            console.log(err2);
                                            res.json({
                                                value: false,
                                                data: err2
                                            });
                                        } else if (stderr2) {
                                            console.log(stderr2);
                                            res.json({
                                                value: false,
                                                data: stderr2
                                            });
                                        } else {
                                            process.exec("rm -rf zip/" + filename + " zip/" + filename.split(".")[0], function(err3, stdout3, stderr3) {
                                                if (err3) {
                                                    console.log(err3);
                                                    res.json({
                                                        value: false,
                                                        data: err3
                                                    });
                                                } else if (stderr3) {
                                                    console.log(stderr3);
                                                    res.json({
                                                        value: false,
                                                        data: stderr3
                                                    });
                                                } else {
                                                    Config.editFolder(req.body, function(err, data) {
                                                        if (err) {
                                                            res.json({
                                                                value: false,
                                                                data: err
                                                            });
                                                        } else {
                                                            res.json({
                                                                value: true,
                                                                data: "Extraction successful & Copied"
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        } else {
                            res.json({
                                value: false,
                                data: { message: "No files selected" }
                            });
                        }
                    });
                } else {
                    res.json({
                        value: false,
                        data: "Upload only zip"
                    });
                }
            }
        } else {
            res.json({
                value: false,
                data: "Please provide params"
            });
        }
    },

    ///////////////////////////MOBILE
    fromApp: function(req, res) {
        function callback2(err) {
            if (err) {
                Config.GlobalCallback(err, fileNames, res);
            } else {
                var updateObj = {};
                if (req.body.image == "true") {
                    updateObj = {
                        _id: req.session.passport.user._id,
                        profilePic: fileNames
                    };
                } else {
                    updateObj = {
                        _id: req.session.passport.user._id,
                        bannerPic: fileNames
                    };
                }
                User.saveMob(updateObj, function(err, updated) {
                    if (err) {
                        console.log(err);
                        callback(err, null);
                    } else {
                        req.session.passport = { user: updated };
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
        if (req.session.passport && req.body.image && req.body.image != "") {
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
