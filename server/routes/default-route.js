    
var sendResCode = require('../sendResCode');

function defaultRoute(req, res) {

    sendResCode(404, res, "<h1>Error: Resource not found</h1>");

}

module.exports = defaultRoute;