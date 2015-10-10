describe("filter", function() {
    var $scope;

    beforeEach(module('myApp'));

    beforeEach(inject(function($rootScope, $controller) {
      $scope = $rootScope.$new();
      $controller('MyController', {$scope: $scope});
    }));
    
    describe("", function() {
        it("should reverse string", inject (reverseFilter) {
            expect(reverseFilter("ABCD")).toEqual("DCBA");
        })
    })
})