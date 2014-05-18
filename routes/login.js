var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login', function(req, res) {
    res.render('login', { title: 'Log me in' });
});

module.exports = router;
