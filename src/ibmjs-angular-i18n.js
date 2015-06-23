/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013, 2015. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
 
define(['angular', 'ecma402/Intl'],

	function(angular, ecma402Intl) {

	'use strict';

	var module = angular.module('a9n', []);

	module.provider('LocalizationService', [function() {

		// Service used to localize and format strings
		//
		// Example of configuration
		// app.config(['LocalizationServiceProvider', function(LocalizationServiceProvider){
		//	LocalizationServiceProvider.setLocale(locale);
		//	LocalizationServiceProvider.setDefaultDateFormatterOptions({
		//		month: "narrow"
		//	});
		//}]);

		// To translate a string use the getLocalizedString() method.
		// Examples:
		//	LocalizationService.getLocalizedString("KEY");
		//	LocalizationService.getLocalizedString("KEY", "myResourceBundle", params);

		// To format a date use the formatDate() method.
		// Examples:
		//	LocalizationService.formatDate(new Date());
		//	LocalizationService.formatDate(new Date(), "fr", myDateFormatOptions);

		// To format a number use the formatNumber() method.
		// Examples:
		//	LocalizationService.formatNumber(1.25);
		//	LocalizationService.formatNumber(1.25, "fr", "percent", myNumberFormatOptions){

		var bundles = {};
		var currentBundle = null;
		var currentName = null;
		var defaultLocale = 'en'; // added a default to simplify unit testing
		var defaultDateFormatter;
		var defaultDateFormatterOptions = {year:"numeric", month:"numeric", day:"numeric"};
		var defaultDecimalFormatter;
		var defaultDecimalFormatterOptions = { style: "decimal", useGrouping: 	"true" };
		var defaultCurrencyFormatter;
		var defaultCurrencyFormatterOptions = { style: "currency", useGrouping:	"true" };
		var defaultPercentFormatter;
		var defaultPercentFormatterOptions = { style: "percent"};
		var DEBUG = false;

		this.setLocale = function(pLocale){
			// Sets the locale used by this service.
			// pLocale The locale to use.
			defaultLocale = pLocale;
		};

		this.setDefaultDateFormatterOptions = function(options){
			// Sets the default options of the date formatter.
			// options: the date formatter options
			angular.extend(defaultDateFormatterOptions, options);
		};

		this.setDefaultDecimalFormatterOptions = function(options){
			// Sets the default options of the decimal number formatter.
			// options: the decimal number formatter options
			angular.extend(defaultDecimalFormatterOptions, options);
		};

		this.setDefaultCurrencyFormatterOptions  = function(options){
			// Sets the default options of the currency formatter.
			// options: the currency formatter options
			angular.extend(defaultCurrencyFormatterOptions , options);
		};

		this.setDefaultPercentFormatterOptions = function(options){
			// Sets the default options of the percent number formatter.
			// options: the percent number formatter options
			angular.extend(defaultPercentFormatterOptions, options);
		};
		
		this.debugEnabled = function(mode){
			DEBUG = mode;
		};

		this.$get = ["$log", function($log){

			function logImpl(type, message){
				if(type){
					$log[type]("[localizationService] " + message);
				}
			}

			function logDebug(message){
				logImpl("debug", message);
			}

			function logInfo(message){
				logImpl("info", message);
			}

			function logError(message){
				logImpl("error", message);
			}

			function logWarning(message){
				logImpl("warn", message);
			}

			function registerResourceBundle(name, rb){
				// Registers a resource bundle
				// Following calls to getLocalizedString() can use this bundle.
				if(!bundles[name]){
					bundles[name] = rb;
				}
			}

			function unregisterResourceBundle(name){
				// Unregisters a resource bundle.
				delete bundles[name];
			}

			function setDefaultResourceBundle(name){
				// Sets the current bundle to use.
				// All calls to getLocalizedString() will use this resource bundle if bundle parameter is omitted.
				if(currentName !== name){
					currentBundle = bundles[name];
					currentName = name;
					logDebug("current resource bundle changed: "+name);
					if(!currentBundle){
						logWarning("current resource bundle not loaded: "+name);
					}
				}
			}
			
			function getDefaultResourceBundle(){
				// Returns the name of the default resource bundle.
				return currentName;
			}

			function getBundle(bundleName){
				// Returns the resource bundle previously registered with the specified name.
				//	bundleName: The name of the resource bundle.
				return bundles[bundleName];
			}

			function useResourceBundle(name, rb){
				// Registers a resource bundle and use it as default resource bundle.
				registerResourceBundle(name, rb);
				setDefaultResourceBundle(name);
			}

			function substitute(s, map){
				// Substitutes a string containing parameters in ${} by the corresponding property in object.
				// ex substitute("error code: ${code}", {code: "500"}) returns "error code: 500"
				// Based on dojo/string.js
				return s.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,
					function(match, key, format){

						var value = map[key];
						if(value === undefined){
							logWarning("\"" + s + "\" missing property "+key+" in the map");
						}

						return value;
					}); // String
			}

			function getLocalizedString(key, resourceBundleName, params){
				// Returns a localized string
				//	key: Key of the string in to the resource bundle
				//	resourceBundleName: Name of the resource bundle
				//	params (optional): If the localized string contains parameters
				//		(ex: ${parameter}) the map of params to use.

				if(!key){
					logError("key is undefined.");
					return "";
				}

				var rb = currentBundle;
				if(resourceBundleName){
					rb = bundles[resourceBundleName];
					if(!rb){
						logError("no current resource bundle set and no resource bundle specified");
						return "";
					}
				}else if(!rb){
					logError("resource bundle '" + resourceBundleName + "' undefined");
					return "";
				}

				var v = rb[key];

				if(!v){
					var msg = "missing '"+key+"' resource in bundle '" + (resourceBundleName?resourceBundleName:currentName) + "'";
					if(DEBUG){
						logWarning(msg);
						return "$" + key + "$";
						
					}
					logError(msg);
					return "";
				}
				
				if(params){
					v = substitute(v, params);
				}

				return v;
			}

			function formatDate(date, locale, options){
				//Formats a date using ECMA402 library.
				//	date: a Date instance
				//	locale (optional): a specific locate
				//	options (optional): options of formatter
				//		see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat

				if(!date || !angular.isDate(date)){
					return "";
				}

				if(options == null && locale == null){
					if(!defaultDateFormatter){
						defaultDateFormatter = new ecma402Intl.DateTimeFormat(defaultLocale, defaultDateFormatterOptions);
					}
					return defaultDateFormatter.format(date);
				}

				if(options === null){
					options = defaultDateFormatterOptions;
				}

				var df = new ecma402Intl.DateTimeFormat(locale || defaultLocale, options || {});

				return df.format(date);
			}

			function formatNumber(number, locale, style, options){
				//Formats a date using ECMA402
				//	number: a number to format
				//	locale (optional): a specific locate.
				//	style (optional): "decimal", "currency" or "percent", default is "decimal".
				//	options (optional): options of formatter.
				//		see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat

				if(number == null){
					return "";
				}

				// default use case, no specific formatter, reuse default one or create it lazily.
				if(options == null && locale == null){
					var formatter;

					switch(style){
						case "percent":
							formatter = defaultPercentFormatter;
							if(formatter == null){
								formatter = defaultPercentFormatter =
									new ecma402Intl.NumberFormat(defaultLocale, defaultPercentFormatterOptions);
							}
							break;
						case "currency":
							formatter = defaultCurrencyFormatter;
							if(formatter == null){
								formatter = defaultCurrencyFormatter =
									new ecma402Intl.NumberFormat(defaultLocale, defaultCurrencyFormatterOptions);
							}
							break;
						default:
							style = "decimal";
							formatter = defaultDecimalFormatter;
							if(formatter == null){
								formatter = defaultDecimalFormatter =
									new ecma402Intl.NumberFormat(defaultLocale, defaultDecimalFormatterOptions);
							}
							break;
					}
					return formatter.format(number);
				}

				// specific locale or format options, create a specific formatter.
				var defaults;
				switch(style){
					case "percent":
						defaults = defaultPercentFormatterOptions;
						break;
					case "currency":
						defaults = defaultCurrencyFormatterOptions;
						break;
					default:
						defaults = defaultDecimalFormatterOptions;
						break;
				}

				var opts = {};
				angular.extend(opts, defaults); // clone defaults
				angular.extend(opts, options); // override defaults with parameter

				var df = new ecma402Intl.NumberFormat(locale || defaultLocale, opts);

				return df.format(number);
			}

			return {
				registerResourceBundle: registerResourceBundle,
				unregisterResourceBundle: unregisterResourceBundle,
				setDefaultResourceBundle: setDefaultResourceBundle,
				getDefaultResourceBundle: getDefaultResourceBundle,
				useResourceBundle: useResourceBundle,
				getLocalizedString: getLocalizedString,
				formatDate: formatDate,
				formatNumber: formatNumber
			};

		}];

	}]);

//
//
//
//  Filters
//
//
//
	module.filter('translate', ['LocalizationService', function(localizationService){
		// Filter to translate a string
		// Examples:
		// {{ "KEY" | translate }}
		// ng-bind = "'KEY' | translate:{bundle:'MyBundle', params:{name: 'User'}}"
		return function(input, options){
			var bundle, parameters;
			if(options){
				if(options.hasOwnProperty("bundle")){
					bundle = options.bundle;
				}
				parameters = options.params;
			}
			if(input){
				return localizationService.getLocalizedString(input, bundle, parameters);
			} else {
				return ""; 
			}
		};
	}]);

	function getLocale(opts){
		var locale;
		if(opts){
			locale = opts.locale;
			delete opts.locale;
		}
		return locale;
	}

	function isEmpty(obj){
		for(var p in obj){
			return false;
		}
		return true;
	}

	module.filter('a9n_dateFormat', ['$log', 'LocalizationService', function($log, localizationService) {
        // Filter to format a date.
        // {{property | a9n_dateFormat}}
        // or
        // ng-bind="property | a9n_dateFormat:{year: 'numeric', month: 'short', day: 'numeric'}"
		return function( aDate, optionsList, targetLocale) {
			$log.debug("a9n_dateFormat::aDate[" + aDate + "] aLocale[" + targetLocale + "] optionsList[", optionsList, "]");

            // look for locale in options list and pull it out if found
            var locale = getLocale(optionsList);
            if(locale) {
                optionsList = isEmpty(optionsList) ? null : optionsList;
            }
            // only use options list locale if there is no direct locale override parameter
            if(!targetLocale) {
                targetLocale = locale;
            }

            /*    toggle service call / ecma402 direct call blocks by using 1 or 2 leading slashes
            var df = new ecma402Intl.DateTimeFormat(aLocale, optionsList || optionDefaults.date);
            return df.format(aDate);
            /*/
			return localizationService.formatDate(aDate, targetLocale, optionsList);
			//*/
		}
	}]);

	module.filter('a9n_numberFormat', ['$log', 'LocalizationService', function($log, localizationService) {
        // Filter to format a decimal number.
        // {{property | a9n_numberFormat}}
        // or
        // ng-bind="property | a9n_numberFormat:{minimumSignificantDigits: 2}"
		return function( aNumber, optionsList, targetLocale) {
			$log.debug("a9n_numberFormat::aNumber["+aNumber+"] aLocale["+targetLocale+"] optionsList[",optionsList,"]");

            // look for locale in options list and pull it out if found
            var locale = getLocale(optionsList);
            if(locale) {
                optionsList = isEmpty(optionsList) ? null : optionsList;
            }
            // only use options list locale if there is no direct locale override parameter
            if(!targetLocale) {
                targetLocale = locale;
            }

			/*    toggle blocks by using 1 or 2 leading slashes
			var numbIBMFormatter = new ecma402Intl.NumberFormat(aLocale, optionsList || optionDefaults.number);
			return numbIBMFormatter.format(aNumber);
			/*/
			return localizationService.formatNumber(aNumber, targetLocale, "decimal", optionsList);
		    //*/
		}
	}]);

	module.filter('a9n_currencyFormat', ['$log', 'LocalizationService', function($log, localizationService) {
        // Filter to format an amount of currency.
        // {{property | a9n_currencyFormat}}
        // or
        // ng-bind="property | a9n_currencyFormat:{minimumSignificantDigits: 2}"
		return function( amount, optionsList, targetLocale, targetCurrency) {
			$log.debug("a9n_currencyFormat::amount["+amount+"] targetLocale["+targetLocale+"] targetCurrency["+targetCurrency+"]");

            // look for locale in options list and pull it out if found
            var locale = getLocale(optionsList);
            if(locale) {
                optionsList = isEmpty(optionsList) ? null : optionsList;
            }
            // only use options list locale if there is no direct locale override parameter
            if(!targetLocale) {
                targetLocale = locale;
            }

            //
            var targetOptions = {};
			if(optionsList) {
                angular.extend(targetOptions, optionsList);
            }
			if(targetCurrency) {
                targetOptions.currency = targetCurrency;
            }

			$log.debug("targetOptions[",targetOptions,"] optionsList[",optionsList,"]");
			$log.debug("locale:: ",targetLocale);

			/*    toggle blocks by using 1 or 2 leading slashes
			var nf = new ecma402Intl.NumberFormat(targetLocale, targetOptions);
			return nf.format(amount);
			/*/
 			return localizationService.formatNumber(amount, targetLocale, "currency", targetOptions);
			//*/
		}
	}]);

    module.filter('a9n_percentFormat', ['$log', 'LocalizationService', function($log, localizationService) {
        // Filter to format a number as a percent.
        // {{property | a9n_percentFormat}}
        // or
        // ng-bind="property | a9n_percentFormat:{minimumSignificantDigits: 2}"
        return function( number, optionsList, targetLocale) {
            $log.debug("a9n_percentFormat::amount["+number+"] targetLocale["+targetLocale+"]");

            // look for locale in options list and pull it out if found
            var locale = getLocale(optionsList);
            if(locale) {
                optionsList = isEmpty(optionsList) ? null : optionsList;
            }
            // only use options list locale if there is no direct locale override parameter
            if(!targetLocale) {
                targetLocale = locale;
            }

            var targetOptions = {};
            if(optionsList) {
                angular.extend(targetOptions, optionsList);
            }

            $log.debug("targetOptions[",targetOptions,"] optionsList[",optionsList,"]");
            $log.debug("locale:: ",targetLocale);

            /*    toggle blocks by using 1 or 2 leading slashes
            var nf = new ecma402Intl.NumberFormat(targetLocale, targetOptions);
            return nf.format(amount);
            /*/
            return localizationService.formatNumber(number, targetLocale, "percent", targetOptions);
            //*/
        }
    }]);

	//
	// filter facade over browser built-in Intl object w/ fallback to ECMAScript filter methods
    //
    // supplied for completeness allowing both ECMA402 & native Intl access. Recommended method is for an application
    // to use a single configured implementation throughout your application.
	//
	module.filter('intl_dateFormat', ['$log', 'LocalizationService', function($log, localizationService)
	{
		return function( aDate, aLocale, optionsList)
		{
			$log.debug("intl_dateFormat::aDate["+aDate+"] aLocale["+aLocale+"] optionsList[",optionsList,"]");
			if (typeof Intl !== "undefined")
			{
				var dateNativeFormatter = new Intl.DateTimeFormat(aLocale, optionsList);
				return dateNativeFormatter.format(aDate);
			}
			else
			{
				$log.warn("Intl NOT defined...calling localizationService...");
				return localizationService.formatDate(aDate, aLocale, optionsList);
			}
		}
	}]);

	module.filter('intl_numberFormat', ['$log', 'LocalizationService', function($log, localizationService)
	{
		return function( aNumber, aLocale, optionsList)
		{
			if (typeof Intl !== "undefined")
			{
				$log.debug("intl_numberFormat::aNumber["+aNumber+"] aLocale["+aLocale+"] optionsList[",optionsList,"]");
				var numbNativeFormatter = new Intl.NumberFormat(aLocale, optionsList);
				return numbNativeFormatter.format(aNumber);
			}
			else
			{
				$log.warn("Intl NOT defined...calling localizationService...");
				return localizationService.formatNumber(aNumber, aLocale, "decimal", optionsList);
			}
		}
	}]);

	module.filter('intl_currencyFormat', ['$log', 'LocalizationService', function($log, localizationService)
	{
		return function( amount, targetLocale, targetCurrency)
		{
			if (typeof Intl !== "undefined")
			{
				$log.debug("intl_currencyFormat::amount["+amount+"] targetLocale["+targetLocale+"] targetCurrency["+targetCurrency+"]");
				var nfOptions = {style: 'currency', currency: targetCurrency};
				var nf = new Intl.NumberFormat(targetLocale, nfOptions);
				return nf.format(amount);
			}
			else
			{
				$log.warn("Intl NOT defined...calling localizationService...");
				return localizationService.formatNumber(amount, targetLocale, "currency", optionsList);
			}
		}
	}]);

//
//
//
//  Directives
//
//
//
	module.directive('translate',
		// 'translate' directory
		// Fills a tag with the localized string using the localization service.
		// The string key is the content of tag or the content of the i18n attribute
		// The resource bundle name is the content of the i18n-bundle attribute or the scope.i18nBundle value.
		// If none is specified the default resource bundle set on the localization service.
		// If the strings contains parameters (ex: ${parameter}), they must be defined in the i18n-params attribute (Angular expression).
		// examples:
		// <span translate>KEY</span>
		// <span translate="KEY"></span>
		// <span translate i18n-bundle="myBundle">KEY</span>
		// <span translate i18n-params="{name:'User'}">KEY</span>  // KEY is "Hello ${name}"
		// <span translate i18n-params="user">KEY</span>           // scope.user == { name : "User"}

		['LocalizationService', function(localizationService){
			return {
				restrict:"A",
				scope: {
					i18nParams: "=?"
				},
				link:function (scope, elm, attrs) {

					var key = attrs.translate;
					if(!key){
						key = elm.text().trim();
					}
					// Look in attribute first then scope.
					// Scope is isolated, look for i18nBundle in parent scope.
					var rb = attrs.i18nBundle || scope.$parent.i18nBundle; 
					var params = null;
					var string;
					if(attrs.i18nParams){
						params = scope.i18nParams;
						scope.$watch('i18nParams', function(value){
							if(value){
								params = scope.i18nParams;
								string = localizationService.getLocalizedString(key, rb, params);
								elm.text(string);
							}
						}, true);
					}else{
						string = localizationService.getLocalizedString(key, rb, params);
						elm.text(string);
					}
				}
			};
		}]);

	module.directive('resourceBundle',
		// 'resource-bundle' directive
		// Creates a child scope with the i18nBundle property set to the attibute value (a String).
		// All children DOM elements using the translate directive will use this resource bundle.
		// examples:
		//	<div resource-bundle="myBundle">
		//		<span translate>KEY</span> // KEY, KEY2 and KEY3 will be looked in "myBundle"
		//		<span translate>KEY2</span>
		//		<span translate>KEY3</span>
		// </div>

		['$parse', function($parse){
			return {
				restrict:"A",
				scope: true,
				compile: function(element, attributes){
					return {
						pre: function (scope, elm, attrs) {
							scope.i18nBundle = attrs.resourceBundle;
						}
					};
				}
			};
		}]);

	module.directive('a9nDateFormat',
		// 'a9nDateFormat' directive
		// Formats the date in the attribute (scope model) and set the result as the inner text of the node.
		// Optional format can be set in format-options attribute (expression)
		// Optional locale can be set in the format-locale attribute (string)
		// <span a9n-date-format="new Date()"></span>
		// <span a9n-date-format="operation.date" format-options="{month: 'numeric'}"></span>
		// <span a9n-date-format="operation.date" format-options="{month: 'numeric'} format-locale="fr"></span>

		['$parse', 'LocalizationService', function($parse, LocalizationService){
			return {
				restrict:"A",
				scope: {
					a9nDateFormat: "=",
					formatOptions: "&?",
					formatLocale: "@?"
				},
				link:function (scope, elm, attrs) {
					scope.$watch('a9nDateFormat', function(value){
							if(value){
								var opts = scope.formatOptions() || null; // do not allow undefined
								var string = LocalizationService.formatDate(scope.a9nDateFormat, scope.formatLocale, opts);
								elm.text(string);
							}
						}, true);
				}
			};
		}]);

		module.directive('a9nNumberFormat',
		// 'a9nNumberFormat' directive
		// Formats the number in the attribute (scope model) as a decimal number and set the result as the inner text of the node.
		// Optional format can be set in format-options attribute (expression)
		// Optional locale can be set in the format-locale attribute (string)
		// <span a9n-number-format="1500"></span>
		// <span a9n-number-format="amount" format-options="{minimumSignificantDigits: 2}"></span>
		// <span a9n-number-format="amount" format-locale="fr"></span>

		['$parse', 'LocalizationService', function($parse, LocalizationService){
			return {
				restrict:"A",
				scope: {
                    a9nNumberFormat: "=",
					formatOptions: "&?",
					formatLocale: "@?"
				},
				link:function (scope, elm, attrs) {
					scope.$watch('a9nNumberFormat', function(value){
							if(value){
								var opts = scope.formatOptions() || null; // do not allow undefined
								var string = LocalizationService.formatNumber(scope.a9nNumberFormat, scope.formatLocale, "decimal", opts);
								elm.text(string);
							}
						}, true);
				}
			};
		}]);

	module.directive('a9nPercentFormat',
		// 'a9nPercentFormat' directive
		// Formats the number in the attribute (scope model) as a percentage number and set the result as the inner text of the node.
		// Optional format can be set in format-options attribute (expression)
		// Optional locale can be set in the format-locale attribute (string)
		// <span a9n-percent-format="0.206"></span>
		// <span a9n-percent-format="vat" format-options="{minimumSignificantDigits:10}"></span>
		// <span a9n-percent-format="vat" format-locale="fr"></span>

		['$parse', 'LocalizationService', function($parse, LocalizationService){
			return {
				restrict:"A",
				scope: {
					a9nPercentFormat: "=",
					formatOptions: "&?",
					formatLocale: "@?"
				},
				link:function (scope, elm, attrs) {
					scope.$watch('a9nPercentFormat', function(value){
							if(value){
								var opts = scope.formatOptions() || null; // do not allow undefined
								var string = LocalizationService.formatNumber(scope.a9nPercentFormat, scope.formatLocale, "percent", opts);
								elm.text(string);
							}
						}, true);
				}
			};
		}]);

	module.directive('a9nCurrencyFormat',
		// 'a9nCurrencyFormat' directive
		// Formats the number in the attribute (scope model) as a currency and set the result as the inner text of the node.
		// Optional format can be set in format-options attribute (expression)
		// Optional locale can be set in the format-locale attribute (string)
		// <span a9n-currenty-format="15.99"></span>
		// <span a9n-currenty-format="price" format-options="{minimumFractionDigits:2}"></span>
		// <span a9n-currenty-format="price" format-locale="fr"></span>

		['$parse', 'LocalizationService', function($parse, LocalizationService){
			return {
				restrict:"A",
				scope: {
					a9nCurrencyFormat: "=",
					formatOptions: "&?",
					formatLocale: "@?"
				},
				link:function (scope, elm, attrs) {
					scope.$watch('a9nCurrencyFormat', function(value){
							if(value){
								var opts = scope.formatOptions() || null; // do not allow undefined
								var string = LocalizationService.formatNumber(scope.a9nCurrencyFormat, scope.formatLocale, "currency", opts);
								elm.text(string);
							}
						}, true);
				}
			};
		}]);

	module.provider('routeBuilder', function() {
		// Service that creates a route definition that loads on demand
		// the resource bundle and the controller.
		// Based of http://weblogs.asp.net/dwahlin/dynamically-loading-controllers-and-views-with-angularjs-and-requirejs
		// and enhanced to load resource bundles.
		// Must be a provider since it will be injected into module.config()
		// Example of usage
		//	app.config(['$routeProvider', "$controllerProvider", "routeBuilderProvider",
		//	function($routeProvider, $controllerProvider, routeBuilderProvider) {
		//		//Extend controllers module with a function that allows
		//		//dynamic registration of controllers.
		//		controllersModule.register = {
		//			controller: $controllerProvider.register
		//		};
		//		routeBuilderProvider.routeConfig.setRootDirectories(
		//			'js/templates/' + (isMobile?"mobile/":""),
		//			'controllers/',
		//			'nls/'
		//		);
		//		$routeProvider.
		//			when('/view', routeBuilderProvider.build({
		//				templateUrl: 'view.html',
		//				controller: 'ViewCtrl',
		//				nls: 'view'
		//			}));
		//	}
		//]);
		//
		//	Declaration of the controller must be in the form:
		//		controllersModule.register.controller('MyController', []);
		//
		this.$get = function() {
			return this;
		};

		this.routeConfig = (function() {

			// Route builder configuration

			var templatesRoot = 'js/templates/';
			var controllersRoot = 'controllers/';
			var nlsRoot = 'nls/';
			var defaultResolve = null;
			
			function setRootDirectories(pTemplatesRoot, pControllersRoot, pNlsRoot) {
				// Sets the root directories of templates, controllers and resource bundles
				// used by build() service
				// Default templates root is 'js/templates/'
				// Default controllers root is 'controllers/'
				// Default resource bundle root is 'nls/'
				if(pTemplatesRoot){
					templatesRoot = pTemplatesRoot;
				}
				if(pControllersRoot){
					controllersRoot = pControllersRoot;
				}
				if(pNlsRoot){
					nlsRoot = pNlsRoot;
				}
			}
			
			function setDefaultResolve(pResolve){
				defaultResolve = pResolve;
			}
			
			function getDefaultResolve(){
				return defaultResolve;
			}

			function getTemplatesRoot() {
				// Returns the root URI of view templates.
				return templatesRoot;
			}

			function getControllersRoot() {
				// Returns the root URI of the view controllers.
				return controllersRoot;
			}

			function getNlsRoot() {
				// Returns the root URI of the resource bundles.
				return nlsRoot;
			}

			return {
				setRootDirectories: setRootDirectories,
				getControllersRoot: getControllersRoot,
				getTemplatesRoot: getTemplatesRoot,
				getNlsRoot: getNlsRoot,
				setDefaultResolve: setDefaultResolve,
				getDefaultResolve: getDefaultResolve
			};
		})();

		this.build = (function(routeConfig) {

			// Builds a route definition for the route service from a specified definition object.
			// This object must have the following properties
			// - templateURL: template file name from templates root directory
			// - controller: controllers name, must be same angular controller name and file name to be loaded by requireJS
			// - nls: file from the nls root dir (without locale, automatically added by i18n plugin)
			return function(definition) {
			
				var resolve = {
					_dependencies: [
							'$q',
							'LocalizationService',
							function($q, LocalizationService) {
								var defer = $q.defer();
								require([
									"requirejs-dplugins/i18n!" + routeConfig.getNlsRoot() + definition.nls,
									routeConfig.getControllersRoot() + definition.controller
								], function(resourceBundle){
									LocalizationService.useResourceBundle(definition.nls, resourceBundle);
									defer.resolve();
								});
								return defer.promise;
							}
						]
				};
				
				var defaultResolve = routeConfig.getDefaultResolve();
				if(defaultResolve){
					angular.extend(resolve, defaultResolve);
				}
			
				return {
					templateUrl: routeConfig.getTemplatesRoot() + definition.templateUrl,
					controller: definition.controller,
					resolve: resolve
				};
			};

		})(this.routeConfig);
	});

	//
	return module;
});