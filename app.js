var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var i18n = require("i18next");
var passport = require('passport');
var flash = require('connect-flash');
var db = require('./models/db');

var app = express();

i18n.init({
    lng: 'en-US',
    preload: ['en-US', 'de-DE'],
    locales: ['en', 'de'],
    supportedLngs: ['en', 'de'],
    directory: __dirname + '/views/locales',
    detectLngQS: 'lang',
    ignoreRoutes: ['images/', 'public/', 'css/', 'js/'],
    resSetPath: 'views/locales/__lng__/__ns__.json',
    //ns: { namespaces: ['ns.common', 'ns.special'], defaultNs: 'ns.special'},
    sendMissingTo: 'fallback'
});

// .serveClientScript(app)
// .serveDynamicResources(app)
// .serveMissingKeyRoute(app);

// i18n.serveWebTranslate(app, {
    // i18nextWTOptions: {
      // languages: ['de-DE', 'en-US',  'dev'],
      // // namespaces: ['ns.common', 'ns.special'],
      // resGetPath: "locales/resources.json?lng=__lng__&ns=__ns__",
      // resChangePath: 'locales/change/__lng__/__ns__',
      // resRemovePath: 'locales/remove/__lng__/__ns__',
      // fallbackLng: "dev",
      // dynamicLoad: true
    // }
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(i18n.handle); // have i18n before app.router

// required for passport
// app.use(express.session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// Make our db accessible to our router
// app.use(function(req, res, next){
    // req.db = db;
    // next();
    // console.log("Make our db accessible to our router");
// });

var routes = require('./app/routes')(app, passport);
// var routes = require('./routes');
// var customers = require('./routes/customers');
// var login = require('./routes/login');
// var about = require('./routes/about');
// var locale = require('./routes/locale');

// app.use('/', routes);
// app.use('/customer', customers);
// app.get('/login', login);
// app.get('/locale', locale);
// app.get('/about', about);

i18n.registerAppHelper(app);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
