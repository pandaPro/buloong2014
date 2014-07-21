var express = require('express');
var LocalStrategy = require('passport-local').Strategy;
var router = express.Router();
// var api = require('../controllers/user-api.js');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('login', { title: 'Log me in' });
});

router.post('/', function(req, res, passport){
    // api.login(req.username, req.password);
    console.log("req.body.password=" + req.body.password);
    console.log("req.body.username=" + req.body.username);
    // console.log("passport=" + passport);
    // passport.authenticate('local', { successRedirect: '/',
    //                            failureRedirect: '/login',
    //                            failureFlash: true });
    res.render('login', { title: 'Log me in' });
});

module.exports = router;
