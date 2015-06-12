(function() {

    'use strict';

    angular.module('app.accounts')
        .directive('mmmTransactionsPanel', directiveFunction)
        .controller('TransactionsController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/accounts/transactions-panel/transactions-panel.html',
            scope: {
                account: '='
            },
            controller: 'TransactionsController',
            controllerAs: 'vm'
        };

        return directive;
    }

    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['$modal', '$state'];

    /* @ngInject */
    function ControllerFunction($modal, $state) {
        var vm = this;
        vm.addTransaction = addTransaction;
        vm.editTransaction = editTransaction;

        function addTransaction(account_id) {
            // Get today's date in UTC (discard time)
            // e.g. 2015-01-01T09:30:00-04:00 ---> 2015-01-01T00:00:00Z
            var now = new Date();
            var txn_date = new Date( Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) );

            showTransaction({
                account_id: account_id,
                txn_date: txn_date
            });
        }

        function editTransaction(transaction) {
            showTransaction(transaction);
        }

        function showTransaction(transaction) {
            var modalInstance = $modal.open({
                animation: true,
                backdrop: 'static',
                templateUrl: 'components/accounts/transaction-dialog/transaction-dialog.html',
                size: 'sm',
                controller: 'TransactionDialogController',
                controllerAs: 'vm',
                resolve: {
                    transaction: function() {
                        return transaction;
                    }
                }
            });

            modalInstance.result
                .then( function(transaction) {
                    $state.go('accounts.detail', { accountId: transaction.account_id }, { reload: true });
                });
        }
    }

})();
