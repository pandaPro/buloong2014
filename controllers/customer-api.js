/* The API controller
Exports 3 methods:
* post - Creates a new thread
* list - Returns a list of threads
* show - Displays a thread and its posts
*/
 
 
var customerModel = require('../models/customer-model.js');
var customerList = customerModel.listCustomers;

exports.getCustomerObject = function (obj) {
    console.log("customerModel: "+obj);
    return( new customerModel(obj) );
}

exports.getCustomerList = function () {
    return( new customerList);
}


exports.customerlist = function (callback){
    customerModel.find({}, function (err, customers) {
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
    customerModel.findOne({name: req.params.name}, function(error, item) {
        res.send([{customer: item}]);
    });
});

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

exports.update = function(obj, callback) {
    console.log("customer.update");
    console.log(obj);
    customerModel.findById(obj._id, function(err, item){
        if (err){
            callback(err, null);
        }
        else {
            item.name = obj.name;
            item.address = obj.address;
            item.phone = obj.phone;
            item.status = obj.status;
            item.save(function(error, savedItem) {
                if(error)
                    callback(error);
                else
                    callback("", savedItem);
            })
        }
    });
}
