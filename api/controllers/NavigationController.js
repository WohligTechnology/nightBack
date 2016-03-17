module.exports = {

    save: function (req, res) {
        function callback(err, data) {
            Config.globalCallback(err, data, res);
        }
        Navigation.saveData(req.body, callback);
    },

    delete: function (req, res) {
        function callback(err, data) {
            Config.globalCallback(err, data, res);
        }
        Navigation.deleteData(req.body, callback);
    },

    get: function (req, res) {
        function callback(err, data) {
            Config.globalCallback(err, data, res);
        }
        Navigation.getOne(req.body, callback);
    },

    getAll: function (req, res) {
        function callback(err, data) {
            Config.globalCallback(err, data, res);
        }
        Navigation.getAll(req.body, callback);
    },

    reorder: function (req, res) {
        function callback(err, data) {
            Config.globalCallback(err, data, res);
        }
        Navigation.reorder(req.body, callback);
    }
};