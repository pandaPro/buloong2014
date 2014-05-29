var app = angular.module('myApp', []);

$scope.options = [{ name: "a", id: 1 }, { name: "b", id: 2 }];
$scope.selectedOption = $scope.options[1];

$scope.editorEnabled = false;