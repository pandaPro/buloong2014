var express = require('express');
var router = express.Router();
var api = require('../controllers/invoice-api.js');
var customerAPI = require('../controllers/customer-api.js');
var _ = require('underscore');
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('sales-summary', { title: 'Sales Summary' });
});

router.put('/', function(req, res) {
    try {
        var filter = req.body.filterObject;
        var sort = {createdDate: 1};
        var customerJson = "";
        var queryString = {};
        var createdDateJson = {createdDate: {$gte: filter.fromDate , $lte: filter.toDate}};
        // if(filter.customer.id){
        //     customerJson = {"customer.id": filter.customer.id};
        // }
        _.extend(queryString, createdDateJson);
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

module.exports = router;
