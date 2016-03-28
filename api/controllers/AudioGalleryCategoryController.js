module.exports = {

  save: function (req, res) {
		function callback(err, data) {
      Config.GlobalCallback(err,data,res);
    }
    AudioGalleryCategory.saveData(req.body, callback);
  },

  delete: function (req, res) {
		function callback(err, data) {
      Config.GlobalCallback(err,data,res);
    }
    AudioGalleryCategory.deleteData(req.body, callback);
  },

  get: function (req, res) {
		function callback(err, data) {
      Config.GlobalCallback(err,data,res);
    }
    AudioGalleryCategory.getAll(req.body, callback);
  },

  getAll: function (req, res) {
		function callback(err, data) {
      Config.GlobalCallback(err,data,res);
    }
    AudioGalleryCategory.getOne(req.body, callback);
  },

  reorder: function(req, res) {
    function callback(err, data) {
      Config.GlobalCallback(err,data,res);
    }
    AudioGalleryCategory.reorder(req.body, callback);
  }
};
