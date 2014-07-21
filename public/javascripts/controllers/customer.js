'use strict';
var url = "/customer/";

function customerController($scope, $http) {
    $scope.editorEnabled = false;
    $scope.list = {};

    // when landing on the page, get all customers and show them
    $http.get(url+'list')
        .success(function(data) {
            $scope.list = data;
            // alert(data);
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createCustomer = function(objModel) {
        console.log(objModel.$valid);
        if(objModel.$valid) {
            $http.post(url+'add', { customerObject: $scope.newCustomer })
                .success(function(data) {
                    // $scope.customerModel = {}; // clear the form so our user is ready to enter another
                    $scope.newCustomer = {};
                    $scope.list.push(data.item);
                    $scope.message = data.message;
                    console.log(data);
                })
                .error(function(data) {
                    $scope.message = data.error;
                    alert(data);
                    console.log('Error: ' + data);
            });
        }
    };
    
    //
    $scope.edit = function (id) {
        console.log("id:"+id);
        for (i in $scope.list) {
            if ($scope.list[i]._id == id) {
                $scope.editCustomer = angular.copy($scope.list[i]);
                $scope.editorEnabled = true;
            }
        }
    }
    
    $scope.cancel = function() {
        $scope.editorEnabled = false;
    };
    
    //
    $scope.update = function() {
        for (i in $scope.list) {
            if ($scope.list[i]._id == $scope.editCustomer._id) {
                $scope.list[i] = $scope.editCustomer;
            }
        }
        $http.put(url+'update/'+$scope.editCustomer._id, { updateCustomerObject : $scope.editCustomer})
            .success(function(data) {
                $scope.editCustomer = {}; // clear the form so our user is ready to enter another
                //$scope.list = data.list;
                console.log(data.list);
                $scope.editorEnabled = false;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

	// delete a todo after checking it
	$scope.deleteCustomer = function(id) {
        alert("confirm");
		// $http.delete('/customer/delete/' + id)
			// .success(function(data) {
				// $scope.list = data;
				// console.log(data);
			// })
			// .error(function(data) {
				// console.log('Error: ' + data);
			// });
	};

    $scope.logChore = function(chore) {
        alert(chore + "is done!");
    }
}

app.directive('ensureUnique', ['$http', function($http) {
  return {
    require: 'ngModel',
    link: function(scope, ele, attrs, c) {
      scope.$watch(attrs.ngModel, function() {
        $http({
          method: 'POST',
          url: '/customer/check/' + attrs.ensureUnique,
          data: {'field': attrs.ensureUnique}
        }).success(function(data, status, headers, cfg) {
          c.$setValidity('unique', data.isUnique);
        }).error(function(data, status, headers, cfg) {
          c.$setValidity('unique', false);
        });
      });
    }
  }
}]);

app.directive("", function(){
    return {
        restrict: "E",  // values E:element, A:attribute
        //isolate scope
        scope: {
            done: "&"   // refer to whatever you're pass in 
        },
        template: '<input type="text" ng-model="chore">' +
          ' {{chore}}' +
          ' <div class="button" ng-click="done({chore:chore})">I\'m done!</div>'
    };
    
    // <div ng-app="myApp">
        // <div ng-controller="customerController">
            // <kid done="logChore(chore)"></kid>
        // </div>
    // </div>
})

app.directive("drink", function() {
    return {
        scope: {
            flavor: "@" //get and set attribute named "flavor" into scope
        },
        template: '<div>{{flavor}}</div>'
    }
    // <div ng-app="drinkApp">
        // <div ng-controller="AppCtrl">
          // <input type="text" ng-model="ctrlFlavor">
          // <div drink flavor="{{ctrlFlavor}}"></div>
        // </div>
  // </div>
})

app.directive("drinkEqual", function() {
    return {
        scope: {
            flavor: "=" //setting binding both way
        },
        template: '<input type="text" ng-model="flavor">'
    }
    // <div ng-controller="AppCtrl">
        // Ctrl
      // <input type="text" ng-model="ctrlFlavor">

      // Dir
      // <div drink flavor="ctrlFlavor"></div>
    // </div>
})

app.directive("phone", function() {
    return {
        scope: {
            dial: "&"   //call method in controller
        },
        template: '<input type="text" ng-model="value">' +
          '<div class="button" ng-click="dial({message:value})">Call home!</div>'
    }
    // <div ng-controller="AppCtrl">
        // <div phone dial="callHome(message)"></div>
    // </div>
})