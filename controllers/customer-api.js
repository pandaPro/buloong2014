/* The API controller
Exports 3 methods:
* post - Creates a new thread
* list - Returns a list of threads
* show - Displays a thread and its posts
*/
 
var customerModel = require('../models/customer-model.js');
var customerList = customerModel.listCustomers;

exports.getCustomerObject = function (obj) {
    console.log(obj);
    return( new customerModel(obj) );
}

exports.getCustomerList = function () {
    return( new customerList);
}

exports.customerlist = function (query, returnFields, sort, callback){
    customerModel.find(query).select(returnFields).exec(function (err, customers) {
        if(err){
            console.log("customerlist: " + err);
            callback(err);
        }else{
            // console.log(customers);
            callback("", customers);
        }
    })// end Customer.find
}// end exports.customerlist

exports.findCustomer = function (query, callback){
    customerModel.findOne(query, function (err, customer) {
        if(err){
            console.log("customer: " + err);
            callback(err);
        }else{
            console.log(customer);
            callback("", customer);
        }
    })// end Customer.find
}// end exports.customerlist

exports.add = function(obj, callback) {
    console.log("customer.add");
    obj.save(function(error, savedItem) {
        if(error) {
            callback(error);
        }
        else {

            callback("", savedItem);
        }
   });
}

exports.update = function(setJson, callback) {
    console.log("customer.update");
    console.log(setJson);
    var query = {"_id": setJson._id};
    var address = (!setJson.address) ? "" : setJson.address;
    var phone = (!setJson.phone) ? "" : setJson.phone;
    var discount = (!setJson.discount) ? 0 : setJson.discount;
    var status = (!setJson.status) ? 0 : setJson.status;
    var setData = { $set: {"name": setJson.name,
            "address": address, 
            "phone": phone, 
            "discount": discount,
            "status": status
        }
    };
    customerModel.update(query, setData, function(error, saved){
        if(error) {
            callback(error);
        }
        else {
            callback("", saved);
        }
    });
}
