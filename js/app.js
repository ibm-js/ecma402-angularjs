define([
	'angular',
	'controllers/module', // initially empty module, controllers actually loaded dynamically
	'controllers/MainCtrl',
	'a9n',
	'angular-route',
], function(angular, controllersModule) {

	'use strict';
	
	// Current locale, initialized in app.init()
	var locale = null;

    // demo app name
    var appName = 'angular-a9n-demo';
	
	// Declare the WLConsole which is the main module = our app
	var app = angular.module(appName, [
		// the list of angular module to inject.
		// the JS files are loaded by requireJS (see above define)
		'ngRoute',
		'Controllers',
		'a9n']);
	
	// view definition and URL mapping.
	app.config(['$routeProvider', "$controllerProvider", "routeBuilderProvider",
	
		function($routeProvider, $controllerProvider, routeBuilderProvider) {
		
			// Extend controllers module with a function that allows
			// dynamic registration of controllers.
			controllersModule.register = {
				controller: $controllerProvider.register
			};
			
			routeBuilderProvider.routeConfig.setRootDirectories(
				'js/templates/',
				'controllers/',
				'nls/'
			);

			$routeProvider.
				when('/view1', routeBuilderProvider.build({
					templateUrl: 'view.html',
					controller: 'View1Ctrl',
					controllerAs: 'vm',			// controller as the view model
					nls: 'view1'
				})).
				when('/view2', routeBuilderProvider.build({
					templateUrl: 'view.html',
					controller: 'View2Ctrl',
					controllerAs: 'vm',			// controller the view model
					nls: 'view2'
				})).
				when('/view3', routeBuilderProvider.build({
					templateUrl: 'view.html',
					controller: 'View3Ctrl',
					controllerAs: 'vm',			// controller the view model
					nls: 'view1'
				})).
				otherwise({
					redirectTo: '/view1'
				});
		}
	]);

	app.config(['LocalizationServiceProvider', function(LocalizationServiceProvider){
		
		LocalizationServiceProvider.setLocale(locale);
		
		// Example of configuration the default format of dates
		// 
		LocalizationServiceProvider.setDefaultDateFormatterOptions({
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
			second: "numeric"
		});
		
		LocalizationServiceProvider.setDefaultCurrencyFormatterOptions({
			currency: "USD"
		})
	}]);
	
	app.init = function(pLocale) {
		// no ng-app directive needed in index.html called by main.js
		locale = pLocale;
		angular.bootstrap(document, [appName]);
	};

	var data =
	{
		date: 1,
		number: 123456.789,
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

	var supportedLocales =
		[
			{code: "en",                            name: "[Default Locale]",               curr: "USD"},
			{code: "ar-SA-u-ca-islamic",            name: "Islamic - Saudi Arabia",         curr: "SAR"},
			{code: "ar-SA-u-ca-islamic-umalqura",   name: "Umalqura - Saudi Arabia",        curr: "SAR"},
			{code: "ar-EG-u-ca-islamic-civil",      name: "Civil - Egypt",                  curr: "EGP"},
			{code: "ar-EG-u-ca-islamic-tbla",       name: "Tabular - Egypt",                curr: "EGP"},
			{code: "ar-TN",                         name: "Arabic - Tunisia",               curr: "TND"},
			{code: "en",                            name: "English",                        curr: "USD"},
			{code: "de",                            name: "German",                         curr: "EUR"},
			{code: "es",                            name: "Spanish",                        curr: "EUR"},
			{code: "he-u-ca-hebrew",                name: "Hebrew w/Hebrew calendar",       curr: "ILS"},
			{code: "hi-u-nu-deva",                  name: "Hindi w/native digits",          curr: "INR"},
			{code: "ja",                            name: "Japanese",                       curr: "JPY"},
			{code: "ja-u-ca-japanese",              name: "Japanese w/Japanese calendar",   curr: "JPY"},
			{code: "th",                            name: "Thai",                           curr: "THB"},
			{code: "th-u-ca-gregory",               name: "Thai w/ Gregorian calendar",     curr: "THB"},
			{code: "zh-Hant",                       name: "T-Chinese",                      curr: "CNY"},
			{code: "zh-TW-u-ca-roc",                name: "T-Chinese w/ ROC calendar",      curr: "CNY"},
			{code: "fr",                            name: "French (not preloaded)",         curr: "EUR"}
		];


	app.controller('AppDataController', function()
	{
		this.values = data;
		this.locales = supportedLocales;
	});

	app.controller('LocaleController', function()
	{
		this.setLocale = function(newLocale, newCurrency)
		{
			data.date = new Date();
			if(newLocale === null)
				data.locale = 'en';
			else
				data.locale = newLocale;
			if(newCurrency === null)
				data.curr = 'USD';
			else
				data.curr = newCurrency;
		};
	});

	return app;
});

