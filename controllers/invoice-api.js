/* The API controller
Exports 3 methods:
* post - Creates a new thread
* list - Returns a list of threads
* show - Displays a thread and its posts
*/
 
var invoiceModel = require('../models/invoice-model.js');

exports.getInvoiceObject = function (obj) {
    var newInvoice = new invoiceModel(obj);
    return( newInvoice );
}

exports.list = function (query, sort, callback){
    invoiceModel.find(query).sort(sort).exec(function (err, invoices) {
        if(err){
            console.log("invoicelist: " + err);
            callback(err);
        }else{
            callback("", invoices);
        }
    })
}

exports.testReport = function (query, sort, callback){
    // invoiceModel.aggregate([
    //     {$match: query},
    //     {$project: {_id:0, orders:1, customer:1, createdDate: 1}},
    //     {$unwind: "$orders"},
    //     {
    //         $group: {
    //             _id: {customer: "$customer.id"},
    //             orders: {$push: "$orders"}
    //         }
    //     }
    //     ,{$sort: {_id: 1}}
    // ])
    // .exec(function (err, invoices) {
    //     if(err){
    //         console.log("sales report error: " + err);
    //         callback(err);
    //     }else{
    //         callback("", invoices);
    //     }
    // })
}

exports.report = function (query, sort, callback){
    invoiceModel.find(query).sort(sort).select('createdDate orders').exec(function (err, invoices) {
        if(err){
            console.log("report error: " + err);
            callback(err);
        }else{
            callback("", invoices);
        }
    })
}

exports.salesReportData = function (query, callback){
    try{
        invoiceModel.aggregate([
            {$match: query},
            {$project: {_id:0, orders:1}},
            {$unwind: "$orders"},
            {
                $group: {
                    _id: "$orders.code",
                    quantity : { $sum: "$orders.quantity"}
                    ,amount : { $sum: { $multiply: ["$orders.quantity", "$orders.salePrice"]}}
                }
            }
            ,{$sort: {_id: 1}}
        ])
        .exec(function (err, invoices) {
            if(err){
                console.log("sales report error: " + err);
                callback(err);
            }else{
                callback("", invoices);
            }
        })
    }
    catch(err){

    }
}

exports.addInvoice = function(obj, callback) {
    console.log("invoice.add");
    try{
        obj.save(function(error, savedItem) {
            if(error) {
                console.log(error);
                callback(error);
            }
            else {
                callback("", savedItem);
            }
       });
    }
    catch(err){
        console.log(err);
    }
}

exports.removeInvoice = function(query, callback) {
    console.log("invoice.remove");
    invoiceModel.findByIdAndRemove(query, function(error) {
        if(error) {
            callback(error, 0);
        }
        else {
            callback("", 1);
        }
   });
}

exports.addOrder = function(invoiceId, addJson, callback) {
    console.log("Add new order");
    var query = invoiceId;
    var setData = { $push: {
        "orders": addJson
    }};
    console.log(setData);
    addOrUpdateOrder(query, setData, callback);
}

exports.updateOrder = function(invoiceId, setJson, callback) {
    console.log("Update order");
    var query = {"_id": invoiceId, "orders.id": setJson.id};
    var setData = { $set: {
        "orders.$": setJson
    }};
    updateOrder(query, setData, callback);
}

function addOrUpdateOrder(id, setData, callback) {
    try{
        invoiceModel.findByIdAndUpdate(id, setData, {safe: true, upsert: true}, function(error, savedItem) {
            if(error) {
                callback(error);
            }
            else {
                var returnItem = savedItem.orders[savedItem.orders.length -1];
                console.log(returnItem);
                callback("", returnItem);
            }
       });
    }
    catch(err){
        console.log(err);
    }
}

function updateOrder(query, setData, callback) {
    try{
        invoiceModel.update(query, setData, function(error, savedItem) {
            if(error) {
                callback(error);
            }
            else {
                console.log(savedItem);
                callback("", savedItem);
            }
       });
    }
    catch(err){
        console.log(err);
    }
}

exports.removeOrder = function(invoiceId, pullJson, callback) {
    console.log("order.remove");
    var query = {"_id": invoiceId, "orders.id": pullJson.id};
    var pullData = { $pull: {
        "orders": pullJson
    }};
    updateOrder(query, pullData, callback);
}