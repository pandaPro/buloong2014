app.factory('authenticationService', function($http){
    var auth = {
        isLogged: false
    } 
    return auth;
});

app.factory('userService', function($http, baseService) {
    return {
        logIn: function(username, password) {
            var requestUrl = '/user/login';
            return baseService.syncRequest(baseService.methods.POST, requestUrl, {username: username, password: password});
        },
 
        logOut: function() {
 
        }
    }
});