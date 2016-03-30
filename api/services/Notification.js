var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    content: String,
    link: String,
    type: Number,
    json: Schema.Types.Mixed,
    modificationTime: Date,
    sendingTime: Date,
    status: Number,
    image: String
});

module.exports = mongoose.model('Notification', schema);
var models = {
    saveData: function(data, callback) {
        var project = this(data);
        if (data._id) {
            data.modificationTime = new Date();
            data.sendingTime = new Date(data.sendingTime);
            this.findOneAndUpdate({
                _id: data._id
            }, data, callback);
        } else {
            project.sendingTime = new Date();
            project.save(function(err, data) {
                if (err) {
                    callback(err, false);
                } else {
                    callback(null, data);
                    console.log(data);
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
    }
};

module.exports = _.assign(module.exports, models);
