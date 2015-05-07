define(['angular', 'a9n' ], function(angular, a9n) {

    describe('a9nDateFormat directive', function() {

        var $scope, element, compiledDirective, isolateScope;

        beforeEach(function () {
            module('a9n');
        });

        beforeEach(inject(function(_$rootScope_, _$compile_){
            $scope = _$rootScope_.$new();
            $scope.testDate = new Date(1958,6,25,6,30);
            $scope.dateOptions =
            {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "short",
                hour: "numeric",
                minute: "numeric",
                second: "numeric"
            };
            element = angular.element('<span a9n-date-format="testDate" format-locale="en" format-options="dateOptions"></span>');
            compiledDirective = _$compile_(element)($scope);
            $scope.$digest();
            isolateScope = element.isolateScope();

        }));

        it('has valid data in isolate scope', function() {
            expect(isolateScope.a9nDateFormat.toString()).toEqual("Fri Jul 25 1958 06:30:00 GMT-0400 (EDT)");
            expect(isolateScope.formatLocale).toEqual("en");
        });
    });


    describe('Unit testing a9nDateFormat directive', function() {
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
            $rootScope.testDate = new Date(1977,5,15,9,30);
            $rootScope.dateOptions = {year:"numeric", month:"long", day:"numeric", weekday:"short", hour:"numeric", minute:"numeric", second:"numeric"};
        }));

        it('can format numeric date', function() {
            // setup specific test attributes
            $rootScope.dateOptions = {year:"numeric", month:"numeric", day:"numeric"};
            // Compile a piece of HTML containing the directive
            var compiledDirective = $compile('<span a9n-date-format="testDate" format-locale="en" format-options="dateOptions"></span>')($rootScope);
            // fire all the watches, so the scope expression will be evaluated
            $rootScope.$digest();
            // Check that the compiled element contains the templated content
            expect(compiledDirective.html()).toMatch("6/15/1977");
        });

        it('can format human-friendly date with short weekday', function() {
            // Compile a piece of HTML containing the directive
            var compiledDirective = $compile('<span a9n-date-format="testDate" format-locale="de" format-options="dateOptions"></span>')($rootScope);
            // fire all the watches, so the scope expression will be evaluated
            $rootScope.$digest();
            // Check that the compiled element contains the templated content
            expect(compiledDirective.html()).toMatch("Mi., 15. Juni 1977 um 09:30:00");
        });
    });
});
