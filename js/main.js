// scope vars to not pollute window scope
(function(){

	// implement function to determine locale
	function determineLocale(){
		// default Dojo implementation
		return (navigator.language || navigator.userLanguage).toLowerCase();
	}

	// allow to add ?locale=fr in the URL to force a locale.
	var m = window.location.search.match(/locale\=([\w-]*)/);
	var locale = m ? m[1] : determineLocale();
	
	require.config({
        baseUrl: 'js',
		paths: {
			'angular'			: '../bower_components/angular/angular',
			'angular-route'		: '../bower_components/angular-route/angular-route.min',
			'requirejs-dplugins': '../bower_components/requirejs-dplugins',
			'requirejs-text'	: '../bower_components/requirejs-text',
			'ecma402'			: '../bower_components/ecma402',
            'a9n'               : '../src/ibmjs-angular-i18n',
			'nls'				: '../nls'
		},
		
		shim: {
			'angular-route': {
				deps: ['angular'],
				exports: 'angular'
			},
			'angular-resource': {
				deps: ['angular'],
				exports: 'angular'
			},
			angular: {
				exports : 'angular'
			}
		},

		config: {
			"ecma402/locales": /^(ar-(TN|SA|EG)|en|es|he|hi|ja|th|de|zh-Hant|zh-TW)$/
		},

		locale: locale,
		"requirejs-dplugins/i18n": { locale: locale }
	});

	require(['app'], function (app) {
	  app.init(locale);
	});

})();
