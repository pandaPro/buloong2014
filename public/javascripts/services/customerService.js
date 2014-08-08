app.factory('customerService', function($http, baseService) {
    var url = "/customer/";

    var getActiveCustomers = function(){
        var requestUrl = url + 'activeList';
        var promise = baseService.syncRequest(baseService.methods.GET, requestUrl);
        return promise;
    };

    var verifyCustomerName = function(){

    };

    return {
        getActiveCustomers: getActiveCustomers
    };
})