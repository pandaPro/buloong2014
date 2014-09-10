
var app = angular.module('myApp', ['ui.bootstrap', 'googlechart']);
function summaryController($scope, $http, $locale, productData, customerService, invoiceService)
{
    $scope.totalAmount = 0;
    $scope.saleprice = 0;
    $scope.quantity = 0;
    $scope.productCodePosition = productData.getPartsOrder;
    $scope.list = [];
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

    $scope.init = function(){
        $scope.formats = productData.formats;
        $scope.lengths = productData.lengths;
        $scope.types = productData.types;

        $scope.product = {
            format: "",
            length: "",
            type: ""
        };

        $scope.filter = {
            type: "",
            fromDate: new Date(),
            toDate: new Date()
        };
        $scope.filter.type = 0;
        $scope.list = $scope.filterMethod();
    };

    $scope.type = "BarChart";
    var chart1 = {};
    chart1.type = $scope.type;
    chart1.data = [
       ['Component', 'cost'],
       ['Software', 50000],
       ['Hardware', 80000]
      ];
    chart1.data.push(['Services',20000]);
    chart1.options = {
        displayExactValues: true,
        width: 400,
        height: 200,
        is3D: true,
        chartArea: {left:10,top:10,bottom:0,height:"100%"}
    };

    chart1.formatters = {
      number : [{
        columnNum: 1,
        pattern: "#,##0"
      }]
    };      
    $scope.chart1 = chart1;

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
        $scope.filter.fromDate = new Date(new Date($scope.filter.fromDate).setHours(0));
        var paramsJson = {filterObject: $scope.filter};
        var promise = invoiceService.businessChartData(paramsJson);
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
}