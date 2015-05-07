define(['angular', 'angularMocks', 'a9n' ], function(angular, moscks, a9n) {


        describe('a9n_numberFormat filter', function() {

            beforeEach(function () {
                module('a9n');
            });


            beforeEach( inject(function (_$filter_) { //<-- Get the filter provider
                $filter = _$filter_;
            }));

            it('exists', inject(function($filter) {
                expect($filter('a9n_numberFormat')).not.toBeNull();
            }));

            it('is a filter', inject(function(a9n_numberFormatFilter) {
                expect(a9n_numberFormatFilter).not.toBeNull();
            }));

            it('formats number correctly for en', inject(function(a9n_numberFormatFilter) {
                expect(a9n_numberFormatFilter('10000', {locale:'en'})).toBe('10,000');
            }));

            it('formats number correctly for no locale specified but a default is set', inject(function(a9n_numberFormatFilter) {
                expect(a9n_numberFormatFilter('10000')).toBe('10,000');
            }));

            it('formats number correctly for de', inject(function(a9n_numberFormatFilter) {
                expect(a9n_numberFormatFilter('10000', {locale:'es'}, "de")).toBe('10.000');
            }));

            it('formats number correctly for es', inject(function(a9n_numberFormatFilter) {
                expect(a9n_numberFormatFilter('123456.789', {locale:'es'})).toBe('123.456,789');
            }));

            it('formats number correctly with temporary override of locale as a parameter', inject(function(a9n_numberFormatFilter) {
                var options = {
                    locale: 'en'
                }
                expect(a9n_numberFormatFilter('123456.789', options)).toBe('123,456.789');
                expect(a9n_numberFormatFilter('123456.789', options, "es")).toBe('123.456,789');
            }));

        });
    }
);



