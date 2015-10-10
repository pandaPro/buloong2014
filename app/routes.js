// // app/routes.js
module.exports = function(app, passport, localStrategy) {
    // console.log("routes:" + app);
    var routes = require('../routes');
    var customers = require('../routes/customers');
    var config = require('../routes/configs');
    var product = require('../routes/products');
    var invoice = require('../routes/invoices');
    var user = require('../routes/user');
    var salesSummary = require('../routes/sales-summary');
    var passport = require('../app/passport');

    app.use('/', routes);
    app.use('/customer', customers);
    app.use('/config', config);
    app.use('/product', product);
    app.use('/user', user);
    app.use('/invoice', invoice);
    app.use('/sales-summary', salesSummary);
};
