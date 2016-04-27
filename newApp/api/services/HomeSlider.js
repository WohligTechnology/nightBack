var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: String,
    image: String,
    order: Number,
    link: String,
    type: String,
    index: Number,
    modificationTime: Date,
    status: Boolean
});

module.exports = mongoose.model('HomeSlider', schema);
var models = {
    saveData: function(data, callback) {
        var project = this(data);

        function callSave() {
            if (data._id) {
                HomeSlider.findOneAndUpdate({
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
        }
        if (data.status && data.status == true) {
            this.update({}, {
                status: false
            }, { multi: true }, function(err, updated) {
                if (err) {
                    console.log(err);
                    callback(err, null);
                } else {
                    callSave();
                }
            });
        } else {
            callSave();
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
    insertData: function(data, callback) {
        if (data && data.length > 0) {
            function callSave(num) {
                HomeSlider.saveData(data[num], function(err, respo) {
                    if (err) {
                        callback(err, null);
                    } else {
                        num++;
                        if (num == data.length) {
                            callback(null, { comment: "Data saved" });
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
    sort: function(data, callback) {
        if (data && data.length > 0) {
            function callSave(num) {
                HomeSlider.saveData({
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
    //////////////////////////////////////MOBILE
    getOneMob: function(data, callback) {
        this.findOne({
            "_id": data._id,
            status: true
        }).exec(callback);
    },
    searchData: function(data, callback) {
        var check = new RegExp(data.search, "i");
        this.find({
            name: {
                '$regex': check
            }
        }, {
            _id: 1,
            name: 1
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
