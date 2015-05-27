(function () {

    'use strict';

    angular.module('app.accounts')
        .directive('mmmTransactionsPanel', transactionsPanelDirective)
        .controller('TransactionsController', TransactionsController);


    // ----- transactionsPanelDirective -----
    transactionsPanelDirective.$inject = [];

    /* @ngInject */
    function transactionsPanelDirective() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/accounts/transactions-panel/transactions-panel.html',
            scope: {
                transactions: '='
            },
            controller: 'TransactionsController',
            controllerAs: 'vm'
        };

        return directive;
    }

    // ----- TransactionsController -----
    TransactionsController.$inject = [];

    /* @ngInject */
    function TransactionsController($scope) {
        var vm = this;
        vm.selectedTransactionId = null;
        vm.handleTransactionClicked = handleTransactionClicked;

        function handleTransactionClicked(selectedTransactionId, $event) {

            vm.selectedTransactionId = selectedTransactionId;

            var rowClicked = $event.currentTarget;

            // Edit the transaction
        }
    }

})();
