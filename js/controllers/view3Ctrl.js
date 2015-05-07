define([
        'angular',
        'app',
        'controllers/module'],

    function(angular, module){

        'use strict';


        // dynamically loaded controller
        return module.register.controller('View3Ctrl', [
            '$scope',

            function($scope){
                $scope.thisView = -1;
                $scope.nextView = -1;
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
