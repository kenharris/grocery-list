'use strict';

const Hapi = require('hapi');
var dbOpts = {
    "url": "mongodb://groceryListUser:Gr0c3ryL15tPa55w0rd@localhost:27017/grocery",
    "settings": {
        "db": {
            "native_parser": false
        }
    }
};

const server = new Hapi.Server();
server.register({
    register: require('hapi-mongodb'),
    options: dbOpts
}, function (err) {
    if (err) {
        console.error(err);
        throw err;
    }

    server.connection({ port: 3002 });
    server.route(require('./routes'));

    server.start((err) => {
        if (err) {
            throw err;
        }
        console.log(`Server running at: ${server.info.uri}`);
    });
});
