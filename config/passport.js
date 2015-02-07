var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var models = require('../models');

passport.use(new LocalStrategy(function(username, password, done) {
  models.User
  .find({ where: { username: username } })
  .then(function(user) { // successful query to database
    if(!user) {
      return done(null, false, { message: 'Unknown user ' + username });
    }
    models.User.comparePassword(password, user.password, function(err, isMatch) {
      if(err) {
        return done(err);
      }
      if(isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Invalid password' });
      }
    });
  })
  .catch(function(err) { // something went wrong with query to db
    done(err);
  });
}));

// serialize session, only store user id in the session information
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// from the user id, figure out who the user is...
passport.deserializeUser(function(userId, done){
  models.User
    .find({ where: { id: userId } })
    .then(function(user){
      done(null, user);
    }).catch(function(err){
      done(err, null);
    });
});
