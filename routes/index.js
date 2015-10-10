var express = require('express');
var router = express.Router();

/* GET home page. */
// if not login, redirect to login page
// else redirect to dashboard
router.get('/', function(req, res) {
  res.render('login', { title: 'Login' });
});

module.exports = router;
