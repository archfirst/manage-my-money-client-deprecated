(function() {

    'use strict';

    angular.module('app.accounts')
        .controller('TransactionDialogController', TransactionDialogController);


    // ----- TransactionDialogController -----
    TransactionDialogController.$inject = [
        '$modalInstance', 'accountService', 'categoryService', 'transactionService', 'transaction'];

    /* @ngInject */
    function TransactionDialogController(
        $modalInstance, accountService, categoryService, transactionService, transaction) {
        var vm = this;
        vm.title = transaction.id ? 'Edit Transaction' : 'Add Transaction';
        vm.accounts = null;
        vm.categories = null;
        vm.txn = null;
        vm.ok = ok;
        vm.cancel = cancel;

        initTxn();
        activate();

        function initTxn() {
            // Make a local copy of the transaction that was passed in
            var txn = angular.copy(transaction);

            if (txn.amount < 0) {
                txn.payment = -(txn.amount);
            }
            else {
                txn.deposit = txn.amount;
            }

            vm.txn = txn;
        }

        function activate() {
            return accountService.getAccounts()
                .then(function(accounts) {
                    vm.accounts = accounts;
                    return categoryService.getCategories();
                })
                .then(function(categories) {
                    vm.categories = categories;
                    return vm.categories;
                });
        }

        function ok() {
            // Prepare transaction for saving
            var txn = vm.txn;
            if (txn.payment) {
                txn.amount = -txn.payment;
            }
            else if (txn.deposit) {
                txn.amount = txn.deposit;
            }

            transactionService.saveTransaction(txn)
                .then(function(txnSaved) {
                    $modalInstance.close(txnSaved);
                });
        }

        function cancel() {
            $modalInstance.dismiss('cancel');
        }
    }

})();
