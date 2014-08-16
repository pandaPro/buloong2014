var express = require('express');
var router = express.Router();
var api = require('../controllers/invoice-api.js');
var customerAPI = require('../controllers/customer-api.js');
var _ = require('underscore');
var exportXsl = require('../controllers/excel-builder.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('invoice', { title: 'locale' });
});

router.post('/add', function(req, res) {
    console.log(req.body.invoiceObject);
    //validation data
    try {
        var invoice = new api.getInvoiceObject(req.body.invoiceObject);
        invoice.validate(function(err) {
            if(err) {
                console.log(err);
                res.send(err);
            }
            else {
                //save data
                api.addInvoice(invoice, function(err, item) {
                    if (err) {
                        // console.log("===response error===");
                        // console.log(err.errors);
                        // if(err.errors._id) {
                        //     // add new order instead of new invoice
                        //     var invoiceId = err.errors._id;
                        //     var orderJson = invoice.orders;
                        //     addNewOrder(invoiceId, orderJson, res);
                        // }
                        // else{ 
                            console.log("put add order err: "+ err);
                            res.send({"error": "existed invoice!"});
                        // }
                        // res.send(err);
                    }
                    else {
                        console.log("response items: " + item);
                        res.json({message: "Added", item: item});
                    }
                })
            }
        });
    }
    catch(err) { 
        console.log("put err: "+ err);
        res.send(err);
    }
});

router.put('/:id/order/add', function(req, res) {
    console.log(req.body.orderObject);
    try {
        if(!req.params.id || !req.body.orderObject)
            res.send({status: 401, error: "invalid URL."});
        var invoiceId = req.params.id;
        var orderJson = req.body.orderObject;
        api.addOrder(invoiceId, orderJson, function(err, item) {
            if (err) {
                console.log("response err: " + err);
                res.send(err);
            }
            else {
                console.log("response item: " + item);
                res.json(200, {message: "Order Added", item: item});
            }
        })
    }
    catch(err) { 
        console.log("put add order err: "+ err);
        res.send(err);
    }
});

function addNewOrder(invoiceId, orderJson, res){
    try{
        api.addOrder(invoiceId, orderJson, function(err, item) {
            if (err) {
                console.log("response err: " + err);
                res.send(err);
            }
            else {
                console.log("response item: " + item);
                res.json(200, {message: "new order added", item: item});
            }
        })
    }
    catch(err){
        console.log("exception error: " + err);
        res.send(err);
    }
}

/// remove invoice
router.delete('/:id/remove', function(req, res) {
    try {
        if(!req.params.id)
            res.send({status: 401, error: "invalid URL."});
        var invoiceId = req.params.id;
        api.removeInvoice(invoiceId, function(err, item) {
            if (err) {
                console.log("response err: " + err);
                res.send(err);
            }
            else {
                console.log("response item: " + item);
                res.json(200, {message: "Removed", result: item});
            }
        })
    }
    catch(err) {
        console.log("delete err: "+ err);
        res.send(err);
    }
});

/// update order
router.put('/:id/order/update', function(req, res) {
    console.log(req.body.orderObject);
    try {
        var invoiceId = req.params.id;
        var updateOrderJson = req.body.orderObject;
        if(invoiceId) {
            api.updateOrder(invoiceId, updateOrderJson, function(err, item) {
                if (err) {
                    console.log("response err: " + err);
                    res.send(err);
                }
                else {
                    console.log("response items: " + item);
                    res.json(200, {message: "Updated", result: item});
                }
            })
        }
    }
    catch(err) { console.log("post err: "+ err); }
});

/// remove order in specific invoice
router.put('/:id/order/remove', function(req, res) {
    try {
        if(!req.params.id || !req.body.orderObject )
            res.send({status: 401, error: "invalid URL."});
        var invoiceId = req.params.id;
        var order = req.body.orderObject;
        // console.log(order);
        api.removeOrder(invoiceId, order, function(err, item) {
            if (err) {
                console.log("response err: " + err);
                res.send(err);
            }
            else {
                console.log("response item: " + item);
                res.json(200, {message: "Removed", result: item});
            }
        })
    }
    catch(err) {
        console.log("delete err: "+ err);
        res.send(err);
    }
});

router.put('/filter', function(req, res) {
    try {
        var filter = req.body.filterObject;
        var sort = {createdDate: 1};
        var customerJson = "";
        var queryString = {};
        var createdDateJson = {createdDate: {$gte: filter.fromDate , $lte: filter.toDate}};
        if(filter.customer.id){
            customerJson = {"customer.id": filter.customer.id};
        }
        _.extend(queryString, customerJson, createdDateJson);
        console.log(queryString);
        api.list(queryString, sort, function(err, items) {
            if (err) {
                console.log("response err: " + err);
                res.send(err);
            }
            else {
                // console.log("response items: " + items);
                res.json({data: items});
            }
        });
    }
    catch(err) { 
        console.log("filter err: "+ err);
        res.send(err);
    }
});

router.put('/export', function(req, res) {
    try {
        var filter = req.body.filterObject;
        var sort = {createdDate: 1};
        var customerJson = "";
        var queryString = {};
        var createdDateJson = {createdDate: {$gte: filter.fromDate , $lte: filter.toDate}};
        if(filter.customer.id){
            customerJson = {"customer.id": filter.customer.id};
            _.extend(queryString, customerJson, createdDateJson);
            console.log("=== export queryString ===");
            console.log(queryString);
            
            customerAPI.findCustomer({_id: filter.customer.id}, function(err, customer){
                if (err) {
                    console.log("response err: " + err);
                    res.send(err);
                }
                else{
                    var customerName = (customer) ? customer.name : "";
                    var discount = (customer.discount) ? customer.discount : 0;
                    api.report(queryString, sort, function(err, items) {
                        if (err) {
                            console.log("response err: " + err);
                            res.send(err);
                        }
                        else {
                            console.log("export items: " + items);
                            var exportData = {header: customerName, data: items, footer: {discount: discount}};
                            exportXsl.reportInvoices(exportData, customerName, function(error, callback){
                                if(error){
                                    res.send(error);
                                }
                                else{
                                    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl + '/excel/';
                                    console.log("===export callback===");
                                    var redirectUrl = fullUrl + callback.fname;
                                    console.log(redirectUrl);
                                    res.writeHead(301,
                                        {Location: redirectUrl}
                                    );
                                    res.end();
                                    
                                    //call back url
                                    //redirect to exported file
                                }
                            });
                        }
                    });
                }
            });
        }
        else{
            //response selection message
            res.send({message: "Please select a customer !!!"});
        }

    }
    catch(err) {
        console.log("export err: "+ err);
        res.json(err);
    }
});

router.put('/export/excel/', function(req, res){
    res.render('export', { title: 'export report'});
});

module.exports = router;
