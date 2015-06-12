(function() {

    'use strict';

    angular.module('app.settings')
        .directive('mmmSettings', directiveFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/settings/settings.html'
        };

        return directive;
    }
})();
