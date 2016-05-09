var mongoose = require('mongoose');
var objid = require('mongodb').ObjectID;
var Schema = mongoose.Schema;

var schema = new Schema({
    title: String,
    icon: String,
    order: Number,
    modificationTime: Date,
    index: Number,
    images: Schema.Types.Mixed,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'PhotoGalleryCategory'
    },
    status: Boolean,
    date: Date
});

module.exports = mongoose.model('PhotoGallery', schema);
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
        this.find().sort({ index: 1 }).exec(callback);
    },
    getOne: function(data, callback) {
        this.findOne({
            "_id": data._id
        }).exec(callback);
    },
    sort: function(data, callback) {
        if (data && data.length > 0) {
            function callSave(num) {
                PhotoGallery.saveData({
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
    ///////////////////////////////////MOBILE
    getAllMob: function(data, callback) {
        var newreturns = {};
        newreturns.data = [];
        data.pagenumber = parseInt(data.pagenumber);
        data.pagesize = parseInt(data.pagesize);
        this.find({
            status: true
        }, {
            images: 0
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
        var skip = parseInt(data.pagesize * (data.pagenumber - 1));
        PhotoGallery.aggregate([{
            $match: {
                _id: objid(data._id),
                status: true
            }
        }, {
            $unwind: "$images"
        }, {
            $match: {
                "images.status": true
            }
        }, {
            $group: {
                _id: "_id",
                images: {
                    $addToSet: "$images"
                }
            }
        }, {
            $project: {
                _id: 0,
                images: { $slice: ["$images", skip, data.pagesize] }
            }
        }]).exec(function(err, data2) {
            if (err) {
                console.log(err);
                callback(err, null);
            } else if (_.isEmpty(data2)) {
                callback(null, newreturns);
            } else {
                newreturns.data = data2[0].images;
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
            },
            status: true
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
