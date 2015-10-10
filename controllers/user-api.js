var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user-model.js');

exports.getUserObject = function (obj) {
    console.log("user: "+obj);
    return(new User(obj));
}

exports.login = function(username, password, callback) {
    User.getAuthenticated(username, password, function(err, item){
        if(err){
            console.log("authen error: " + err);
            callback(err);
        }else{
            callback("", item);
        }
    })
};

exports.register = function(userObj, callback){
    try{
        userObj.save(function(err, saved){
            if(err){
                console.log("user error: " + err);
                callback(err);
            }else{
                callback("", saved);
            }
        })
    }
    catch(err){
        console.log("user exception: " + err);
        callback(err);
    }
};