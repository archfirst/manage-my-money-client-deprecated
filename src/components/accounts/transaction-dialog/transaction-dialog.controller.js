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
        vm.paymentChanged = paymentChanged;
        vm.depositChanged = depositChanged;
        vm.ok = ok;
        vm.deleteTransaction = deleteTransaction;
        vm.cancel = cancel;

        initTxn();
        activate();

        function initTxn() {
            // Make a local copy of the transaction that was passed in
            var txn = angular.copy(transaction);

            // If the amount is specified, then fill in payment or deposit
            if (txn.amount) {
                if (txn.amount < 0) {
                    txn.payment = -(txn.amount);
                }
                else {
                    txn.deposit = txn.amount;
                }
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

        // Only one of payment or deposit should be defined
        function paymentChanged() {
            if (vm.txn.payment && vm.txn.deposit) {
                vm.txn.deposit = undefined;
            }
        }

        // Only one of payment or deposit should be defined
        function depositChanged() {
            if (vm.txn.payment && vm.txn.deposit) {
                vm.txn.payment = undefined;
            }
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

        function deleteTransaction() {
            var txn = vm.txn;
            transactionService.deleteTransaction(txn.id)
                .then(function() {
                    $modalInstance.close(txn);
                });
        }

        function cancel() {
            $modalInstance.dismiss('cancel');
        }
    }

})();
