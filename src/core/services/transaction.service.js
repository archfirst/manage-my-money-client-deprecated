/* jshint -W024 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('transactionService', transactionService);

    transactionService.$inject = ['$http', '$location', 'exception', 'api'];

    /* @ngInject */
    function transactionService($http, $location, exception, api) {
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
                // Sort by date and id

                // Compute balances

                return response.data;
            }
        }
    }
})();
