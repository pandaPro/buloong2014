var express = require('express');
var LocalStrategy = require('passport-local').Strategy;
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    // passport.authenticate('local', { successRedirect: '/profile', failureRedirect: '/login' });
    res.render('login', { title: 'Log me in' });
});

router.post('/', function(req, res, passport){
    console.log("passport=" + passport);
    passport.authenticate('local', { successRedirect: '/',
                               failureRedirect: '/',
                               failureFlash: true });
});

module.exports = router;
