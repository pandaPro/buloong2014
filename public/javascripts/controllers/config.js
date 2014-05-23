var app = angular.module('myApp', []);
var url = "/config/";

function configController($scope, $http) {
    $scope.editorEnabled = false;
    $scope.list = {};
    
    $scope.init = function() {
        alert(list);
        $scope.list = list;
    }
    
    // when landing on the page, get all configs and show them
    // $http.get(url+'list')
    //     .success(function(data) {
    //         $scope.list = data;
    //         // alert(data);
    //         console.log(data);
    //     })
    //     .error(function(data) {
    //         console.log('Error: ' + data);
    //     });

    // when submitting the add form, send the text to the node API
    $scope.createConfig = function(objModel) {
        if(objModel.$valid) {
            $http.post(url+'add', { configObject: objModel })
                .success(function(data) {
                    $scope.configModel = {}; // clear the form so our user is ready to enter another
                    $scope.list = data;
                    console.log(data);
                })
                .error(function(data) {
                    alert(data);
                    console.log('Error: ' + data);
            });
            // alert("validated");
        }
    };
    
    //
    $scope.edit = function (id) {
        console.log("id:"+id);
        for (i in $scope.list) {
            if ($scope.list[i]._id == id) {
                $scope.editConfig = angular.copy($scope.list[i]);
                $scope.editorEnabled = true;
            }
        }
    }
    
    $scope.cancel = function() {
        $scope.editorEnabled = false;
    };
    
    //
    $scope.updateConfig = function() {
        for (i in $scope.list) {
            if ($scope.list[i]._id == $scope.editConfig._id) {
                $scope.list[i] = $scope.editConfig;
            }
        }
        $http.put(url+'update/'+$scope.editConfig._id, { updateconfigObject : $scope.editConfig})
            .success(function(data) {
                $scope.editConfig = {}; // clear the form so our user is ready to enter another
                //$scope.list = data.list;
                console.log(data.list);
                $scope.editorEnabled = false;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

	// delete a todo after checking it
	$scope.deleteconfig = function(id) {
        alert("confirm");
		// $http.delete('/config/delete/' + id)
			// .success(function(data) {
				// $scope.list = data;
				// console.log(data);
			// })
			// .error(function(data) {
				// console.log('Error: ' + data);
			// });
	};
}