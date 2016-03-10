module.exports = {

  save: function (req, res) {
		function callback(err, data) {
      Config.globalCallback(err,data,res);
    }
    HomeSlider.saveData(req.body, callback);
  },

  delete: function (req, res) {
		function callback(err, data) {
      Config.globalCallback(err,data,res);
    }
    HomeSlider.deleteData(req.body, callback);
  },

  get: function (req, res) {
		function callback(err, data) {
      Config.globalCallback(err,data,res);
    }
    HomeSlider.getAll(data, callback);
  },

  getAll: function (req, res) {
		function callback(err, data) {
      Config.globalCallback(err,data,res);
    }
    HomeSlider.getOne(data, callback);
  },

  reorder: function(req, res) {
    function callback(err, data) {
      Config.globalCallback(err,data,res);
    }
    HomeSlider.reorder(data, callback);
  }
};
