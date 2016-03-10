module.exports = {

  save: function (req, res) {
		function callback(err, data) {
      Config.globalCallback(err,data,res);
    }
    UserNotification.saveData(req.body, callback);
  },

  delete: function (req, res) {
		function callback(err, data) {
      Config.globalCallback(err,data,res);
    }
    UserNotification.deleteData(req.body, callback);
  },

  get: function (req, res) {
		function callback(err, data) {
      Config.globalCallback(err,data,res);
    }
    UserNotification.getAll(data, callback);
  },

  getAll: function (req, res) {
		function callback(err, data) {
      Config.globalCallback(err,data,res);
    }
    UserNotification.getOne(data, callback);
  }
};
