module.exports = {

  save: function (req, res) {
		function callback(err, data) {
      Config.globalCallback(err,data,res);
    }
    Article.saveData(req.body, callback);
  },

  delete: function (req, res) {
		function callback(err, data) {
      Config.globalCallback(err,data,res);
    }
    Article.deleteData(req.body, callback);
  },

  get: function (req, res) {
		function callback(err, data) {
      Config.globalCallback(err,data,res);
    }
    Article.getAll(data, callback);
  },

  getAll: function (req, res) {
		function callback(err, data) {
      Config.globalCallback(err,data,res);
    }
    Article.getOne(data, callback);
  }
};
