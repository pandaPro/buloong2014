
var app = angular.module('myApp', ['ui.bootstrap', 'googlechart']);
function summaryController($scope, $http, $locale, productData, customerService, invoiceService)
{
    $scope.totalAmount = 0;
    $scope.saleprice = 0;
    $scope.quantity = 0;
    $scope.productCodePosition = productData.getPartsOrder;
    $scope.list = [];
    $scope.customers = [];
    $scope.dataTypes = [{name: "customer", value:0}, {name: "product", value:1}];
    // Disable weekend selection
    $scope.disabled = function(date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };
    $scope.open = function($event, openedPicker) {
        $event.preventDefault();
        $event.stopPropagation();
        if(openedPicker === 1)
            $scope.filter.isOpenedFromDate = true;
        else if(openedPicker === 2)
            $scope.filter.isOpenedToDate = true;
    };
    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    // chart initialize
    $scope.type = "BarChart";
    var chart1 = {};
    chart1.type = $scope.type;
    chart1.options = {
        isStacked: true,
        fill: 20,
        displayExactValues: true,
        width:1000,
        height: 500,
        is3D: true,
        chartArea: {left:"20%",top:"5%",bottom:"5%",height:"85%",width:"60%" }
    };
    chart1.formatters = {
      number : [{
        columnNum: 1,
        pattern: "#,##0"
      }]
    };

    $scope.init = function(){
        $scope.formats = productData.formats;
        $scope.lengths = productData.lengths;
        $scope.types = productData.types;
        
        console.log("before chart1");
        $scope.chart1 = chart1;
        $scope.chart1.data = {};
        console.log("after chart1");

        var promise = customerService.getActiveCustomers();
        promise.then(function(res) {
            if(res.data)
                $scope.customers = res.data;
        });

        $scope.filter = {
            type: 0,
            fromDate: new Date(),
            toDate: new Date()
        };
        // $scope.list = $scope.filterMethod();
        console.log("end init");

    };

    $scope.chartSelectionChange = function () {
        chart1.type = $scope.type;
    }

    $scope.getNameFromList = function(value, list) {
        return getNameByList(value, list);
    }

    $scope.getProductExtractPart = function(code, position, list) {
        return extractProductPartValueByCode(code, position, list);
    }

    $scope.filterMethod = function() {
        // $event.preventDefault();
        $scope.filter.fromDate = new Date($scope.filter.fromDate.setHours(0));
        var paramsJson = {filterObject: $scope.filter};
        var promise = invoiceService.businessChartData(paramsJson);
        // console.log(paramsJson);
        // console.log("============");
        promise.then(function(res) {
            console.log(res.data);
            if(res.data)
            {
                $scope.list = res.data.data;
                $scope.transformFilterData($scope.list);
            }
        });

        // var data = [{_id: '53e877e86bf26d00170daee7', quantity: 121323, amount: 6000000},
        //     {_id: '53d69a42e365fef40252ce63', quantity: 121323, amount: 20000000},
        //     {_id: '53f84a963999b1fc09ffdc05', quantity: 121323, amount: 3000000}
        // ];
        // $scope.transformFilterData(data);
    };

    $scope.transformFilterData = function(data){
        // sample response data : [{month: 8, year:2014, data: [{_id: 'customer id', quantity: 121323, amount: 1234567}, {_id: 'customer id', quantity: 121323, amount: 1234567}]},
        //                          {month: 9, year:2014, data: [{_id: 'customer id', quantity: 45354, amount: 866543}, {_id: 'customer id', quantity: 121323, amount: 1234567}]}
        // ]
        console.log("begin transformFilterData");
        var cols = [
                {id: "t", label: "", type: "string",},
                {id: "s", label: "", type: "number", "p": {}}
            ];
        var rows = [];

        angular.forEach(data, function(item) {
            var itemData = {};
            if($scope.filter.type == 0){
                var customerName = getNameByList(item._id, $scope.customers);
                itemData = {c: [{v: customerName}, {v: item.amount}]};
            }
            else if($scope.filter.type == 1){
                var code = item._id;
                var product = getNameByList(extractProductByCode(item._id, 0), $scope.types);
                itemData = {c: [{v: String(product + " " + code.substr(1, code.length-1))}, {"v": item.amount, "f": item.quantity}]};
            }
            rows.push(itemData);
        });

        console.log(rows);
        $scope.chart1.data = {"cols": cols, "rows": rows};

        console.log("end transformFilterData");
        // $scope.chart = {
        //       "type": $scope.type,
        //       "displayed": true,
        //       "data": {
        //         "cols": [
        //           {
        //             "id": "month",
        //             "label": "Month",
        //             "type": "string",
        //             "p": {}
        //           },
        //           {
        //             "id": "laptop-id",
        //             "label": "Laptop",
        //             "type": "number",
        //             "p": {}
        //           },
        //           {
        //             "id": "desktop-id",
        //             "label": "Desktop",
        //             "type": "number",
        //             "p": {}
        //           },
        //           {
        //             "id": "server-id",
        //             "label": "Server",
        //             "type": "number",
        //             "p": {}
        //           },
        //           {
        //             "id": "cost-id",
        //             "label": "Shipping",
        //             "type": "number"
        //           }
        //         ],
        //         "rows": [
        //           {
        //             "c": [
        //               {
        //                 "v": "January"
        //               },
        //               {
        //                 "v": 19,
        //                 "f": "42 items"
        //               },
        //               {
        //                 "v": 12,
        //                 "f": "Ony 12 items"
        //               },
        //               {
        //                 "v": 7,
        //                 "f": "7 servers"
        //               },
        //               {
        //                 "v": 4
        //               }
        //             ]
        //           },
        //           {
        //             "c": [
        //               {
        //                 "v": "February"
        //               },
        //               {
        //                 "v": 13
        //               },
        //               {
        //                 "v": 1,
        //                 "f": "1 unit (Out of stock this month)"
        //               },
        //               {
        //                 "v": 12
        //               },
        //               {
        //                 "v": 2
        //               }
        //             ]
        //           },
        //           {
        //             "c": [
        //               {
        //                 "v": "March"
        //               },
        //               {
        //                 "v": 24
        //               },
        //               {
        //                 "v": 5
        //               },
        //               {
        //                 "v": 11
        //               },
        //               {
        //                 "v": 6
        //               }
        //             ]
        //           }
        //         ]
        //       },
        //       "options": {
        //         "title": "Sales per month",
        //         "isStacked": "true",
        //         "fill": 20,
        //         "displayExactValues": true,
        //         "vAxis": {
        //           "title": "Sales unit",
        //           "gridlines": {
        //             "count": 10
        //           }
        //         },
        //         "hAxis": {
        //           "title": "Value"
        //         }
        //       },
        //       "formatters": {}
        //     }
    };
}