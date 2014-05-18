var express = require('express');
var api = require('../controllers/customer-api.js');
var router = express.Router();

/* GET customers listing. */
router.get('/', function(req, res) {
    // var db = req.db;
    // db.collection('customers').find().toArray(function (err, items) {
        // if (err)
            // res.send(err);
        // res.json(items);
    // });
    res.render('customer', { title: 'Customers list'});
});

router.get('/list', function(req, res) {
    // var db = req.db;
    // db.collection('customers').find().toArray(function (err, items) {
        // if (err)
            // res.send(err);
        // res.json(items);
    // });
    api.customerlist(function(err, items){
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
 * DELETE to delete customer.
 */
router.delete('/delete/:id', function(req, res) {

});

module.exports = router;