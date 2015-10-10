'use strict';

function customerController($scope, $http, customerService) {
    var url = "/customer/";
    $scope.editorEnabled = false;
    $scope.list = [];
    console.log('begin');

    $scope.init = function(){
        console.log('init');
        var promise = customerService.getAll();
        promise.then(function(res){
            if(res.data) {
                $scope.list = res.data;
            }
        });
    };

    // when submitting the add form, send the text to the node API
    $scope.createCustomer = function(objModel, customerModelForm) {
        console.log(customerModelForm.$valid);
        if(customerModelForm.$valid) {
            var promise = customerService.add({customerObject: $scope.newCustomer });
            promise.then(function(res){
                if(res.data){
                    var data = res.data;
                    if(data.error){
                        $scope.message = data.error;
                        // alert(data);
                        console.log('Error: ' + data);
                    }
                    else{
                        $scope.newCustomer = {};
                        $scope.list.push(data.item);
                        $scope.message = data.message;
                        console.log(data);
                    }
                }
            })
            // $http.post(url+'add', { customerObject: $scope.newCustomer })
            //     .success(function(data) {
            //         // $scope.customerModel = {}; // clear the form so our user is ready to enter another
            //         $scope.newCustomer = {};
            //         $scope.list.push(data.item);
            //         $scope.message = data.message;
            //         console.log(data);
            //     })
            //     .error(function(data) {
            //         $scope.message = data.error;
            //         alert(data);
            //         console.log('Error: ' + data);
            // });
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
    $scope.update = function(editCustomer) {
        console.log(editCustomer);
        var promise = customerService.update(editCustomer._id, { updateCustomerObject : editCustomer});
        promise.then(function(res){
            if(res.data){
                console.log(res.data);
                var data = res.data;
                if(data.error){
                    $scope.message = data.error;
                    console.log('Error: ' + data);
                }
                else if(data.result === 1){
                    $scope.editCustomer = {}; // clear the form so our user is ready to enter another
                    setObjectDataToList(editCustomer, $scope.list)
                    console.log(data.item);
                    $scope.editorEnabled = false;
                }
            }
        })
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
