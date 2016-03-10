module.exports = {

  save: function (req, res) {
		function callback(err, data) {
      Config.globalCallback(err,data,res);
    }
    PhotoGalleryCategory.saveData(req.body, callback);
  },

  delete: function (req, res) {
		function callback(err, data) {
      Config.globalCallback(err,data,res);
    }
    PhotoGalleryCategory.deleteData(req.body, callback);
  },

  get: function (req, res) {
		function callback(err, data) {
      Config.globalCallback(err,data,res);
    }
    PhotoGalleryCategory.getAll(data, callback);
  },

  getAll: function (req, res) {
		function callback(err, data) {
      Config.globalCallback(err,data,res);
    }
    PhotoGalleryCategory.getOne(data, callback);
  },

  reorder: function(req, res) {
    function callback(err, data) {
      Config.globalCallback(err,data,res);
    }
    PhotoGalleryCategory.reorder(data, callback);
  }
};
