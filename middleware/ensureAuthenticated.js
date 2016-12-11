var jwt = require('jsonwebtoken');
var moment = require('moment');

exports.ensureAuthenticated = function(req, res, next) {
  // console.log(req.headers.authorization);

  if(!req.headers.authorization) {
    return res.status(403).send({response: 'Request without header authorization'});
  }

  var t = req.headers.authorization.split(' ')[1];
  // console.log(t);
  jwt.verify(t, "thefightingirish", function(err, payload) {
    if(err) console.log(err);
    // console.log(payload.exp, moment().unix());
    if(payload.exp <= moment().unix()) {
      return res.status(401).send({response: 'The token has expired'});
    }
    // console.log(req.user);
    console.log(payload);
    req.user = payload.username;
    next();
  });

}
