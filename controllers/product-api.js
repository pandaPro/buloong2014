/* The API controller
Exports 3 methods:
* post - Creates a new thread
* list - Returns a list of threads
* show - Displays a thread and its posts
*/
 
var productModel = require('../models/product-model.js');

exports.getProductObject = function (obj) {
    console.log("productModel: "+obj);
    return(new productModel(obj));
}

exports.list = function (query, callback){
    productModel.find(query, function (err, products) {
        if(err){
            console.log("productlist: " + err);
            callback(err);
        }else{
            // console.log(products);
            callback("", products);
        }
    })// end product.find
}

exports.checkCode = function(query, callback) {
    productModel.findOne(query, function(error, item) {
        if(error) {
            console.log("error: " + error);
            callback(error);
        }
        else {
            // console.log(item);
            callback("", item);
        }
    });
}

exports.add = function(obj, callback) {
    console.log("product.add");
    try{
        obj.save(function(error, savedItem) {
            if(error) {
                callback(error);
            }
            else {

                callback("", savedItem);
            }
       });
    }
    catch(err){
        console.log("add exception");
        callback(err);
    }
}

exports.update = function(setJson, callback) {
    console.log("product.update");
    try{
        var query = {"_id": setJson._id};
        var setData = { $set: {"code": setJson.code,
                "salePrice": setJson.salePrice, 
                "status": setJson.status
            }
        };
        productModel.update(query, setData, function(err, saved){
            if (err){
                callback(err);
            }
            else {
                callback("", saved);
            }
        });
    }
    catch(err){
        console.log("update exception");
        callback(err);
    }
}
