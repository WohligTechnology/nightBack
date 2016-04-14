var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: String,
    address: String,
    subject: String,
    email: String,
    timestamp: Date,
    comment: String
});

module.exports = mongoose.model('Enquiry', schema);
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
    /////////////////////////////////MOBILE
    saveMob: function(data, callback) {
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
};

module.exports = _.assign(module.exports, models);
