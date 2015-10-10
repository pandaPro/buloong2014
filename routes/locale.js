var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/locale', function(req, res) {
  res.render('locale', { title: 'locale' });
});

module.exports = router;
