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
    // var list;
    // api.customerlist(function(err, items){
    //     if (err)
    //         res.send(err);
    //     list = items;
    // });
    // res.render('customer', { title: 'Customers list', list : list});
    res.render('customer', { title: 'Customers list'});
});

router.get('/list', function(req, res) {
    api.customerlist(function(err, data){
        if (err)
            res.send(err);
        res.json(data);
    });
});

router.get('/check/:name', function(req, res) {
    var name = req.params.name;
    api.customerlist(function(err, data){
        if (err)
            res.send(err);
        res.json(data);
    });
});

router.post('/add', function(req, res) {
    console.log(req.body.customerObject);
    //validation data
    try {
        var customer = new api.getCustomerObject(req.body.customerObject);
        customer.validate(function(error) {
            if(error) {
                console.log(error);
                res.json({error: error});
            }
            else {
                //save data
                api.add(customer, function(err, item) {
                    if (err) {
                        console.log("response error: " + err);
                        res.json({error: err});
                    }
                    else {
                        console.log("response item: " + item);
                        res.json({message: "added", item: item});
                    }
                })
            }
        });
    }
    catch(err) { console.log("post error: "+ err); }
});


/*
 * PUT to update customer.
 */
router.put('/update/:id', function(req, res) {
    var id = req.params.id;
    try {
        var customer = new api.getCustomerObject(req.body.updateCustomerObject);
        customer.validate(function(error) {
            if(error) {
                res.json({ error: error });
            } else {
                //save data
                api.update(customer, function(err, savedItem) {
                    if (err) {
                        console.log(err);
                        res.send(err);
                    }
                    else {
                        console.log("saveditem="+ savedItem);
                        res.json({message: "Updated"});
                    }
                })
            }
        });
    }
    catch(err) { console.log("post error: "+ err); }
});

/*
 * DELETE to delete customer.
 */
router.delete('/delete/:id', function(req, res) {

});

module.exports = router;