/* The API controller
Exports 3 methods:
* post - Creates a new thread
* list - Returns a list of threads
* show - Displays a thread and its posts
*/
 
 
var ConfigModel = require('../models/config-model.js');
// var configList = ConfigModel.listconfigs;

exports.getconfigObject = function (obj) {
    console.log("configModel: "+obj);
    return( new ConfigModel(obj) );
}

exports.list = function (callback){
    ConfigModel.find({}, function (err, configs) {
        if(err){
            console.log("configlist: " + err);
        }else{
            console.log(err);
            callback("", configs);
        }
    })// end config.find
}// end exports.configlist

exports.findConfigByName = (function(name, callback) {
    ConfigModel.findOne({name: name}, function(error, item) {
        if(error)
            callback(error);
        else
            callback("",item);
    });
});

exports.add = function(obj, callback) {
    console.log("config.add");
    obj.save(function(error, savedItem) {
        if(error){
            console.log("ERR: " + error);
            callback(error);
        }
        else
            callback("", savedItem);
   });
}

exports.update = function(obj, callback) {
    console.log("config.update");
    obj.save(function(error, savedItem) {
        if(error){
            console.log("ERR: " + error);
            callback(error);
        }
        else
            callback("", savedItem);
   });
}
