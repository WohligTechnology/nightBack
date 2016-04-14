var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    username: String,
    audio: String,
    order: Number,
    modificationTime: Date,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'AudioGalleryCategory'
    },
    status: Number
});

module.exports = mongoose.model('AudioGallery', schema);
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
        this.find().exec(callback);
    },
    getOne: function(data, callback) {
        this.findOne({
            "_id": data._id
        }).exec(callback);
    },
    //////////////////////////////////MOBILE
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
        this.findOne({
            "_id": data._id
        }).exec(callback);
    },
    searchData: function(data, callback) {
        var check = new RegExp(data.search, "i");
        this.find({
            username: {
                '$regex': check
            }
        }, {
            _id: 1,
            username: 1
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
