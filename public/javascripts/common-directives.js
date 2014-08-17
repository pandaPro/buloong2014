
app.$inject = ['$scope'];

// EX: <input type="text" ng-model="test" format="number" />
app.directive('format', ['$filter', function ($filter) {
    return {
        require: '?ngModel',
        link: function (scope, elem, attrs, ctrl) {
            if (!ctrl) return;
            ctrl.$formatters.unshift(function (a) {
                return $filter(attrs.format)(ctrl.$modelValue)
            });
            ctrl.$parsers.unshift(function (viewValue) {
                elem.priceFormat({
                prefix: '',
                centsSeparator: ',',
                thousandsSeparator: '.'
            });
                return elem[0].value;
            });
        }
    };
}]);

// EX: <input type="text" ng-model="employee.age" valid-number />
app.directive('validNumber', function() {
  return {
    require: '?ngModel',
    link: function(scope, element, attrs, ngModelCtrl) {
      if(!ngModelCtrl) {
        return; 
      }
      
      ngModelCtrl.$parsers.push(function(val) {
        var clean = val.replace( /[^0-9]+/g, '');
        if (val !== clean) {
          ngModelCtrl.$setViewValue(clean);
          ngModelCtrl.$render();
        }
        return clean;
      });

      element.bind('keypress', function(event) {
        if(event.keyCode === 32) {
          event.preventDefault();
        }
      });
    }
  };
});

//ex: <number-only-input input-value="wks.number" input-name="wks.name"/>
app.directive('numberOnlyInput', function () {
    return {
        restrict: 'EA',
        template: '<input name="{{inputName}}" ng-model="inputValue" />',
        scope: {
            inputValue: '=',
            inputName: '='
        },
        link: function (scope) {
            scope.$watch('inputValue', function(newValue,oldValue) {
                var arr = String(newValue).split("");
                if (arr.length === 0) return;
                if (arr.length === 1 && (arr[0] == '-' || arr[0] === '.' )) return;
                if (arr.length === 2 && newValue === '-.') return;
                if (isNaN(newValue)) {
                    scope.inputValue = oldValue;
                }
            });
        }
    };
});

//<select-box name="demo" ng-model="myValue" options="myOptions" 
//optExp="t.name for t in options | orderBy:'name'" defaultLabel="Select One"></select-box>

app.directive('selectBox', function () {
    return {
        replace: true,
        restrict: 'E',
        scope: true,
        // link: function (scope, el, attrs) {
        //     scope.$watch(attrs.ngModel, function () {
        //         var model = scope.$eval(attrs.ngModel);
        //         //when value changes, update the selectBox text
        //         if (angular.isDefined(model) && angular.isDefined(model.name)) {
        //             el[0].firstChild.innerText = model.name;
        //         }
        //     });
        // },
        template: function (element, attrs) {
            if (!angular.isDefined(attrs.defaultLabel))
                attrs.defaultLabel = "";

            return '<div class="selectBox selector">'+
                        '<select class="' + attrs.class +'" name="' + attrs.name + '" ng-model="' + attrs.ngModel + '" ng-options="' + attrs.optexp + '"' + ((attrs.required) ? ' required' : '') + '></select>'+
                   '</div>';
        }
        
    }
  });

// ex: <button confirmed-click="sayHi()" 
// ng-confirm-click="Would you like to say hi?">Say hi to {{ name }}</button>
app.directive('ngConfirmClick', [function(){
  return {
      link: function (scope, element, attr) {
          var msg = attr.ngConfirmClick || "Are you sure?";
          var clickAction = attr.confirmedClick;
          element.bind('click',function (event) {
              if ( window.confirm(msg) ) {
                  scope.$eval(clickAction)
              }
          });
      }
  };
}])


app.directive('ensureUnique', ['$http', function($http) {
  return {
    require: 'ngModel',
    link: function(scope, ele, attrs, c) {
      scope.$watch(attrs.ngModel, function() {
        $http({
          method: 'POST',
          url: '/customer/name/' + attrs.ensureUnique,
          data: {'field': attrs.ensureUnique}
        }).success(function(data, status, headers, cfg) {
          c.$setValidity('unique', data.isUnique);
        }).error(function(data, status, headers, cfg) {
          c.$setValidity('unique', false);
        });
      });
    }
  }
}]);

// ex: <product-select selected-model="selected.item" options="axleTypes"></name-value-select>
app.directive('productSelect', ['$http', function($http) {
  return {
    replace: true,
    restrict: "E",
    scope: true,
    template: function(ele, attrs) {
      return '<span><select class="' + attrs.class +'" ng-model="' +
       attrs.ngModel + '" ng-options="' + attrs.optexp + '"' + ((attrs.required) ? ' required' : '') + '></select></span>';
    }
    // template: '<select ng-model="selectedModel" class="form-control text-center">'+
    //     '<option value="">defaultText</option>'+
    //     '<option ng-repeat="repeat" value="value">name</option>'+
    //   '</select>'
  };
}]);

//<input type="text" ng-model="name" ng-model-onblur ng-change="update()" />
// override the default input to update on blur
app.directive('ngModelOnblur', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        priority: 1, // needed for angular 1.2.x
        link: function(scope, elm, attr, ngModelCtrl) {
            if (attr.type === 'radio' || attr.type === 'checkbox') return;

            elm.unbind('input').unbind('keydown').unbind('change');
            elm.bind('blur', function() {
                scope.$apply(function() {
                    ngModelCtrl.$setViewValue(elm.val());
                });         
            });
        }
    };
});

