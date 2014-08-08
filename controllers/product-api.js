/* The API controller
Exports 3 methods:
* post - Creates a new thread
* list - Returns a list of threads
* show - Displays a thread and its posts
*/
 
var productModel = require('../models/product-model.js');
var productList = productModel.listProducts;

exports.getProductObject = function (obj) {
    console.log("productModel: "+obj);
    return( new productModel(obj) );
}

exports.getProductList = function () {
    return( new productList);
}

exports.list = function (query, callback){
    productModel.find(query, function (err, products) {
        if(err){
            console.log("productlist: " + err);
            callback(err);
        }else{
            console.log(products);
            callback("", products);
        }
    })// end product.find
}// end exports.productlist

// first locates a thread by title, then locates the replies by thread ID.
exports.checkCode = function(query, callback) {
    productModel.findOne(query, function(error, item) {
        if(error) {
            console.log("error: " + error);
            callback(error);
        }
        else {
            console.log(item);
            callback("", item);
        }
    });
}

exports.add = function(obj, callback) {
    console.log("product.add");
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
    console.log("product.update");
    console.log(obj);
    productModel.findById(obj._id, function(err, item){
        if (err){
            callback(err, null);
        }
        else {
            item.code = obj.code;
            item.format = obj.format;
            item.length = obj.length;
            item.type = obj.type;
            item.salePrice = obj.salePrice;
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
