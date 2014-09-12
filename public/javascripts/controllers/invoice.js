
'use strict';
function invoiceController($scope, $http, $locale, productData, customerService, invoiceService)
{
    $scope.oneAtATime = false;
    $scope.invoiceTotal = 0;
    $scope.saleprice = 0;
    $scope.quantity = 0;
    $scope.productCodePosition = productData.getPartsOrder;
    $scope.list = [];
    $scope.revenue = 0;

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };
    $scope.open = function($event, datePickerControl) {
        $event.preventDefault();
        $event.stopPropagation();
        if(datePickerControl){
            if(datePickerControl === 2)
                $scope.filter.isOpenedToDate = true;
            else if(datePickerControl === 1)
                $scope.filter.isOpenedFromDate = true;
        }
        else
            $scope.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.init = function(){
        $scope.formats = productData.formats;
        $scope.lengths = productData.lengths;
        $scope.types = productData.types;
        $scope.quantitySuggestionList = productData.quantitySuggestList();

        var promise = customerService.getActiveCustomers();
        promise.then(function(res) {
            if(res.data)
                $scope.customers = res.data;
        });

        $scope.newInvoice = {
            orders: [],
            customer: {},
            createdDate: new Date()
        };

        $scope.newInvoiceOrder = {
            code: "",
            quantity: "",
            salePrice: ""
        };

        $scope.newOrder = {
            code: "",
            quantity: "",
            salePrice: ""
        };

        $scope.product = {
            format: "",
            length: "",
            type: ""
        };

        $scope.filter = {
            customer: "",
            fromDate: new Date(),
            isOpenedFromDate: false,
            isOpenedToDate: false,
            toDate: new Date()
        };

        $scope.filterMethod();
    };

    // $scope.filterTotal = function(){
    //     var invoiceTotal = 0;
    //     console.log($scope.list);
    //     angular.forEach($scope.list, function(item) {
    //         invoiceTotal += total(item.orders);
    //     });
    //     return invoiceTotal;
    // };

    $scope.verifyProductCode = function(productObject, newInvoiceOrderDetail){
        var orderProductCode = $scope.newInvoiceCode(productObject);
        // console.log("orderProductCode=" + orderProductCode);
        if(orderProductCode.length >= 4 && /[A-Z]/.test(orderProductCode))
        {
            var promise = productData.checkExistedCode(orderProductCode);
            promise.then(function(res){
                // console.log(res);
                if(res.status === 200 && res.data.item)
                {
                    newInvoiceOrderDetail.salePrice = res.data.item.salePrice;
                }
            });
        }
    };

    $scope.getNameFromList = function(value, list) {
        return getNameByList(value, list);
    }

    $scope.getProductExtractPart = function(code, position, list) {
        return extractProductPartValueByCode(code, position, list);
    }

    $scope.newInvoiceCode = function(product) {
        return product.type + product.format + pad(product.length, 2);
    };

    $scope.total = function(orders) {
        var orderTotal = 0;
        angular.forEach(orders, function(item) {
            orderTotal += item.quantity * item.salePrice;
        })
        return orderTotal;
    }

    // when submitting the add form, send the text to the node API
    $scope.createInvoice = function(objModel, invoiceModel) {
        // console.log(objModel.$valid);
        if(invoiceModel.$valid) {
            $scope.newInvoiceOrder.code = $scope.newInvoiceCode($scope.product);
            console.log($scope.newInvoiceOrder);
            $scope.newInvoice.orders.push(angular.copy($scope.newInvoiceOrder));
            console.log($scope.newInvoice);
            // call api
            var promise = invoiceService.addInvoice({ invoiceObject: $scope.newInvoice});
            promise.then(function(res) {
                if(res && res.data) {
                    // response result processing
                    console.log(res.data);
                    if(res.data && res.data.item) {
                        $scope.list.push(angular.copy(res.data.item));
                    }
                    console.log('----------------------');
                    // reset control
                    $scope.newInvoiceOrder = {};
                    $scope.product = {};
                    $scope.newInvoice.orders = [];
                    // close modal

                }
            })
        }
    };

    $scope.createOrder = function(invoiceId, orderModel, productScope) {
        // console.log(objModel.$valid);
        // if(orderModel.$valid) {
            console.log("-----invoice id ------");
            console.log(invoiceId);
            orderModel.code = $scope.newInvoiceCode($scope.product);
            console.log("-----order model ------");
            console.log(orderModel);
            var selectedInvoice = getObjectDataById(invoiceId, $scope.list);
            console.log("-----selected invoice ------");
            if(selectedInvoice) {
                var orderData = {orderObject: orderModel};
                var promise = invoiceService.addOrder(invoiceId, orderData);
                promise.then(function(res){
                    if(res.status === 200 && res.data.item){
                        console.log(res);
                        selectedInvoice.orders.push(angular.copy(res.data.item));
                        // reset order model and product
                        orderModel.quantity = "";
                    }
                });
                productScope = {};
            }
            console.log(selectedInvoice);
    };

    //
    $scope.editOrder = function (invoiceId, order) {
        console.log("invoiceId:%s, order=%s", invoiceId, order);
        var selectedInvoice = getObjectDataById(invoiceId, $scope.list);
        if(selectedInvoice){
            var selectedOrder = getObjectDataById(order.id, selectedInvoice.orders);
            console.log("selectedOrder=" + selectedOrder);
            if (selectedOrder) {
                $scope.editOrder = angular.copy(selectedOrder);
                $scope.product.format = extractProductByCode($scope.editOrder.code, $scope.productCodePosition.format);
                $scope.product.length = extractProductByCode($scope.editOrder.code, $scope.productCodePosition.length);
                $scope.product.type = extractProductByCode($scope.editOrder.code, $scope.productCodePosition.type);
                $scope.editorEnabled = true;
            }
        }
    }
    
    $scope.removeInvoice = function(invoice) {
        var promise = invoiceService.removeInvoice(invoice._id);
        console.log("============");
        promise.then(function(res) {
            console.log(res.data);
            if(res.data && res.data.result === 1)
            {
                removeJsonInList(invoice, $scope.list);
            }
        });
    }

    $scope.removeOrder = function(invoice, order) {
        var requestData = {orderObject: order};
        var promise = invoiceService.removeOrder(invoice._id, requestData);
        console.log("======order======");
        // console.log(order);
        promise.then(function(res) {
            console.log(res.data);
            if(res.data && res.data.result === 1)
            {
                removeJsonInList(order, invoice.orders);
            }
        });
    }

    $scope.updateOrder = function(invoice, order) {
        order.code = $scope.newInvoiceCode($scope.product);
        console.log("======update order======");
        console.log(order);
        var updateData = {orderObject: order};
        var promise = invoiceService.updateOrder(invoice._id, updateData);
        promise.then(function(res) {
            console.log(res.data);
            if(res.data && res.data.result === 1)
            {
                setObjectDataToList(order, invoice.orders);
                $scope.editorEnabled = false;
            }
        });
    }

    $scope.cancel = function() {
        $scope.editorEnabled = false;
    };
    
    $scope.filterMethod = function() {
        //get filter scope data
        // var dataList = {};
        $scope.filter.fromDate = new Date(new Date($scope.filter.fromDate).setHours(0));
        var paramsJson = {filterObject: $scope.filter};
        var promise = invoiceService.getInvoicesByFilter(paramsJson);
        // console.log(paramsJson);
        // console.log("============");
        promise.then(function(res) {
            console.log("filterMethod=" + res.data);
            if(res.data)
            {
                $scope.list = res.data.data;
            }
        });
    };

    $scope.export = function() {
        // alert("EXPORT");
        var selectedCustomer = $scope.filter.customer;
        if(selectedCustomer){
            $scope.filter.fromDate = new Date(new Date($scope.filter.fromDate).setHours(0));
            $scope.filter.toDate = new Date(new Date($scope.filter.toDate).setHours(11));
            var paramsJson = {filterObject: $scope.filter};
            var promise = invoiceService.exportData(paramsJson);
            // console.log(paramsJson);
            // console.log("============");
            promise.then(function(res) {
                console.log(res.data);
                if(res.data)
                {
                    // redirect a new window to exported file 
                    var popupWindow = window.open(res.data);
                }
            });
        }
        else{

        }
    };
}