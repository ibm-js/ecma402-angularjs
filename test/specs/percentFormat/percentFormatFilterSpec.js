define(['angular', 'angularMocks', 'a9n' ], function(angular, moscks, a9n) {


        describe('a9n_percentFormat filter', function() {

            beforeEach(function () {
                module('a9n');
            });


            beforeEach( inject(function (_$filter_) { //<-- Get the filter provider
                $filter = _$filter_;
            }));

            it('exists', inject(function($filter) {
                expect($filter('a9n_percentFormat')).not.toBeNull();
            }));

            it('is a filter', inject(function(a9n_percentFormatFilter) {
                expect(a9n_percentFormatFilter).not.toBeNull();
            }));

            it('formats percent correctly for en', inject(function(a9n_percentFormatFilter) {
                expect(a9n_percentFormatFilter('.10', "", "en")).toBe('10%');
            }));

            it('formats percent correctly for no locale specified but a default is set', inject(function(a9n_percentFormatFilter) {
                expect(a9n_percentFormatFilter('.750')).toBe('75%');
            }));

            it('formats percent correctly for de', inject(function(a9n_percentFormatFilter) {
                expect(a9n_percentFormatFilter('.50', "", "de")).toBe('50 %');
            }));

            it('formats percent correctly for es', inject(function(a9n_percentFormatFilter) {
                expect(a9n_percentFormatFilter('.789', "{locale:es}")).toBe('79%');
            }));




        });
    }
);



