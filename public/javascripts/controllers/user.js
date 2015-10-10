var url = "/user/";
function userController($scope, $location, $window, userService, authenticationService)
{
    $scope.user = {
        username: "",
        password: ""
    };

    //Admin User Controller (login, logout)
    $scope.logIn = function logIn(modelObject, loginForm) {
        console.log(loginForm.$valid);
        if (loginForm.$valid) {
            var promise = userService.logIn(modelObject.username, modelObject.password);
            promise.then(function(res){
                console.log(res.data);
                if(res.data && res.result === true){
                    authenticationService.isLog = true;
                    // $window.sessionStorage.token = data.token;
                    $location.path("/profile");
                }
                else{
                    console.log(res);
                }
            });
        }
    }

    $scope.logout = function logout() {
        if (authenticationService.isLogged) {
            authenticationService.isLogged = false;
            // delete $window.sessionStorage.token;
            $location.path("/");
        }
    }
}