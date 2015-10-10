var db = require('../models/db');
var assert = require('assert');
var api = require('../controllers/invoice-api.js');


//bdd test
// describe("Add Invoice", function() {
//     describe("#save()", function(){
//       it("add new invoice but already in db", function(done) {
//         var jsonData = {
//             createdDate: "2014-08-06T16:54:27.554Z"
//             // , _id: "53e25e07b427288c13190ac7"
//             , orders:{code: "B610", quantity: 1000, salePrice: 100}
//             , customer: {id: "53ddf0acac43fcfc1cee72d8"}
//         };
//         var invoice = api.getInvoiceObject(jsonData);
//         api.add(invoice, function(err, item) {
//             if (err) {
//                 console.log("response err: " + err);
//             }
//             else {
//                 console.log("response items: " + item);
//             }
//             done();
//         })
//       })
//     })
// });

// var query = {};
var query = {createdDate:{$gte: new Date("2014-09-06T04:00:00Z"), $lte: new Date('2014-09-07T04:00:00Z')}};
// var query = {_id: '53e089ad6318eaec22996875'};
// var query = {'customer.id': '53d69a42e365fef40252ce63'};
// var query = {'orders.code': 'X620'};

// api.salesReportData(query, null, function(err, invoices){
//     console.log(invoices);
// })

api.testReport(query, null, function(err, invoices){
    console.log(invoices);
})
