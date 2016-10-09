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
    return null;
  });

  var saltRounds = 10;
  bcrypt.genSalt(saltRounds, function(err, salt) {
    if (err) return console.error(err);
    bcrypt.hash(userInfo.password, salt, function(err, hash) {
      userInfo.password = hash;
      var token = jwt.sign({'email': userInfo.email}, superSecret, {
        expiresIn: "24h"
      });
      userInfo.token = token;
      console.log(userInfo);
      console.log(token);
      db.collection('users').insert(userInfo, function(err, user) {
        if (err) return console.error(err);
        console.log(user);
        reply({'token': token});
      }); 
    });
  });

  Boom.unauthorized();
};

var authenticateUser = function(request, reply) {
  var db = request.server.plugins['hapi-mongodb'].db;
  var userInfo = JSON.parse(request.payload);

  db.collection('users').findOne({'email':userInfo.email}, function (err, user) {
    if (err) return console.error(err);
    console.log(user);
    bcrypt.compare(userInfo.password, user.password, function(err, res) {
        if (err) return console.error(err);
        if (res) reply({'token': user.token});
        else reply(Boom.unauthorized());
    });
  });
};

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
