var express = require('express');
var api = require('../controllers/config-api.js');
var router = express.Router();

/* GET configs listing. */
router.get('/', function(req, res) {
    // var db = req.db;
    // db.collection('configs').find().toArray(function (err, items) {
        // if (err)
            // res.send(err);
        // res.json(items);
    // });
    res.render('config', { title: 'configs list'});
});

router.get('/list', function(req, res) {
    // var db = req.db;
    // db.collection('configs').find().toArray(function (err, items) {
        // if (err)
            // res.send(err);
        // res.json(items);
    // });
    api.configlist(function(err, items){
        if (err)
            res.send(err);
        res.json(items);
    });
});

router.post('/add', function(req, res) {
    //validation data
    //save data
    console.log(req.body);
});

/*
 * DELETE to delete config.
 */
router.delete('/delete/:id', function(req, res) {

});

module.exports = router;