module.exports = {

  save: function (req, res) {
		function callback(err, data) {
      Config.globalCallback(err,data,res);
    }
    AudioGallery.saveData(req.body, callback);
  },

  delete: function (req, res) {
		function callback(err, data) {
      Config.globalCallback(err,data,res);
    }
    AudioGallery.deleteData(req.body, callback);
  },

  get: function (req, res) {
		function callback(err, data) {
      Config.globalCallback(err,data,res);
    }
    AudioGallery.getAll(data, callback);
  },

  getAll: function (req, res) {
		function callback(err, data) {
      Config.globalCallback(err,data,res);
    }
    AudioGallery.getOne(data, callback);
  },

  reorder: function(req, res) {
    function callback(err, data) {
      Config.globalCallback(err,data,res);
    }
    AudioGallery.reorder(data, callback);
  }
};
