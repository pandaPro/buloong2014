app.factory('customerService', function($http, baseService) {
    var url = "/customer/";

    var getActiveCustomers = function(){
        var requestUrl = url + 'activeList';
        var promise = baseService.syncRequest(baseService.methods.GET, requestUrl);
        return promise;
    };

    var verifyCustomerName = function(){

    };

    var getAll = function(){
        var requestUrl = url + 'list';
        var promise = baseService.syncRequest(baseService.methods.GET, requestUrl);
        return promise;
    };

    var add = function(data) {
        var requestURI = url + 'add';
        var promise = baseService.syncRequest(baseService.methods.POST, requestURI, data);
        return promise;
    };

    var update = function(id, data) {
        var requestURI = url + 'update/' + id;
        var promise = baseService.syncRequest(baseService.methods.PUT, requestURI, data);
        return promise;
    };

    return {
        getAll: getAll,
        add: add,
        update: update,
        getActiveCustomers: getActiveCustomers
    };
})