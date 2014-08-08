app.factory('baseService', function($q, $http) {

    var asyncRequest = function(method, requestUrl, paramsObject) {
        var list = [];
        $http({
            method: method,
            url: requestUrl,
            data: paramsObject
        })
        .success(function(data, status) {
            list = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
        console.log(list);
        return list;
    };

    var syncRequest = function(method, requestUrl, paramsObject) {
        var deferred = $q.defer();
        deferred.resolve(
            $http({
                method: method,
                url: requestUrl,
                data: paramsObject
            })
            .success(function(data, status) {
                return data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            })
        );
        return deferred.promise;
    };

    return {
        actions: {"ALL": "all", "ADD": "add", "UPDATE": "update", "DELETE": "delete", 
                "REMOVE": "remove", "FILTER": "filter", "EXPORT": "export"},
        methods: {"GET": "GET", "POST": "POST", "PUT": "PUT", "DELETE": "DELETE"},
        asyncRequest: asyncRequest,
        syncRequest: syncRequest
    };
})