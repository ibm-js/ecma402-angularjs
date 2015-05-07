define([
	'angular',
	'controllers/module'],

	function(angular, module){

	'use strict';

	// dynamically loaded controller
	return module.register.controller('View1Ctrl', [
		'$scope',
		
		function($scope){
			$scope.thisView = 1;
			$scope.nextView = 2;
			$scope.user = {name: "user from view 1"};
			$scope.date = new Date(1979,6,9,0,30);
			$scope.amount = 2560.2345;
			$scope.vat = 0.206;
			$scope.price = 1530.25;
			$scope.updateDate = function(){
				var d = $scope.date;
				d.setMonth(3);
				d.setDate(5);
				d.setHours(10);
				d.setMinutes(35);
			};
			$scope.fragments =
				[
					{ url: 'unused'},
					{ url: 'js/templates/view1-dateFormatting.html'},
					{ url: 'js/templates/view1-numberFormatting.html'},
					{ url: 'js/templates/view3-ecma402Demo.html'},
                    { url: 'js/templates/view1-textLocalization.html'}
				];
		}
	]);

});

