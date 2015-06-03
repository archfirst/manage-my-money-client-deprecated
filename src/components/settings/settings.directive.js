(function() {

    'use strict';

    angular.module('app.settings')
        .directive('mmmSettings', settingsDirective);


    // ----- settingsDirective -----
    settingsDirective.$inject = [];

    /* @ngInject */
    function settingsDirective() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/settings/settings.html'
        };

        return directive;
    }
})();
