/* The API controller
Exports 3 methods:
* post - Creates a new thread
* list - Returns a list of threads
* show - Displays a thread and its posts
*/
 
 
var CustomerModel = require('../models/customer-model.js');
var CustomerList = CustomerModel.listCustomers;

exports.getCustomerObject = function (obj) {
    console.log("customerModel: "+obj);
    return( new CustomerModel(obj) );
}

exports.getCustomerList = function () {
    return( new CustomerList);
}


exports.customerlist = function (callback){
    CustomerModel.find({}, function (err, customers) {
        if(err){
            console.log("customerlist: " + err);
        }else{
            console.log(customers);
            callback("", customers);
        }
    })// end Customer.find
}// end exports.customerlist

// first locates a thread by title, then locates the replies by thread ID.
exports.show = (function(req, res) {
    CustomerModel.findOne({name: req.params.name}, function(error, item) {
        res.send([{customer: item}]);
    });
});

exports.add = function(obj, callback) {
    console.log("customer.add");
    obj.save(function(error, savedItem) {
        if(error)
            callback(error);
        else
            callback("", savedItem);
        // res.send();
   });
}

exports.update = function(obj, callback) {
    console.log("customer.update");
    obj.save(function(error, savedItem) {
        if(error)
            callback(error);
        else
            callback("", savedItem);
        // res.send();
   });
}
