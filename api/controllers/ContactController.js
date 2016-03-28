module.exports = {

  save: function (req, res) {
		function callback(err, data) {
      Config.GlobalCallback(err,data,res);
    }
    Contact.saveData(req.body, callback);
  },

  delete: function (req, res) {
		function callback(err, data) {
      Config.GlobalCallback(err,data,res);
    }
    Contact.deleteData(req.body, callback);
  },

  get: function (req, res) {
		function callback(err, data) {
      Config.GlobalCallback(err,data,res);
    }
    Contact.getOne(req.body, callback);
  },

  getAll: function (req, res) {
		function callback(err, data) {
      Config.GlobalCallback(err,data,res);
    }
    Contact.getAll(req.body, callback);
  },

  reorder: function(req, res) {
    function callback(err, data) {
      Config.GlobalCallback(err,data,res);
    }
    Contact.reorder(req.body, callback);
  }
};
