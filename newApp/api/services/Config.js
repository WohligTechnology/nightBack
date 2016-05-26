/**
 * Plan.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var mongoose = require('mongoose');
var Grid = require('gridfs-stream');
var fs = require("fs");
var lwip = require("lwip");
var process = require('child_process');
var lodash = require('lodash');
var moment = require('moment');
var validUrl = require('valid-url');
var objid = require('mongodb').ObjectID;
var MaxImageSize = 1200;
var request = require("request");
var crypto = require('crypto');
var format = 'aes192';

/////////////////////////URL
var porturl = "http://api.blazen.io/port/";
// var porturl = "http://api.blazen.io:84/port/";
// var porturl = "http://192.168.1.129:84/port/";

var gfs = Grid(mongoose.connections[0].db, mongoose);
gfs.mongo = mongoose.mongo;

var Schema = mongoose.Schema;
var schema = new Schema({
    homeContent: String,
    login: Schema.Types.Mixed,
    blog: Schema.Types.Mixed,
    search: Schema.Types.Mixed,
    gaid: String,
    socialfeeds: Schema.Types.Mixed,
    notification: Schema.Types.Mixed,
    soundCloudUsername: String,
    googleCloud: Schema.Types.Mixed
});
module.exports = mongoose.model('Config', schema);

var models = {
    GlobalCallback: function(err, data, res) {
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
    },
    uploadFile: function(filename, callback) {
        var id = mongoose.Types.ObjectId();
        var extension = filename.split(".").pop();
        extension = extension.toLowerCase();
        if (extension == "jpeg") {
            extension = "jpg";
        }
        var newFilename = id + "." + extension;

        var writestream = gfs.createWriteStream({
            filename: newFilename
        });
        var imageStream = fs.createReadStream(filename);

        function writer2(metaValue) {
            var writestream2 = gfs.createWriteStream({
                filename: newFilename,
                metadata: metaValue
            });
            writestream2.on('finish', function() {
                callback(null, {
                    name: newFilename
                });
                fs.unlink(filename);
            });
            fs.createReadStream(filename).pipe(writestream2);
        }

        if (extension == "png" || extension == "jpg" || extension == "gif") {
            lwip.open(filename, extension, function(err, image) {
                if (err) {
                    console.log(err);
                    callback(err, null);
                } else {
                    var upImage = {
                        width: image.width(),
                        height: image.height(),
                        ratio: image.width() / image.height()
                    };

                    if (upImage.width > upImage.height) {
                        if (upImage.width > MaxImageSize) {
                            image.resize(MaxImageSize, MaxImageSize / (upImage.width / upImage.height), function(err, image2) {
                                if (err) {
                                    console.log(err);
                                    callback(err, null);
                                } else {
                                    upImage = {
                                        width: image2.width(),
                                        height: image2.height(),
                                        ratio: image2.width() / image2.height()
                                    };
                                    image2.writeFile(filename, function(err) {
                                        writer2(upImage);
                                    });
                                }
                            });
                        } else {
                            writer2(upImage);
                        }
                    } else {
                        if (upImage.height > MaxImageSize) {
                            image.resize((upImage.width / upImage.height) * MaxImageSize, MaxImageSize, function(err, image2) {
                                if (err) {
                                    console.log(err);
                                    callback(err, null);
                                } else {
                                    upImage = {
                                        width: image2.width(),
                                        height: image2.height(),
                                        ratio: image2.width() / image2.height()
                                    };
                                    image2.writeFile(filename, function(err) {
                                        writer2(upImage);
                                    });
                                }
                            });
                        } else {
                            writer2(upImage);
                        }
                    }
                }
            });
        } else {
            imageStream.pipe(writestream);
        }

        writestream.on('finish', function() {
            callback(null, {
                name: newFilename
            });
            fs.unlink(filename);
        });
    },
    readUploaded: function(filename, width, height, style, res) {
        var readstream = gfs.createReadStream({
            filename: filename
        });
        readstream.on('error', function(err) {
            res.json({
                value: false,
                error: err
            });
        });

        function writer2(filename, gridFSFilename, metaValue) {
            var writestream2 = gfs.createWriteStream({
                filename: gridFSFilename,
                metadata: metaValue
            });
            writestream2.on('finish', function() {
                fs.unlink(filename);
            });
            fs.createReadStream(filename).pipe(res);
            fs.createReadStream(filename).pipe(writestream2);
        }

        function read2(filename2) {
            var readstream2 = gfs.createReadStream({
                filename: filename2
            });
            readstream2.on('error', function(err) {
                res.json({
                    value: false,
                    error: err
                });
            });
            readstream2.pipe(res);
        }
        var onlyName = filename.split(".")[0];
        var extension = filename.split(".").pop();
        if ((extension == "jpg" || extension == "png" || extension == "gif") && ((width && width > 0) || (height && height > 0))) {
            //attempt to get same size image and serve
            var newName = onlyName;
            if (width > 0) {
                newName += "-" + width;
            } else {
                newName += "-" + 0;
            }
            if (height) {
                newName += "-" + height;
            } else {
                newName += "-" + 0;
            }
            if (style && (style == "fill" || style == "cover")) {
                newName += "-" + style;
            } else {
                newName += "-" + 0;
            }
            var newNameExtire = newName + "." + extension;
            gfs.exist({
                filename: newNameExtire
            }, function(err, found) {
                if (err) {
                    res.json({
                        value: false,
                        error: err
                    });
                }
                if (found) {
                    read2(newNameExtire);
                } else {
                    var imageStream = fs.createWriteStream('./.tmp/uploads/' + filename);
                    readstream.pipe(imageStream);
                    imageStream.on("finish", function() {
                        lwip.open('./.tmp/uploads/' + filename, function(err, image) {
                            ImageWidth = image.width();
                            ImageHeight = image.height();
                            var newWidth = 0;
                            var newHeight = 0;
                            var pRatio = width / height;
                            var iRatio = ImageWidth / ImageHeight;
                            if (width && height) {
                                newWidth = width;
                                newHeight = height;
                                switch (style) {
                                    case "fill":
                                        if (pRatio > iRatio) {
                                            newHeight = height;
                                            newWidth = height * (ImageWidth / ImageHeight);
                                        } else {
                                            newWidth = width;
                                            newHeight = width / (ImageWidth / ImageHeight);
                                        }
                                        break;
                                    case "cover":
                                        if (pRatio < iRatio) {
                                            newHeight = height;
                                            newWidth = height * (ImageWidth / ImageHeight);
                                        } else {
                                            newWidth = width;
                                            newHeight = width / (ImageWidth / ImageHeight);
                                        }
                                        break;
                                }
                            } else if (width) {
                                newWidth = width;
                                newHeight = width / (ImageWidth / ImageHeight);
                            } else if (height) {
                                newWidth = height * (ImageWidth / ImageHeight);
                                newHeight = height;
                            }
                            image.resize(parseInt(newWidth), parseInt(newHeight), function(err, image2) {

                                if (style == "cover") {

                                    image2.crop(parseInt(width), parseInt(height), function(err, image3) {
                                        if (err) {

                                        } else {

                                            image3.writeFile('./.tmp/uploads/' + filename, function(err) {
                                                writer2('./.tmp/uploads/' + filename, newNameExtire, {
                                                    width: newWidth,
                                                    height: newHeight
                                                });
                                            });
                                        }
                                    });



                                } else {
                                    image2.writeFile('./.tmp/uploads/' + filename, function(err) {
                                        writer2('./.tmp/uploads/' + filename, newNameExtire, {
                                            width: newWidth,
                                            height: newHeight
                                        });
                                    });
                                }




                            });
                        });
                    });
                }
            });
            //else create a resized image and serve
        } else {
            readstream.pipe(res);
        }
        //error handling, e.g. file does not exist
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
        this.find().exec(callback);
    },
    getOne: function(data, callback) {
        this.findOne({
            "_id": data._id
        }).exec(callback);
    },
    getData: function(data, callback) {
        var newreturns = {};
        async.parallel([
            function(callback) {
                Article.getAll(data, function(err, data1) {
                    if (err) {
                        newreturns.home = [];
                        callback(null, newreturns);
                    } else if (data1 && data1.length > 0) {
                        newreturns.home = data1;
                        callback(null, newreturns);
                    } else {
                        newreturns.home = [];
                        callback(null, newreturns);
                    }
                });
            },
            function(callback) {
                Blog.getAll(data, function(err, data2) {
                    if (err) {
                        console.log(err);
                        newreturns.blog = [];
                        callback(null, newreturns);
                    } else if (data2 && data2.length > 0) {
                        newreturns.blog = data2;
                        callback(null, newreturns);
                    } else {
                        newreturns.blog = [];
                        callback(null, newreturns);
                    }
                });
            },
            function(callback) {
                Event.getAll(data, function(err, data3) {
                    if (err) {
                        console.log(err);
                        newreturns.event = [];
                        callback(null, newreturns);
                    } else if (data3 && data3.length > 0) {
                        newreturns.event = data3;
                        callback(null, newreturns);
                    } else {
                        newreturns.event = [];
                        callback(null, newreturns);
                    }
                });
            },
            function(callback) {
                PhotoGallery.getAll(data, function(err, data4) {
                    if (err) {
                        console.log(err);
                        newreturns.photo = [];
                        callback(null, newreturns);
                    } else if (data4 && data4.length > 0) {
                        newreturns.photo = data4;
                        callback(null, newreturns);
                    } else {
                        newreturns.photo = [];
                        callback(null, newreturns);
                    }
                });
            },
            function(callback) {
                VideoGallery.getAll(data, function(err, data5) {
                    if (err) {
                        console.log(err);
                        newreturns.video = [];
                        callback(null, newreturns);
                    } else if (data5 && data5.length > 0) {
                        newreturns.video = data5;
                        callback(null, newreturns);
                    } else {
                        newreturns.video = [];
                        callback(null, newreturns);
                    }
                });
            }
        ], function(err, data6) {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                callback(null, newreturns);
            }
        });
    },
    searchData: function(data, callback) {
        Config.find({}, function(err, data2) {
            if (err) {
                callback(err, null);
            } else {
                var i = 0;
                var abc = [];
                if (data2[0] && data2[0].search && data2[0].search.length > 0) {
                    _.each(data2[0].search, function(respo) {
                        if (respo.enabled == true) {
                            abc.push(respo.name);
                        }
                        i++;
                        if (i == data2[0].search.length) {
                            var newObj = {};
                            async.each(abc, function(n, callback2) {
                                if (n == "Articles") {
                                    Article.searchData(data, function(err, search1) {
                                        if (err) {
                                            console.log(err);
                                            newObj.article = [];
                                            callback2(null, newObj);
                                        } else {
                                            newObj.article = search1;
                                            callback2(null, newObj);
                                        }
                                    });
                                } else if (n == "Notifications") {
                                    Notification.searchData(data, function(err, search4) {
                                        if (err) {
                                            console.log(err);
                                            newObj.notification = [];
                                            callback2(null, newObj);
                                        } else {
                                            newObj.notification = search4;
                                            callback2(null, newObj);
                                        }
                                    });
                                } else if (n == "Events") {
                                    Event.searchData(data, function(err, search5) {
                                        if (err) {
                                            console.log(err);
                                            newObj.event = [];
                                            callback2(null, newObj);
                                        } else {
                                            newObj.event = search5;
                                            callback2(null, newObj);
                                        }
                                    });
                                } else if (n == "Blogs") {
                                    Blog.searchData(data, function(err, search6) {
                                        if (err) {
                                            console.log(err);
                                            newObj.blog = [];
                                            callback2(null, newObj);
                                        } else {
                                            newObj.blog = search6;
                                            callback2(null, newObj);
                                        }
                                    });
                                } else if (n == "Photo Galleries") {
                                    PhotoGallery.searchData(data, function(err, search7) {
                                        if (err) {
                                            console.log(err);
                                            newObj.photo = [];
                                            callback2(null, newObj);
                                        } else {
                                            newObj.photo = search7;
                                            callback2(null, newObj);
                                        }
                                    });
                                } else if (n == "Video Galleries") {
                                    VideoGallery.searchData(data, function(err, search8) {
                                        if (err) {
                                            console.log(err);
                                            newObj.video = [];
                                            callback2(null, newObj);
                                        } else {
                                            newObj.video = search8;
                                            callback2(null, newObj);
                                        }
                                    });
                                } else if (n == "Contact") {
                                    Contact.searchData(data, function(err, search9) {
                                        if (err) {
                                            console.log(err);
                                            newObj.contact = [];
                                            callback2(null, newObj);
                                        } else {
                                            newObj.contact = search9;
                                            callback2(null, newObj);
                                        }
                                    });
                                } else if (n == "Audio Gallery") {
                                    AudioGallery.searchData(data, function(err, search10) {
                                        if (err) {
                                            console.log(err);
                                            newObj.audio = [];
                                            callback2(null, newObj);
                                        } else {
                                            newObj.audio = search10;
                                            callback2(null, newObj);
                                        }
                                    });
                                } else if (n == "Users") {
                                    User.searchData(data, function(err, search11) {
                                        if (err) {
                                            console.log(err);
                                            newObj.user = [];
                                            callback2(null, newObj);
                                        } else {
                                            newObj.user = search11;
                                            callback2(null, newObj);
                                        }
                                    });
                                }
                            }, function(err, respo) {
                                if (err) {
                                    console.log(err);
                                    callback(err, null);
                                } else {
                                    callback(null, newObj);
                                }
                            });
                        }
                    });
                } else {
                    callback(null, "Search not Configured");
                }
            }
        });
    },
    checkUser: function(data, callback) {
        var decipher = crypto.createDecipher(format, "lenovo g50");
        var dec = decipher.update(data.key, 'hex', 'utf8');
        dec += decipher.final('utf8');
        var split = dec.split("|");
        if (split.length == 4) {
            if (_.isNaN(parseInt(split[0]))) {
                callback({ message: "Key Incorrect" }, {});
            } else if (!validUrl.isUri(split[1])) {
                callback({ message: "Key Incorrect" }, {});
            } else if (!moment().isBefore(moment(new Date(split[2])).add(1, "days"))) {
                callback({ message: "Key Incorrect" }, {});
            } else if (!objid.isValid(split[3])) {
                callback({ message: "Key Incorrect" }, {});
            } else {
                request.post({
                    url: porturl + "getApp2",
                    rejectUnauthorized: false,
                    json: {
                        user: split[3]
                    }
                }, function(err, http, body) {
                    if (err) {
                        console.log(err);
                        callback(err, null);
                    } else {
                        if (body.data && body.data.length > 0) {
                            var index = lodash._.findIndex(body.data, function(r) {
                                return r.appname == split[0];
                            });
                            if (index === -1) {
                                callback(null, {});
                            } else {
                                var mydata = {};
                                mydata = body.data[index];
                                callback(null, mydata);
                            }
                        } else {
                            callback({ message: "App Not Found" }, {});
                        }
                    }
                });
            }
        } else {
            callback({ message: "Key Incorrect" }, {});
        }
    },
    ////////////////////////////////MOBILE
    getAllMob: function(data, callback) {
        this.find().exec(callback);
    },
};
module.exports = _.assign(module.exports, models);
