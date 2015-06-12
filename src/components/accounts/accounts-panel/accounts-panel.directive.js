(function () {

    'use strict';

    angular.module('app.accounts')
        .directive('mmmAccountsPanel', directiveFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/accounts/accounts-panel/accounts-panel.html',
            scope: {
                accounts: '='
            }
        };

        return directive;
    }
})();
