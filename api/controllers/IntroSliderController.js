module.exports = {

  save: function (req, res) {
		function callback(err, data) {
      Config.GlobalCallback(err,data,res);
    }
    IntroSlider.saveData(req.body, callback);
  },

  delete: function (req, res) {
		function callback(err, data) {
      Config.GlobalCallback(err,data,res);
    }
    IntroSlider.deleteData(req.body, callback);
  },

  get: function (req, res) {
		function callback(err, data) {
      Config.GlobalCallback(err,data,res);
    }
    IntroSlider.getAll(req.body, callback);
  },

  getAll: function (req, res) {
		function callback(err, data) {
      Config.GlobalCallback(err,data,res);
    }
    IntroSlider.getOne(req.body, callback);
  },

  reorder: function(req, res) {
    function callback(err, data) {
      Config.GlobalCallback(err,data,res);
    }
    IntroSlider.reorder(req.body, callback);
  }
};
