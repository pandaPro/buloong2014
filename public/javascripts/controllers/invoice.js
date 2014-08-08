
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
    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
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
            toDate: new Date()
        };

        $scope.list = $scope.filterMethod();
    };

    $scope.verifyProductCode = function(productObject, newInvoiceOrderDetail){
        var orderProductCode = $scope.newInvoiceCode(productObject);
        // console.log("orderProductCode=" + orderProductCode);
        if(orderProductCode.length >= 4 && /[A-Z]/.test(orderProductCode))
        {
            var promise = productData.checkExistedCode(orderProductCode);
            promise.then(function(res){
                console.log(res);
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

    $scope.$watch($scope.total, function() {
        if(!$scope.revenue) $scope.revenue = 0;
        $scope.revenue += $scope.total;
    });

    $scope.total = function(orders) {
        var total = 0;
        angular.forEach(orders, function(item) {
            total += item.quantity * item.salePrice;
        })
        return total;
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
                    $scope.newInvoice = { orders: [], customer: {}, createdDate: new Date()};
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
                        orderModel = [];
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
        var updateData = {orderObject: order};
        var promise = invoiceService.updateOrder(invoice._id, updateData);
        console.log("============");
        promise.then(function(res) {
            console.log(res.data);
            if(res.data && res.data.result === 1)
            {
                // setObjectDataToList(order, invoice.orders);
            }
        });
    }

    $scope.cancel = function() {
        $scope.editorEnabled = false;
    };
    
    $scope.filterMethod = function() {
        //get filter scope data
        $scope.filter.fromDate = new Date(new Date($scope.filter.fromDate).setHours(0));
        var paramsJson = {filterObject: $scope.filter};
        var promise = invoiceService.getInvoicesByFilter(paramsJson);
        // console.log(paramsJson);
        // console.log("============");
        promise.then(function(res) {
            console.log(res.data);
            if(res.data)
            {
                $scope.list = res.data.data;
            }
        });
    };

    $scope.export = function() {
        alert("EXPORT");
        //get filter scope data
        //call api service update invoice list
        $scope.filter.fromDate = new Date(new Date($scope.filter.fromDate).setHours(0));
        var paramsJson = {filterObject: $scope.filter};
        var promise = invoiceService.getInvoicesByFilter(paramsJson);
        // console.log(paramsJson);
        // console.log("============");
        promise.then(function(res) {
            console.log(res.data);
            if(res.data)
            {
                // redirect a new window to exported file 
            }
        });
    };
}