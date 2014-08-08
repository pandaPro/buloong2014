
function productController($scope, $http, $locale, productData, baseService)
{
    $scope.message = "";
    $scope.list = [];
    $scope.formats = productData.formats;
    $scope.lengths = productData.lengths;
    $scope.types = productData.types;
    $scope.productCodePosition = productData.getPartsOrder;

    $scope.editorEnabled = false;
    $scope.orderProp = "name";

    $scope.init = function(){
        var promise = productData.getAll();
        promise.then(function(res){
            // console.log(res.data);
            if(res.data) {
                $scope.list = res.data;
            }
        });

        $scope.newProduct = {
            code: "",
            salePrice: "",
            status: false
        };

        $scope.product = {
            format: "",
            length: "",
            type: ""
        };
    };

    $scope.newProductCode = function() {
        $scope.newProduct.code = $scope.product.type + $scope.product.format + pad($scope.product.length, 2);
        return $scope.newProduct.code;
    };

    $scope.getNameFromList = function(value, list) {
        return getNameByList(value, list);
    }

    $scope.getProductExtractPart = function(code, position, list) {
        // console.log("code=" + code);
        return extractProductPartValueByCode(code, position, list);
    }

    $scope.checkProduct = function(productModelForm) {
        var result = "false";
        var newCode = $scope.newProductCode();
        if(newCode.length >= 4 && /[A-Z]/.test(newCode))
        {
            // console.log("new code: " + $scope.newProduct.code);
            //call product service to verify product code exsited or not ?
            var promise = productData.checkExistedCode(newCode);
            promise.then(function(res){
                // console.log(res.data);
                if(res.data.result && res.data.result == true)
                {
                    console.log("existed code");
                    $scope.message = "Existed product! Please select a new one.";
                    $scope.messageEnabled = true;
                    productModelForm.$valid = false;
                    productModelForm.$invalid = true;
                    result = "true";
                }
                else
                {
                    $scope.message = "";
                    $scope.messageEnabled = false;
                }
            });
        }
        return result;
    };

    // when submitting the add form, send the text to the node API
    $scope.create = function(objModel, productModelForm) {
        // console.log(productModelForm);
        if(productModelForm.$valid) {
            if($scope.checkProduct(productModelForm) == "false") {
                console.log("valid data");
                var promise = productData.add({ productObject: objModel});
                // $http.post(url+'add', { productObject: objModel})
                //     .success(function(data) {
                //         if(data.error) {
                //             $scope.message = data.error;
                //         }
                //         else {
                //             $scope.newProduct = {};
                //             $scope.product= {};
                //             $scope.list.push(data.item);
                //             $scope.messageEnabled = true;
                //             $scope.message = data.message;
                //             console.log(data);
                //         }
                //     })
                //     .error(function(data) {
                //         $scope.message = data.error;
                //         console.log('Error: ' + data);
                // });
            }
        }
    };

    $scope.update = function(id, objModel, productModelForm) {
        console.log(productModelForm);
        if(productModelForm.$valid) {
            if($scope.checkProduct(productModelForm) == "true") {
                var result = productData.update({_id: id, productObject: objModel});
                // $http.put(url+'update', { productObject: objModel})
                //     .success(function(data) {
                //         if(data.error) {
                //             $scope.message = data.error;
                //         }
                //         else {
                //             $scope.message = data.message;
                //             console.log("added result = "+data);

                //             $scope.editorEnabled = false;
                //         }
                //     })
                //     .error(function(data) {
                //         $scope.message = data.error;
                //         console.log('Error: ' + data);
                // });
            }
        }
    };

    //
    $scope.edit = function (value) {
        // console.log("value:"+value);
        var selectedObject = getObjectDataById(value, $scope.list);
        if(selectedObject) {
            $scope.editProduct = angular.copy(selectedObject);
            $scope.editorEnabled = true;
        }
    }
    
    $scope.cancel = function() {
        $scope.editorEnabled = false;
    };
    
}