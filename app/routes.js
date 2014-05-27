// // app/routes.js
module.exports = function(app, passport) {
    // console.log("routes:" + app);
    var routes = require('../routes');
    var customers = require('../routes/customers');
    var config = require('../routes/configs');
    var product = require('../routes/products');
    var login = require('../routes/login');
    var about = require('../routes/about');
    var locale = require('../routes/locale');

    app.use('/', routes);
    app.use('/customer', customers);
    app.use('/config', config);
    app.use('/product', product);
    app.use('/login', login);
    
    app.get('/invoice', about);
    app.get('/logout', about);
    app.get('/about', about);
    
	// // =====================================
	// // HOME PAGE (with login links) ========
	// // =====================================
	// app.get('/', function(req, res) {
		// res.render('index.ejs'); // load the index.ejs file
	// });

	// // =====================================
	// // LOGIN ===============================
	// // =====================================
	// // show the login form
	// app.get('/login', function(req, res) {
		// // render the page and pass in any flash data if it exists
		// res.render('login.ejs', { message: req.flash('loginMessage') }); 
	// });

	// // process the login form
	// // app.post('/login', do all our passport stuff here);

	// // =====================================
	// // SIGNUP ==============================
	// // =====================================
	// // show the signup form
	// app.get('/signup', function(req, res) {

		// // render the page and pass in any flash data if it exists
		// res.render('signup.ejs', { message: req.flash('signupMessage') });
	// });

	// // process the signup form
	// // app.post('/signup', do all our passport stuff here);

	// // =====================================
	// // PROFILE SECTION =====================
	// // =====================================
	// // we will want this protected so you have to be logged in to visit
	// // we will use route middleware to verify this (the isLoggedIn function)
	// app.get('/profile', isLoggedIn, function(req, res) {
		// res.render('profile.ejs', {
			// user : req.user // get the user out of session and pass to template
		// });
	// });

	// // =====================================
	// // LOGOUT ==============================
	// // =====================================
	// app.get('/logout', function(req, res) {
		// req.logout();
		// res.redirect('/');
	// });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}