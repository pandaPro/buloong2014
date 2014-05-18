describe("filter", function() {
    beforeEach(module("myApp"));
    describe("", function() {
        it("should reverse string", inject (reverseFilter) {
            expect(reverseFilter("ABCD")).toEqual("DCBA");
        })
    })
})