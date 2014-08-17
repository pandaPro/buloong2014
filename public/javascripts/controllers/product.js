
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

    $scope.newProductCode = function(productObject) {
        productObject.code = $scope.product.type + $scope.product.format + pad($scope.product.length, 2);
        return productObject.code;
    };

    $scope.getNameFromList = function(value, list) {
        return getNameByList(value, list);
    }

    $scope.getProductExtractPart = function(code, position, list) {
        // console.log("code=" + code);
        return extractProductPartValueByCode(code, position, list);
    }

    $scope.checkProduct = function(productObject, productForm) {
        var result = "false";
        var newCode = $scope.newProductCode(productObject);
        if(newCode.length >= 4 && /[A-Z]/.test(newCode))
        {
            // console.log("new code: " + $scope.newProduct.code);
            //call product service to verify product code exsited or not ?
            var promise = productData.checkExistedCode(newCode);
            promise.then(function(res){
                // console.log(res.data);
                if(res.data.result && res.data.result == true 
                    && (!productObject._id || productObject._id != res.data.item._id))
                {
                    console.log("existed code");
                    $scope.message = "Existed product! Please select a new one.";
                    $scope.messageEnabled = true;
                    productForm.$valid = false;
                    productForm.$invalid = true;
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
            if($scope.checkProduct(objModel, productModelForm) == "false") {
                console.log("valid data");
                var promise = productData.add({ productObject: objModel});
                promise.then(function(res){
                    console.log(res.data);
                    if(res.data){
                        var data = res.data;
                        if(data.error) {
                            $scope.message = data.error;
                        }
                        else {
                            $scope.newProduct = {};
                            $scope.product= {};
                            $scope.list.push(data.item);
                            $scope.messageEnabled = true;
                            $scope.message = data.message;
                            console.log(data);
                        }
                    }
                })
            }
        }
    };

    $scope.update = function(objModel, editProductForm) {
        console.log(objModel);
        if(editProductForm.$valid) {
            console.log($scope.checkProduct(objModel, editProductForm));
            if($scope.checkProduct(objModel, editProductForm) == "false") {
                var promise = productData.update({productObject: objModel});
                promise.then(function(res){
                    if(res.data){
                        var data = res.data;
                        if(data.error) {
                            $scope.message = data.error;
                        }
                        else if(data.result === 1){
                            // $scope.message = data.message;
                            // console.log("=========");
                            // console.log(data);
                            setObjectDataToList(objModel, $scope.list)
                            $scope.editorEnabled = false;
                        }
                    }
                })
            }
        }
    };

    //
    $scope.edit = function (value) {
        var selectedObject = getObjectDataById(value, $scope.list);
        if(selectedObject) {
            $scope.editProduct = angular.copy(selectedObject);
            $scope.product.format = extractProductByCode($scope.editProduct.code, $scope.productCodePosition.format);
            $scope.product.length = extractProductByCode($scope.editProduct.code, $scope.productCodePosition.length);
            $scope.product.type = extractProductByCode($scope.editProduct.code, $scope.productCodePosition.type);
            console.log($scope.product);
            $scope.editorEnabled = true;
        }
    }
    
    $scope.cancel = function() {
        $scope.editorEnabled = false;
    };
    
}