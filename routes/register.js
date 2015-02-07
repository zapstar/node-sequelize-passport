var express = require('express');
var router = express.Router();
var models = require('../models');

router.post('/', function(req, res) {
  // first fill the database with this new user's information
  //console.log(JSON.stringify(req.body));
  models.User.find({
      where: { username: req.body.username },
      attributes: [ 'username' ]
    })
    .then(function(user) {
      if(!user) {
        // create that user as no one by that username exists
        models.User
          // all go in directly, all our field names are the same
          .create(req.body)
          .complete(function(err, user) {
            if(err) {
              throw err;
            } else {
              // set the flash message to indicate that user was
              // registered successfully
              req.flash('error', 'The user was registered successfully')
              // finally redirect to login page, so that they can login
              // and start using our features
              res.redirect('/login');
            }
          });
      } else {
        // there's already someone with that username
        res.render('register', {
          user: req.user,
          message: "That username already exists"
        });
      }
    })
    .catch(function(err){
      throw err;
    })
});

router.get('/', function(req, res){
  // if already authenticated, then no need to register
  // this is a bad case where user is meddling with the URL
  // we just send him to our home page if so
  if(req.isAuthenticated()) {
    res.redirect('/');
  } else {
    res.render('register', { user: req.user, message: req.flash('error') });
  }
});

module.exports = router;
