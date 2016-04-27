var mongoose = require('mongoose');
var objid = require('mongodb').ObjectID;
var Schema = mongoose.Schema;

var schema = new Schema({
    port: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    username: String,
    appname: String
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
    getByName: function(data, callback) {
        Port.count({
            appname: search
        }).exec(function(err, found) {
            if (err) {
                console.log(err);
                callback({
                    value: false,
                    data: err
                });
            } else {
                if (found === 0) {
                    callback({
                        value: true,
                        data: "App name can be used"
                    });
                } else {
                    callback({
                        value: false,
                        data: "App name already exists"
                    });
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
                callback({
                    value: false,
                    comment: "Error"
                });
            } else if (_.isEmpty(data2)) {
                callback({
                    port: 1338
                });
            } else {
                callback(data2);
            }
        });
    }
};

module.exports = _.assign(module.exports, models);
