var mongoose = require('mongoose');
var objid = require('mongodb').ObjectID;
var Schema = mongoose.Schema;

var schema = new Schema({
    title: String,
    video: String,
    order: Number,
    modificationTime: Date,
    image: String,
    index: Number,
    videos: Schema.Types.Mixed,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'VideoGalleryCategory'
    },
    status: Number
});

module.exports = mongoose.model('VideoGallery', schema);
var models = {
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
        this.find().sort({
            index: 1
        }).exec(callback);
    },
    getOne: function(data, callback) {
        this.findOne({
            "_id": data._id
        }).exec(callback);
    },
    sort: function(data, callback) {
        if (data && data.length > 0) {
            function callSave(num) {
                VideoGallery.saveData({
                    _id: data[num]._id,
                    index: num + 1
                }, function(err, respo) {
                    if (err) {
                        callback(err, null);
                    } else {
                        num++;
                        if (num == data.length) {
                            callback(null, { comment: "Data sorted" });
                        } else {
                            callSave(num);
                        }
                    }
                });
            }
            callSave(0);
        } else {
            callback(null, {});
        }
    },
    /////////////////////////////////////MOBILE
    getAllMob: function(data, callback) {
        var newreturns = {};
        newreturns.data = [];
        data.pagenumber = parseInt(data.pagenumber);
        data.pagesize = parseInt(data.pagesize);
        this.find({}, {
            videos: 0
        }).sort({
            index: 1
        }).skip(data.pagesize * (data.pagenumber - 1)).limit(data.pagesize).exec(function(err, data2) {
            if (err) {
                console.log(err);
                callback(err, null);
            } else if (data2 && data2.length > 0) {
                newreturns.data = data2;
                newreturns.totalpages = Math.ceil(data2.length / data.pagesize);
                newreturns.pageno = data.pagenumber;
                callback(null, newreturns);
            } else {
                callback(null, newreturns);
            }
        });
    },
    getOneMob: function(data, callback) {
        data.pagesize = parseInt(data.pagesize);
        data.pagenumber = parseInt(data.pagenumber);
        var newreturns = {};
        newreturns.data = [];
        var skip = data.pagesize * (data.pagenumber - 1);
        VideoGallery.aggregate([{
            $match: {
                _id: objid(data._id)
            }
        }, {
            $unwind: "$videos"
        }, {
            $match: {
                "videos.status": true
            }
        }, {
            $group: {
                _id: "_id",
                videos: {
                    $addToSet: "$videos"
                }
            }
        }, {
            $project: {
                _id: 0,
                videos: { $slice: ["$videos", skip, data.pagesize] }
            }
        }]).exec(function(err, data2) {
            if (err) {
                console.log(err);
                callback(err, null);
            } else if (_.isEmpty(data2)) {
                callback(null, newreturns);
            } else {
                newreturns.data = data2[0].videos;
                newreturns.pageno = data.pagenumber;
                callback(null, newreturns);
            }
        });
    },
    searchData: function(data, callback) {
        var check = new RegExp(data.search, "i");
        this.find({
            title: {
                '$regex': check
            }
        }, {
            _id: 1,
            title: 1
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
