define(['angular', 'a9n' ], function(angular, a9n) {

    describe('a9nPercentFormat directive', function() {

        var $scope, element, compiledDirective, isolateScope;

        beforeEach(function () {
            module('a9n');
        });

        beforeEach(inject(function(_$rootScope_, _$compile_){
            $scope = _$rootScope_.$new();
            $scope.percent = 1530.25;
            $scope.percentOptions = {minimumSignificantDigits:10};
            element = angular.element('<span a9n-percent-format="percent" format-locale="fr" format-options="percentOptions"></span>');
            compiledDirective = _$compile_(element)($scope);
            $scope.$digest();
            isolateScope = element.isolateScope();

        }));

        it('has valid data in isolate scope', function() {
            expect(isolateScope.a9nPercentFormat).toEqual(1530.25);
            expect(isolateScope.formatLocale).toEqual("fr");
        });
    });


    describe('Unit testing a9nCurrencyFormat directive', function() {
        var $compile,
            $rootScope,
            isolateScope,
            compiledDirective;

        // Load the angular-intl module, which contains the directive
        beforeEach(module('a9n'));

        // Store references to $rootScope and $compile
        // so they are available to all tests in this describe block
        beforeEach(inject(function(_$compile_, _$rootScope_){
            // The injector unwraps the underscores (_) from around the parameter names when matching
            $compile = _$compile_;
            $rootScope = _$rootScope_.$new();
            $rootScope.percent = .05;
        }));

        it('can format percent', function() {
            // setup specific test attributes
            $rootScope.percentOptions = {minimumSignificantDigits:5};
            // Compile a piece of HTML containing the directive
            var compiledDirective = $compile('<span a9n-percent-format="percent" format-locale="fr" format-options="percentOptions"></span>')($rootScope);
            // fire all the watches, so the scope expression will be evaluated
            $rootScope.$digest();
            // Check that the compiled element contains the templated content
            expect(compiledDirective.html()).toMatch("5%");
        });

    });
});
