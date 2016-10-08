var uuid = require('uuid');

var getLists = function(request, reply) {
  var db = request.server.plugins['hapi-mongodb'].db;
  db.collection('users').findOne({}, function (err, grocLists) {
    if (err) return console.error(err);
    reply(grocLists);
  });
};

var createList = function(request, reply) {
  var db = request.server.plugins['hapi-mongodb'].db;
  const listName = JSON.parse(request.payload).listName;

  db.collection('users').findOne({}, function (err, user) {
    if (err) return console.error(err);
    user.lists.push({id: uuid.v4(), name: listName});
    db.collection('users').update({}, user, {upsert: true});
    reply(user);
  });
};

var removeList = function(request, reply) {
  var db = request.server.plugins['hapi-mongodb'].db;
  const listId = request.params.listId;

  db.collection('users').findOne({}, function (err, user) {
    if (err) return console.error(err);
    user.lists = user.lists.filter(function(thisList) {
      return thisList.id != listId;
    });
    db.collection('users').update({}, user);
    reply(user);
  });
};

var addItemToList = function(request, reply) {
  var db = request.server.plugins['hapi-mongodb'].db;
  const listId = request.params.listId;
  var newItem = request.payload;
  if (!newItem.id || newItem.id == null || newItem.id.length == 0) {
    newItem.id = uuid.v4();
  }

  db.collection('users').findOne({}, function (err, user) {
    if (err) return console.error(err);
    user.lists.forEach(function(userList) {
      if (userList.id === listId) {
        if (!userList.items) { userList.items = []; }
        userList.items.push(newItem);
      } 
    });
    db.collection('users').update({}, user, {upsert: true});
    reply(user);
  });
};

var removeItemFromList = function(request, reply) {
  var db = request.server.plugins['hapi-mongodb'].db;

  const listId = request.params.listId;
  const itemId = request.params.itemId;

  db.collection('users').findOne({}, function (err, user) {
    if (err) return console.error(err);
    user.lists.forEach(function(userList) {
      if (userList.id === listId) {
        console.log(userList.items);
        userList.items = userList.items.filter(function(listItem) {
          return listItem.id !== itemId; 
        });
      } 
    });
    db.collection('users').update({}, user, {upsert: true});
    reply(user);
  });
};

var updateItemInList = function(request, reply) {
  var db = request.server.plugins['hapi-mongodb'].db;

  const listId = request.params.listId;
  const itemId = request.params.itemId;

  var groceryListItem = request.payload;

  db.collection('users').findOne({}, function (err, user) {
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
            
    db.collection('users').update({}, user, {upsert: true});
    reply(user);
  });
};

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
