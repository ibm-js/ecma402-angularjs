define([
	'angular',
	'controllers/module',
	'requirejs-dplugins/i18n!nls/main'],

	function(angular, module, nls){

	'use strict';

	return module.controller('MainCtrl', [
		'$scope',
		'LocalizationService',
		function(
			$scope,
			LocalizationService
		){

		// Manually register the resource bundle
		// as the view is not loaded through a route.
		LocalizationService.useResourceBundle('main', nls);
		
	}]);

});

