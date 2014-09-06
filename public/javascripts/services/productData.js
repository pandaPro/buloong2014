app.factory('productData', function($http, baseService) {
    var url = "/product/";

    var checkCode = function(code) {
        var requestURI = url + 'checkCode/' + code;
        var promise = baseService.syncRequest(baseService.methods.PUT, requestURI);
        return promise;
    };

    var getAll = function() {
        var requestURI = url + 'all';
        var data = baseService.syncRequest(baseService.methods.GET, requestURI);
        return data;
    };

    var getActiveProduct = function() {
        var requestURI = url + 'activeProducts';
        var promise = baseService.syncRequest(baseService.methods.GET, requestURI);
        return promise;
    };

    var add = function(data) {
        var requestURI = url + 'add';
        var promise = baseService.syncRequest(baseService.methods.POST, requestURI, data);
        return promise;
    };

    var update = function(data) {
        var requestURI = url + 'update';
        var promise = baseService.syncRequest(baseService.methods.PUT, requestURI, data);
        return promise;
    };

    var generateQuantitySuggestList = function(){
        var list = [];
        var skipCount = 0;
        for (var i =1000; i <= 100000; i+=1000) {
            if((i- skipCount)/1000 ===3 || (i- skipCount)/1000 ===8 ){
                list.push(i-500);
                skipCount +=5000;
            }
            list.push(i);
        }
        return list;
    };

    return {
        getPartsOrder: {format: 1, length: 2, type: 0},
        formats:[{name: "6.3", value:63}, {name: "6", value:6}, {name: "5", value:5}],
        types:[{name: "Xi", value:"X"}, {name: "Đầu Bông", value:"B"}, {name: "Đen", value:"D"}
            , {name: "Mỏng", value:"M"}, {name: "Mỏng Xi", value:"Z"}],
        lengths: 
            [ {name: "0.8", value:8}, {name: "10", value:10}, {name: "1.1", value:11}
            , {name: "15", value:15}, {name: "20", value:20}, {name: "22", value:22}
            , {name: "25", value:25}, {name: "30", value:30}, {name: "35", value:35}
            , {name: "40", value:40}, {name: "50", value:50}, {name: "60", value:60}
            ],
        quantitySuggestList: generateQuantitySuggestList,
        getAll: getAll,
        add: add,
        update: update,
        checkExistedCode: checkCode
    };
})