(function () {

    'use strict';

    angular.module('app.accounts')
        .directive('mmmAccountsPanel', accountsPanelDirective);


    // ----- accountsPanelDirective -----
    accountsPanelDirective.$inject = [];

    /* @ngInject */
    function accountsPanelDirective() {

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
