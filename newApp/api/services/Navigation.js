var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: String,
    icon: String,
    type: String,
    iconType: String,
    order: Number,
    link: Schema.Types.Mixed,
    modificationTime: Date,
    status: Number,
    index: Number,
    default: Boolean
});

module.exports = mongoose.model('Navigation', schema);
var models = {
    saveData: function(data, callback) {
        var project = this(data);
        if (data._id) {
            this.findOneAndUpdate({
                _id: data._id
            }, data, callback);
        } else {
            project.save(function(err, data2) {
                if (err) {
                    callback(err, false);
                } else {
                    callback(null, data2);
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
                Navigation.saveData({
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
    setDefault: function(data, callback) {
        Navigation.update({}, {
            $set: {
                default: false
            }
        }, {
            multi: true
        }, function(err, data2) {
            if (err) {
                callback(err, null);
            } else {
                Navigation.saveData({
                    _id: data._id,
                    default: true
                }, function(err, data3) {
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(null, { comment: "Default has been set" });
                    }
                });
            }
        });
    },
    /////////////////////////MOBILE
    getAllMob: function(data, callback) {
        this.find().exec(callback);
    }
};

module.exports = _.assign(module.exports, models);
