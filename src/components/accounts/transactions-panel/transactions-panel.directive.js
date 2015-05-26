(function () {

    'use strict';

    angular.module('app.accounts')
        .directive('mmmTransactionsPanel', transactionsPanelDirective);


    // ----- transactionsPanelDirective -----
    transactionsPanelDirective.$inject = [];

    /* @ngInject */
    function transactionsPanelDirective() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/accounts/transactions-panel/transactions-panel.html',
            scope: {
                transactions: '='
            }
        };

        return directive;
    }
})();
