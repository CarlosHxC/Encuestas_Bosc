'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy(function(username, password, done) {
    console.log(username);
    User.findOne({username: username}, function(err, user) {
      if(err) {return done(err);}

      //Return if user not found
      if(!user) {
        return done(null, false, {
          message: 'User not found'
        });
      }

      //Return if password is wrong
      if(!user.validPassword(password)) {
        return done(null, false, {
          message: 'Password is wrong'
        });
      }

      //if credentials are ok, return the user object
      return done(null, user);
    });
}));
