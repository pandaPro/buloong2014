var express = require('express');
var LocalStrategy = require('passport-local').Strategy;
var router = express.Router();
var passport = require('passport');
var api = require('../controllers/user-api.js');

/* GET home page. */
router.get('/login', function(req, res) {
    res.render('login', { title: 'Log me in', message: req.flash('loginMessage') });
});

// router.post('/login', function(req, res, next){
//     try{
//         var username = req.body.username;
//         var password = req.body.password;
//         console.log("req.body.password=" + password);
//         console.log("req.body.username=" + username);
//         // console.log("passport=" + passport);
//         // passport.authenticate('local', { successRedirect: '/profile',
//         //                            failureRedirect: '/',
//         //                            failureFlash: true });
//         passport.use(new LocalStrategy(function(username, password, done) {
//             process.nextTick(function() {
//                 console.log("Auth Check Logic");
//                 api.login()
//                 res.redirect('/profile');
//             });
//         }));
//         res.send("login failed");
//     }
//     catch(err){
//         console.log(err);
//         res.send(err);
//     }
// });
router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

router.get('/signup', function(req, res){
    res.render('register', { title: 'Sign up' });
});

// router.post('/signup', function(req, res, next){
//     try{
//         console.log("req.body.password=" + req.body.password);
//         console.log("req.body.username=" + req.body.username);
//         var username = req.body.username;
//         var password = req.body.password;
//         // var user = api.getUserObject({username: username, password: password});
//         // api.register(user, function(err, item){
//         //     if(err){
//         //         res.send("register error");
//         //     }
//         //     res.json({message: "registered"});
//         // });
//         res.send("register failed");
//     }
//     catch(err){
//         console.log(err);
//         res.send(err);
//     }
// });

router.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages)
}));

// =====================================
// PROFILE SECTION =====================
// =====================================
// we will want this protected so you have to be logged in to visit
// we will use route middleware to verify this (the isLoggedIn function)
router.get('/profile', isLoggedIn, function(req, res, next) {
    res.render('profile', {
        user : req.user // get the user out of session and pass to template
    });
});

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;
