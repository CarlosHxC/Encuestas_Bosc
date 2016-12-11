'use strict';

var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var moment = require('moment');

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    require: true
  },
  hash: String,
  salt: String
});

userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
  return jwt.sign( {
    _id: this._id,
    username: this.username,
    iat: moment().unix(),
    exp: moment().add(1, "days").unix()
  }, "thefightingirish");
};

module.exports = mongoose.model('User', userSchema);
