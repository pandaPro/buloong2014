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
    // var customerList = new api.getCustomerList();
    // console.log("customerList= " + customerList);
    var list;
    api.customerlist(function(err, items){
        if (err)
            res.send(err);
        list = items;
    });
    res.render('customer', { title: 'Customers list', list : list});
});

router.get('/list', function(req, res) {
    api.customerlist(function(err, items){
        if (err)
            res.send(err);
        res.json(items);
    });
});

router.post('/add', function(req, res) {
    console.log(req.body.customerObject);
    //validation data
    try {
        var customer = new api.getCustomerObject(req.body.customerObject);
        customer.validate(function(error) {
            if(error) {
                res.json({ error: error });
            } else {
                res.render('customer', { success: 'Customer added'});
            }
            //save data
            api.add(customer, function(err, items) {
                if (err)
                    res.send(errs);
                res.json(items);
            })
        });
    }
    catch(err) { console.log("post error: "+ err); }
    res.send({ error: 'Customers add post'});
});


/*
 * PUT to update customer.
 */
router.put('/update/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);
    try {
        var customer = new api.getCustomerObject(req.body.updateCustomerObject);
        customer.validate(function(error) {
            if(error) {
                res.json({ error: error });
            } else {
                res.render('customer', { success: 'Customer added'});
            }
            //save data
            api.update(customer, function(err, savedItem) {
                if (err)
                    res.send(errs);
                res.json({success: "saved", item: savedItem});
            })
        });
    }
    catch(err) { console.log("post error: "+ err); }
    res.send({ error: 'Customers add post'});
    // res.render('customer', { title: 'Customers list'});
});

/*
 * DELETE to delete customer.
 */
router.delete('/delete/:id', function(req, res) {

});

module.exports = router;