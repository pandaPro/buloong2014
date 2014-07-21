var url = "/product/";
function productController($scope, $http, $locale)
{
    // console.log($locale);
    $scope.list = [
        {_id:1, format: "63", length: "10", type: "X", salePrice: 200, status: true},
        {_id:2, format: "6", length: "20", type: "M", salePrice: 128, status: false},
        {_id:3, format: "5", length: "50", type: "B", salePrice: 222}
    ];

    $scope.formats = [{name: "6.3", value:63}, {name: "6", value:6}, {name: "5", value:5}];
    $scope.lengths = [{name: "0.8", value:8}, {name: "10", value:10}, {name: "1.1", value:11}
                    , {name: "15", value:15}, {name: "20", value:20}, {name: "22", value:22}
                    , {name: "25", value:25}, {name: "30", value:30}, {name: "35", value:35}
                    , {name: "40", value:40}, {name: "50", value:50}, {name: "60", value:60}
                    ];
    $scope.types = [{name: "Xi", value:"X"}, {name: "Đầu Bông", value:"B"}, {name: "Đen", value:"D"}
                    , {name: "Mỏng", value:"M"}, {name: "Mỏng Xi", value:"MX"}
                    ];

    $scope.newProduct = {
        code: "",
        format: "",
        length: "",
        type: "",
        salePrice: "",
        status: false
    };

    $scope.editorEnabled = false;

    // Object.defineProperty($scope, 'newProductCode', {
    //     get: function() {
    //         return $scope.newProduct.type + $scope.newProduct.format +$scope.newProduct.length;
    //     }
    // });

    $scope.newProductCode = function() {
        return $scope.newProduct.type + $scope.newProduct.format +$scope.newProduct.length;
    };

    $scope.$watch($scope.newProductCode, function() {
        $scope.newProduct.code = $scope.newProductCode;
    });

    $scope.multiple = function(var1, var2) {
        return var1 * var2;
    };

    // when submitting the add form, send the text to the node API
    $scope.create = function(objModel) {
        console.log(objModel.$valid);
        if(objModel.$valid) {
            $scope.list.push($scope.newProduct);
            $scope.newProduct = {};
            // $http.post(url+'add', { productObject: $scope.newProduct})
            //     .success(function(data) {
            //         // $scope.customerModel = {}; // clear the form so our user is ready to enter another
            //         $scope.newProduct = {};
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
    $scope.edit = function (value) {
        console.log("value:"+value);
        for (i in $scope.list) {
            if ($scope.list[i]._id == value) {
                $scope.editProduct = angular.copy($scope.list[i]);
                $scope.editorEnabled = true;
            }
        }
    }
    
    $scope.cancel = function() {
        $scope.editorEnabled = false;
    };
    
}
