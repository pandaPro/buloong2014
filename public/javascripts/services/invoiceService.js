app.factory('invoiceService', function ($http, baseService) {
    var url = "/invoice/";
    var orderUrl = "/order/";

    var addInvoice = function(paramsObject) {
        var requestURI = url + baseService.actions.ADD;
        return baseService.syncRequest(baseService.methods.POST, requestURI, paramsObject);
    };

    var getInvoicesByFilter = function(filterData) {
        var requestURI = url + baseService.actions.FILTER;
        return baseService.syncRequest(baseService.methods.PUT, requestURI, filterData);
    };

    var removeInvoice = function(invoiceId){
        var requestURI = url+ invoiceId + "/"+ baseService.actions.REMOVE;
        return baseService.syncRequest(baseService.methods.DELETE, requestURI);
    };

    var addOrder = function(invoiceId, orderData){
        var requestURI = url+ invoiceId + orderUrl + baseService.actions.ADD;
        return baseService.syncRequest(baseService.methods.PUT, requestURI, orderData);
    };

    var updateOrder = function(invoiceId, orderData){
        var requestURI = url+ invoiceId + orderUrl + baseService.actions.UPDATE;
        return baseService.syncRequest(baseService.methods.PUT, requestURI, orderData);
    };

    var removeOrder = function(invoiceId, orderData){
        var requestURI = url+ invoiceId + orderUrl + baseService.actions.REMOVE;
        return baseService.syncRequest(baseService.methods.PUT, requestURI, orderData);
    };

    var exportData = function(filterData){
        var requestURI = url+ baseService.actions.EXPORT +"/excel/";
        return baseService.syncRequest(baseService.methods.PUT, requestURI, filterData);
    }

    var businessChartData = function(){

    }

    return {
        addInvoice: addInvoice,
        removeInvoice: removeInvoice,

        updateOrder: updateOrder,
        removeOrder: removeOrder,
        addOrder: addOrder,

        exportData: exportData,
        businessChartData: businessChartData,
        getInvoicesByFilter: getInvoicesByFilter
    };
})