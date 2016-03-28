module.exports = {

  save: function (req, res) {
		function callback(err, data) {
      Config.GlobalCallback(err,data,res);
    }
    PhotoGallery.saveData(req.body, callback);
  },

  delete: function (req, res) {
		function callback(err, data) {
      Config.GlobalCallback(err,data,res);
    }
    PhotoGallery.deleteData(req.body, callback);
  },

  get: function (req, res) {
		function callback(err, data) {
      Config.GlobalCallback(err,data,res);
    }
    PhotoGallery.getAll(req.body, callback);
  },

  getAll: function (req, res) {
		function callback(err, data) {
      Config.GlobalCallback(err,data,res);
    }
    PhotoGallery.getOne(req.body, callback);
  },

  reorder: function(req, res) {
    function callback(err, data) {
      Config.GlobalCallback(err,data,res);
    }
    PhotoGallery.reorder(req.body, callback);
  }
};
