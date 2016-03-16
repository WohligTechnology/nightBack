var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: String,
    icon: String,
    type: String,
    iconType: String,
    order: Number,
    link: String,
    modificationTime: Date,
    status: Number
});

module.exports = mongoose.model('Navigation', schema);
var models = {
    saveData: function (data, callback) {
        var project = this(data);
        if (data._id) {
            this.findOneAndUpdate({
                _id: data._id
            }, data, callback);
        } else {
            project.save(function (err, data2) {
                if (err) {
                    callback(err, false);
                } else {
                    callback(null, data2);
                }
            });
        }
    },
    deleteData: function (data, callback) {
        this.findOneAndRemove({
            _id: data._id
        }, function (err, data) {

            if (err) {
                callback(err, false);
            } else {
                callback(null, data);
            }
        });
    },
    getAll: function (data, callback) {
        this.find().exec(callback);
    },
    getOne: function (data, callback) {
        this.findOne({
            "_id": data._id
        }).exec(callback);
    }
};

module.exports = _.assign(module.exports, models);