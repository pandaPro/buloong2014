'use strict';

function customerController($scope, $http, baseService) {
    var url = "/customer/";
    $scope.editorEnabled = false;
    $scope.list = [];
    console.log('begin');
    // $scope.init = function(){
    //     console.log('init');
    //     $scope.list = baseService.getAll(url + 'list');
    // };
    // when landing on the page, get all customers and show them
    $http.get(url+'list')
        .success(function(data) {
            $scope.list = data;
            // alert(data);
            console.log('got list');
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
        for (var i in $scope.list) {
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
        for (var i in $scope.list) {
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
};
