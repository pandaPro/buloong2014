app.factory('productData', function($http){
    return {
        getProducts: function() {
            $http.get(options, cb);
        }
    };
})