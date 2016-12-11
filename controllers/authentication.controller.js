'use strict';

var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User');

module.exports.register = function(req, res) {
  var user = new User();
  User.find({username: req.body.username}, function(err, data) {
    if(err) {
      console.log(err);
      return res.status(400).json({"response": 'DB error'});
    }
    console.log(data);

    if(data.length > 0) {
      return res.status(400).json({response: 'User exists'});
    } else {
      user.username = req.body.username;
      user.setPassword(req.body.password);

      user.save(function(err) {
        if(err) {
          console.log(err);
          return res.status(400).jsonp({response: "Can't create the user"});
        }

        var token = user.generateJwt();
        res.status(200).jsonp({"response": token});
      });
    }
  });
}

module.exports.login = function(req, res) {
  console.log(req.body);
  if(!req.body.username || !req.body.password) {
    return res.status(400).json({response: 'All fields required'});
  }

  passport.authenticate('local', function(err, user, info) {
    var token;
    if(err) {
      res.status(400).json({response: err});
      return;
    }

    if(user) {
      token = user.generateJwt();
      res.status(200);
      res.json({
        "response": token
      });
    } else {

      res.status(401).json({response: info});
    }
  })(req, res);
}
