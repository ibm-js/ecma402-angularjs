define(['angular', 'a9n' ], function(angular, a9n) {


        describe('a9n_currencyFormat filter', function() {

            beforeEach(function () {
                module('a9n');
            });

            beforeEach( inject(function (_$filter_) { //<-- Get the filter provider
                $filter = _$filter_;
            }));

            it('exists', inject(function($filter) {
                expect($filter('a9n_currencyFormat')).not.toBeNull();
            }));

            it('is a filter', inject(function(a9n_currencyFormatFilter) {
                expect(a9n_currencyFormatFilter).not.toBeNull();
            }));

            it('formats price correctly for de', inject(function(a9n_currencyFormatFilter) {
                expect(a9n_currencyFormatFilter('100.00', "", "de", "EUR")).toBe('100,00 €');
            }));

        });
    }
);
