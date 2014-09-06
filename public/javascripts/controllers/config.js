
function configController($scope, $http, configService, baseService) {
    $scope.editorEnabled = false;
    $scope.list = {};
    
    $scope.init = function() {
        var promise = configService.getAll();
        promise.then(function(res){
            // console.log(res.data);
            if(res.data) {
                $scope.list = res.data;
            }
        });
    }

    // when submitting the add form, send the text to the node API
    $scope.createConfig = function(objModel, configModelForm) {
        if(configModelForm.$valid) {
            var promise = configService.add({ configObject: objModel});
                promise.then(function(res){
                    console.log(res.data);
                    if(res.data){
                        var data = res.data;
                        if(data.error) {
                            $scope.message = data.error;
                        }
                        else {
                            $scope.newConfig = {};
                            $scope.config= {};
                            $scope.list.push(data.item);
                            $scope.messageEnabled = true;
                            $scope.message = data.message;
                            console.log(data);
                        }
                    }
                })
            // $http.post(url+'add', { configObject: objModel })
            //     .success(function(data) {
            //         $scope.configModel = {}; // clear the form so our user is ready to enter another
            //         $scope.list.push(data.item);
            //         $scope.message = data.message;
            //         console.log(data);
            //     })
            //     .error(function(data) {
            //         alert(data);
            //         console.log('Error: ' + data);
            // });
            // alert("validated");
        }
    };
    
    //
    $scope.edit = function (id) {
        // console.log("id:"+id);
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
    $scope.updateConfig = function(editConfigForm, objModel) {
        if(editConfigForm.$valid) {
            // console.log($scope.checkConfig(objModel, editConfigForm));
            
                var promise = configService.update({updateConfigObject: objModel});
                promise.then(function(res){
                    console.log(res);
                    if(res.data){
                        var data = res.data;
                        if(data.error) {
                            $scope.message = data.error;
                        }
                        else if(data.result === 1){
                            // $scope.message = data.message;
                            console.log("=========");
                            console.log(data);
                            setObjectDataToList(objModel, $scope.list)
                            $scope.editorEnabled = false;
                        }
                    }
                })
        }
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