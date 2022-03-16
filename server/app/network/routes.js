const routesDryBox = require('../modules/DryBox/routes');

const routes = function (server) {
    server.use('/', routesDryBox);
}

module.exports = routes;