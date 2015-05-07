define([
	'angular',
	'controllers/module'],

	function(angular, module){

	'use strict';

	// dynamically loaded controller
	return module.register.controller('View2Ctrl', [
		'$scope',
		
		function($scope){
			$scope.thisView = 2;
			$scope.nextView = 1;
			$scope.user = {name: "user from view 2"};
			$scope.date = new Date();
			$scope.amount = 1500;
			$scope.vat = 0.085;
			$scope.price = 970.25;
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
					{ url: 'js/templates/view2-dateFormatting.html'},
					{ url: 'js/templates/view2-numberFormatting.html'},
					{ url: 'js/templates/view3-ecma402Demo.html'},
                    { url: 'js/templates/view2-textLocalization.html'}
				];
	}]);

});

