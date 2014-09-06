app.factory('configService', function($http, baseService) {
    var url = "/config/";

    var getAll = function(){
        var requestUrl = url + baseService.actions.LIST;
        var promise = baseService.syncRequest(baseService.methods.GET, requestUrl);
        return promise;
    };

    var add = function(data) {
        var requestURI = url + baseService.actions.ADD;
        var promise = baseService.syncRequest(baseService.methods.POST, requestURI, data);
        return promise;
    };

    var update = function(data) {
        var requestURI = url + baseService.actions.UPDATE;
        var promise = baseService.syncRequest(baseService.methods.PUT, requestURI, data);
        return promise;
    };

    return {
        getAll: getAll,
        add: add,
        update: update
    };
})