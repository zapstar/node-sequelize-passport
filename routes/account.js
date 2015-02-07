var express = require('express');
var router = express.Router();
var util = require('../util/');

router.get('/', util.ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user, message: null });
});

module.exports = router;
