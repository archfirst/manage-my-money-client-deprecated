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
            getTransactions: getTransactions
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

                // Sort by date (descending)
                transactions = _.sortByOrder(transactions, ['txn_date'], [false]);

                // Compute balances
                _.each(transactions, function(transaction, index, transactions) {
                    if (index === 0) {
                        transaction.balance = transaction.amount;
                    }
                    else {
                        transaction.balance = transactions[index - 1].balance + transaction.amount;
                    }
                });

                return transactions;
            }
        }
    }
})();
