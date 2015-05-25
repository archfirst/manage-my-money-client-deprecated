(function () {
    'use strict';

    angular
        .module('app.topnav')
        .directive('mmmTopnav', topnavDirective);


    // ----- topnavDirective -----
    topnavDirective.$inject = [];

    /* @ngInject */
    function topnavDirective() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/topnav/topnav.html'
        };

        return directive;
    }

})();
