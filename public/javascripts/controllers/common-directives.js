var app = angular.module('myApp', []);

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