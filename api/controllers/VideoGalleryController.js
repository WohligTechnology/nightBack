module.exports = {

  save: function (req, res) {
		function callback(err, data) {
      Config.globalCallback(err,data,res);
    }
    VideoGallery.saveData(req.body, callback);
  },

  delete: function (req, res) {
		function callback(err, data) {
      Config.globalCallback(err,data,res);
    }
    VideoGallery.deleteData(req.body, callback);
  },

  get: function (req, res) {
		function callback(err, data) {
      Config.globalCallback(err,data,res);
    }
    VideoGallery.getAll(data, callback);
  },

  getAll: function (req, res) {
		function callback(err, data) {
      Config.globalCallback(err,data,res);
    }
    VideoGallery.getOne(data, callback);
  },

  reorder: function(req, res) {
    function callback(err, data) {
      Config.globalCallback(err,data,res);
    }
    VideoGallery.reorder(data, callback);
  }
};
