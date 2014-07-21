'use strict';

app.controller('invoiceController',
    function invoiceController($scope, $locale)
    {
        // console.log($locale);
        // $scope.createdDate = new Date.now();
        // $scope.dateFormat = $locale.DATETIME_FORMATS;

        $scope.formats = [{name: "6.3", value:63}, {name: "6", value:6}, {name: "5", value:5}];
        $scope.lengths = [{name: "0.8", value:8}, {name: "10", value:10}, {name: "1.1", value:11}
                    , {name: "15", value:15}, {name: "20", value:20}, {name: "22", value:22}
                    , {name: "25", value:25}, {name: "30", value:30}, {name: "35", value:35}
                    , {name: "40", value:40}, {name: "50", value:50}, {name: "60", value:60}
                    ];
        $scope.types = [{name: "Xi", value:"X"}, {name: "Đầu Bông", value:"B"}, {name: "Đen", value:"D"}
                    , {name: "Mỏng", value:"M"}, {name: "Mỏng Xi", value:"MX"}
                    ];

        $scope.customers = [{id:1, name:"83"}, {id:2, name:"Huy"}, {id:3, name:"Quang"}
                    ];

    }
);