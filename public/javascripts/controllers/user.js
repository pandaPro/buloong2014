var url = "/user/";
app.controller("userController",
    function userController($scope, $http)
    {
        $scope.user = {
            username: "",
            password: ""
        };
        
        $scope.init = function() {
            alert();
        }

        $scope.login = function(){
            $http.post('/login', { userObject: $scope.user })
                .success(function(data) {
                    // $scope.customerModel = {}; // clear the form so our user is ready to enter another
                    // $scope.newCustomer = {};
                    // $scope.list.push(data.item);
                    // $scope.message = data.message;
                    console.log(data);
                })
                .error(function(data) {
                    $scope.message = data.error;
                    alert(data);
                    console.log('Error: ' + data);
            });
        }
    }
)