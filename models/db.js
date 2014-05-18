// Database
var mongoose = require('mongoose');
//var db = mongo.db("localhost:27017/myapp", {native_parser:true});
var db = mongoose.connect("mongodb://admin:blAty2014@ds031627.mongolab.com:31627/buloong2014", {native_parser:true});