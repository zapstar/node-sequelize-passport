var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function(req, res){
  if(req.isAuthenticated()) {
    res.redirect('/');
  } else {
    res.render('login', { user: req.user, message: req.flash('error') });
  }
});

router.post('/', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
}));

module.exports = router;
