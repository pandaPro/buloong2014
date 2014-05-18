var myApp = angular.module('myApp', []);
/*var app = angular.module("twitterApp", []);

app.controller("AppCtrl", function($scope) {
    $scope.loadMoreTweets = function() {
        alert("Loading tweets!");
    }

    $scope.deleteTweets = function() {
        alert("deleting tweets");
    }
})

app.directive("enter", function() {
    return function(scope, element, attrs) {
        element.bind("mouseenter", function() {
            scope.$apply(attrs.enter)
        })
    }
})
*/

myApp.factory('Data', function() {
    return {id:"1", message: "I'm data from a service"};
})

myApp.filter('reverse', function(Data) {
    return function(text) {
      return text.split("").reverse().join("") + Data.message;
  }
})

function calculateInvoiceTotal($scope)
{
    
}

function aboutCtrl($scope, Data) {
    $scope.data = Data;
}

function aboutCtrl2($scope, Data) {
    //$scope.data = {message: "Hello"};
    $scope.reversedMessage = function(message) {
        return message.split("").reverse().join("");
    }
    
    $scope.multiple = function(quantity, price) {
        return quantity * price;
    }
    
    $scope.calculateInvoiceTotal = function(message) {
        return message.split("").reverse().join("");
    }
}
