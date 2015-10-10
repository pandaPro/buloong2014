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
        var customerJson = "";
        var queryString = {};
        var createdDateJson = {createdDate: {$gte: new Date(filter.fromDate) , $lte: new Date(filter.toDate) }};
        // if(filter.customer.id){
        //     customerJson = {"customer.id": filter.customer.id};
        // }
        _.extend(queryString, createdDateJson);
        console.log(queryString);
        console.log(filter.type);
        api.salesReportData(queryString, filter.type, function(err, items) {
            if (err) {
                console.log("response err: " + err);
                res.send(err);
            }
            else {
                console.log("summary report response items: " + items);
                res.json({data: items});
            }
        });
    }
    catch(err) { 
        console.log("filter err: "+ err);
        res.send(err);
    }
});

module.exports = router;
