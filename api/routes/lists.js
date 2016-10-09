var uuid = require('uuid');
var jwt = require('jsonwebtoken');
var Boom = require('boom');

var superSecret = 'Th1515@P@55w0rdS3cr3t';

var getLists = function(request, reply) {
  var db = request.server.plugins['hapi-mongodb'].db;
  var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;

  verifyToken(request, function(_id) {
    if (!_id || _id === null) { reply(Boom.unauthorized()); }

    db.collection('users').findOne({ '_id': new ObjectID(_id) }, function (err, grocLists) {
      if (err) return console.error(err);
      reply(grocLists);
      return;
    });
  });
};

var createList = function(request, reply) {
  var db = request.server.plugins['hapi-mongodb'].db;
  var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;

  const listName = JSON.parse(request.payload).listName;

  verifyToken(request, function(_id) {
    if (!_id || _id === null) { reply(Boom.unauthorized()); return; }
    
    db.collection('users').findOne({ '_id': new ObjectID(_id) }, function (err, user) {
      if (err) return console.error(err);
      if (!user.lists) { user.lists = []; }
      user.lists.push({id: uuid.v4(), name: listName});
      db.collection('users').update({ '_id': new ObjectID(_id) }, user, {upsert: true});
      reply(user);
    });
  });
};

var removeList = function(request, reply) {
  var db = request.server.plugins['hapi-mongodb'].db;
  var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;

  const listId = request.params.listId;
  verifyToken(request, function(_id) {
    if (!_id || _id === null) { reply(Boom.unauthorized()); }
    
    db.collection('users').findOne({ '_id': new ObjectID(_id) }, function (err, user) {
      if (err) return console.error(err);
      user.lists = user.lists.filter(function(thisList) {
        return thisList.id != listId;
      });
      db.collection('users').update({ '_id': new ObjectID(_id) }, user);
      reply(user);
    });
  });
};

var addItemToList = function(request, reply) {
  var db = request.server.plugins['hapi-mongodb'].db;
  var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;

  const listId = request.params.listId;
  var newItem = request.payload;
  if (!newItem.id || newItem.id == null || newItem.id.length == 0) {
    newItem.id = uuid.v4();
  }

  verifyToken(request, function(_id) {
    if (!_id || _id === null) { reply(Boom.unauthorized()); return; }
    
    db.collection('users').findOne({ '_id': new ObjectID(_id) }, function (err, user) {
      if (err) return console.error(err);
      user.lists.forEach(function(userList) {
        if (userList.id === listId) {
          if (!userList.items) { userList.items = []; }
          userList.items.push(newItem);
        } 
      });
      db.collection('users').update({ '_id': new ObjectID(_id) }, user, {upsert: true}); 
      reply(user);
    });
  });
};

var removeItemFromList = function(request, reply) {
  var db = request.server.plugins['hapi-mongodb'].db;
  var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;

  const listId = request.params.listId;
  const itemId = request.params.itemId;

  verifyToken(request, function(_id) {
    if (!_id || _id === null) { reply(Boom.unauthorized()); return; }
    
    db.collection('users').findOne({ '_id': new ObjectID(_id) }, function (err, user) {
      if (err) return console.error(err);
      user.lists.forEach(function(userList) {
        if (userList.id === listId) {
          userList.items = userList.items.filter(function(listItem) {
            return listItem.id !== itemId; 
          });
        } 
      });
      db.collection('users').update({ '_id': new ObjectID(_id) }, user, {upsert: true});
      reply(user);
    });
  });
};

var updateItemInList = function(request, reply) {
  var db = request.server.plugins['hapi-mongodb'].db;
  var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;

  const listId = request.params.listId;
  const itemId = request.params.itemId;

  var groceryListItem = request.payload;

  verifyToken(request, function(_id) {
    if (!_id || _id === null) { reply(Boom.unauthorized()); return; }
    
    db.collection('users').findOne({ '_id': new ObjectID(_id) }, function (err, user) {
      if (err) return console.error(err);
      
      user.lists.some(function(thisList) {
        if (thisList.id === listId) {
          thisList.items = thisList.items.filter(function(thisItem) {
            return thisItem.id !== itemId;
          });
          thisList.items.push(groceryListItem);
          return true;
        }
      });
              
      db.collection('users').update({ '_id': new ObjectID(_id) }, user, {upsert: true});
      reply(user);
    });
  });
};

var verifyToken = function(request, callback) {
  const token = request.headers.authorization; 
  jwt.verify(token, superSecret, function(err, decoded) {
    callback(decoded.sub);
  });
}

module.exports = [
    {
      method: 'GET',
      path: '/lists',
      handler: getLists,
      config: {
        cors: true
      }
    },
    {
      method: 'POST',
      path: '/lists',
      handler: createList,
      config: {
        cors: true
      }
    },
    {
      method: 'DELETE',
      path: '/lists/{listId}',
      handler: removeList,
      config: {
        cors: true
      }
    },
    {
      method: 'POST',
      path: '/lists/{listId}',
      handler: addItemToList,
      config: {
        cors: true
      }
    },
    {
      method: 'DELETE',
      path: '/lists/{listId}/{itemId}',
      handler: removeItemFromList,
      config: {
        cors: true
      }
    },
    {
      method: 'PUT',
      path: '/lists/{listId}/{itemId}',
      handler: updateItemInList,
      config: {
        cors: true
      }
    }
];
