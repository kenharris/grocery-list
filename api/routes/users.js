var Boom = require('boom');
var bcrypt = require('bcrypt');
var uuid = require('uuid');
var jwt = require('jsonwebtoken');

var superSecret = 'Th1515@P@55w0rdS3cr3t';

var createUser = function(request, reply) {
  var db = request.server.plugins['hapi-mongodb'].db;

  console.log(request.payload);
  var userInfo = JSON.parse(request.payload);

  console.log(userInfo);

  db.collection('users').findOne({'email':userInfo.email}, function (err, user) {
    if (err) return console.error(err);
    if (user == null) {
      var saltRounds = 10;
      bcrypt.genSalt(saltRounds, function(err, salt) {
        if (err) return console.error(err);
        bcrypt.hash(userInfo.password, salt, function(err, hash) {
          userInfo.password = hash;
          db.collection('users').insert(userInfo, function(err, result) {
            if (err) return console.error(err);
            
            var token = _authenticate(userInfo.email, userInfo.password, db, function(token) {
              if (token) reply({'token': token});
              else reply(Boom.unauthorized());
            });
          }); 
        });
      });
    } else {
      reply(Boom.badRequest('account already exists with that email address.'));
    }
  });

};

var authenticateUser = function(request, reply) {
  var db = request.server.plugins['hapi-mongodb'].db;
  var userInfo = JSON.parse(request.payload);

  var token = _authenticate(userInfo.email, userInfo.password, db, function(token) {
    console.log("2: " + token);

    if (token) reply({'token': token});
    else reply(Boom.unauthorized());
  });
};

var _authenticate = function(email, password, db, callback) {
  db.collection('users').findOne({'email':email}, function (err, user) {
    if (err) { callback(console.error(err)); return; }
    bcrypt.compare(password, user.password, function(err, res) {
        if (err) { callback(console.error(err)); return; }

        var token = jwt.sign({ }, superSecret, {
          subject: user._id.toString(),
          expiresIn: "24h"
        });
        console.log("1: " + token);

        callback(token);
        return;
    });
  });
}

module.exports = [
    {
      method: 'POST',
      path: '/users',
      handler: createUser,
      config: {
        cors: true
      }
    },
    {
      method: 'POST',
      path: '/users/authenticate',
      handler: authenticateUser,
      config: {
        cors: true
      }
    }
];
