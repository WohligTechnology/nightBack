var mongoose = require('mongoose');
var objid = require('mongodb').ObjectID;
var Schema = mongoose.Schema;

var schema = new Schema({
    port: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: String,
    appname: String,
    prefill: Number
});

module.exports = mongoose.model('Port', schema);
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
    getById: function(data, callback) {
        Port.findOne({
            appname: {
                $exists: true
            },
            user: {
                $exists: false
            },
            prefill: -1
        }).sort({ _id: 1 }).limit(1).exec(function(err, found) {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                if (_.isEmpty(found)) {
                    callback(null, {});
                } else {
                    callback(null, found);
                }
            }
        });
    },
    lastPort: function(data, callback) {
        Port.findOne({}, {
            _id: 0,
            port: 1
        }).sort({
            port: -1
        }).limit(1).exec(function(err, data2) {
            if (err) {
                console.log(err);
                callback(err, null);
            } else if (_.isEmpty(data2)) {
                callback(null, {
                    port: 0
                });
            } else {
                callback(null, data2);
            }
        });
    }
};

module.exports = _.assign(module.exports, models);
