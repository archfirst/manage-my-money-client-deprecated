(function () {

    'use strict';

    angular.module('app.approot')
        .directive('mmmApproot', directiveFunction);


    // ----- directiveFunction -----
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/approot/approot.html'
        };

        return directive;
    }

})();
