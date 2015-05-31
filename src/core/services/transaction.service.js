/* jshint -W024 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('transactionService', transactionService);

    transactionService.$inject = ['$http', '$location', 'exception', 'api', '_'];

    /* @ngInject */
    function transactionService($http, $location, exception, api, _) {
        var service = {
            getTransactions: getTransactions,
            saveTransaction: saveTransaction
        };

        return service;

        function getTransactions(accountId) {
            return $http.get(api + '/transactions?account=' + accountId)
                .then(getTransactionsSuccess)
                .catch(function(message) {
                    exception.catcher('XHR Failed for getTransactions')(message);
                    $location.url('/');
                });

            function getTransactionsSuccess(response) {

                var transactions = response.data;

                // Convert txn_date from String to Date
                _.each(transactions, function(transaction) {
                    transaction.txn_date = new Date(transaction.txn_date);
                });

                // Sort by date
                transactions = _.sortBy(transactions, 'txn_date');

                // Compute balances
                _.each(transactions, function(transaction, index, transactions) {
                    if (index === 0) {
                        transaction.balance = transaction.amount;
                    }
                    else {
                        transaction.balance = transactions[index - 1].balance + transaction.amount;
                    }
                });

                // Reverse the array to show transactions in descending order
                transactions.reverse();

                return transactions;
            }
        }

        function saveTransaction(txn) {

            // Prepare transaction for transmission
            var txnXmt = {
                id: txn.id,
                txn_date: txn.txn_date,
                payee: txn.payee,
                memo: txn.memo,
                amount: txn.amount,
                account_id: txn.account_id,
                category_id: txn.category_id
            };

            if (!txnXmt.id) {
                return $http.post(api + '/transactions', txnXmt)
                    .then(saveTransactionSuccess)
                    .catch(function(message) {
                        exception.catcher('XHR Failed for saveTransaction')(message);
                        $location.url('/');
                    });
            }
            else {
                return $http.put(api + '/transactions/' + txnXmt.id, txnXmt)
                    .then(saveTransactionSuccess)
                    .catch(function(message) {
                        exception.catcher('XHR Failed for saveTransaction')(message);
                        $location.url('/');
                    });
            }

            function saveTransactionSuccess(response) {
                var txnSaved = response.data;
                txnSaved.txn_date = new Date(txnSaved.txn_date);
                return txnSaved;
            }
        }
    }
})();
