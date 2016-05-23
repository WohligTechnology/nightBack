module.exports = {
  index: function(req, res) {
    console.log(req.body);
    req.name = "Android";
    res.callback("Chintan");

  }
};
