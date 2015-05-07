// Current locale, initialized in app.init()
var locale = null;

// This creates an array of all the Spec files that Karma finds
var allTestFiles = [];
var TEST_REGEXP = /(Spec|_test)\.js$/i;
for (var file in window.__karma__.files) {
    if (TEST_REGEXP.test(file)) allTestFiles.push(file);
}

require.config({
    baseUrl: '/base/bower_components',      // base is the "magic" root used by Karama
    deps: allTestFiles,
    callback: window.__karma__.start,
    paths: {
        'a9n'               : '../js/ibmjs-angular-i18n',
        'ecma402'           : 'ecma402',
        'angular'           : 'angular/angular',
        'angularMocks'      : 'angular-mocks/angular-mocks',
        'requireText'       : 'requirejs-text/text'
    },
    shim: {
        'angular'           : { exports: 'angular' },
        'a9n'               : { exports: 'ibmjs_angular_i18n' },
        'angularMocks'      : { deps: ['angular'], exports: 'angular-mocks' },
        'angular-route'     : { deps: ['angular'], exports: 'angular' },
        'angular-resource'  : { deps: ['angular'], exports: 'angular' }
    },
    config: {
        "ecma402/locales": /^(ar-(TN|SA|EG)|en|es|he|hi|ja|th|de|zh-Hant|zh-TW)$/
    },

    locale: locale,
    "requirejs-dplugins/i18n": { locale: locale },
    "requirejs-dplugins/has": { "intl-api": false }
});

