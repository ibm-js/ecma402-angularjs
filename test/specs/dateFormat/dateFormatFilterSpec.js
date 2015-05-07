define(['angular', 'a9n' ], function(angular, a9n) {


        describe('a9n_dateFormat filter', function() {

            beforeEach(function () {
                var app = module('a9n');
            });

            beforeEach( inject(function (_$filter_) { //<-- Get the filter provider
                $filter = _$filter_;
            }));

            var myDefault =
            {
                locale: 'en',
                curr: 'USD',
                options:
                {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    weekday: "short",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric"
                }
            };


            it('exists', inject(function($filter) {
                expect($filter('a9n_dateFormat')).not.toBeNull();
            }));

            it('is a filter', inject(function(a9n_dateFormatFilter) {
                expect(a9n_dateFormatFilter).not.toBeNull();
            }));

            var testDate = new Date(1958,6,25,6,30);
            it('formats date correctly - mixed form', inject(function(a9n_dateFormatFilter) {
                expect(a9n_dateFormatFilter(testDate, myDefault.options, myDefault.locale)).toBe('Fri, July 25, 1958 at 6:30:00 AM');
            }));

            it('formats date correctly picks up locale from options', inject(function(a9n_dateFormatFilter) {
                var opts = {locale:'de'};
                expect(a9n_dateFormatFilter(testDate, opts)).toBe('25.7.1958');
            }));

            var numericOptions =
            {
                year: "numeric",
                month: "numeric",
                day: "numeric"
            };
            it('formats date correctly - numeric form', inject(function(a9n_dateFormatFilter) {
                expect(a9n_dateFormatFilter(testDate, numericOptions, myDefault.locale)).toBe('7/25/1958');
            }));

            it('formats date correctly - numeric form + no locale specified', inject(function(a9n_dateFormatFilter) {
                expect(a9n_dateFormatFilter(testDate, numericOptions)).toBe('7/25/1958');
            }));

            it('formats date correctly - DE numeric form', inject(function(a9n_dateFormatFilter) {
                expect(a9n_dateFormatFilter(testDate, numericOptions, 'de')).toBe('25.7.1958');
            }));


        });
    }
);
