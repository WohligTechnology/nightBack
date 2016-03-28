module.exports = {

  save: function (req, res) {
		function callback(err, data) {
      Config.GlobalCallback(err,data,res);
    }
    VideoGallery.saveData(req.body, callback);
  },

  delete: function (req, res) {
		function callback(err, data) {
      Config.GlobalCallback(err,data,res);
    }
    VideoGallery.deleteData(req.body, callback);
  },

  get: function (req, res) {
		function callback(err, data) {
      Config.GlobalCallback(err,data,res);
    }
    VideoGallery.getAll(req.body, callback);
  },

  getAll: function (req, res) {
		function callback(err, data) {
      Config.GlobalCallback(err,data,res);
    }
    VideoGallery.getOne(req.body, callback);
  },

  reorder: function(req, res) {
    function callback(err, data) {
      Config.GlobalCallback(err,data,res);
    }
    VideoGallery.reorder(req.body, callback);
  }
};
