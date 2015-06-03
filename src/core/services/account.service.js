/* jshint -W024 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('accountService', accountService);

    accountService.$inject = ['$http', '$location', '$cacheFactory', 'exception', 'api', '_'];

    /* @ngInject */
    function accountService($http, $location, $cacheFactory, exception, api, _) {
        var service = {
            getAccounts: getAccounts,
            saveAccount: saveAccount,
            clearCache: clearCache
        };

        return service;

        /**
         * Get all accounts.
         * @return {Promise} A promise that returns an array of accounts if resolved
         */
        function getAccounts() {
            return $http.get(api + '/accounts', { cache: true })
                .then(getAccountsSuccess)
                .catch(function(message) {
                    exception.catcher('XHR Failed for getAccounts')(message);
                    $location.url('/');
                });

            function getAccountsSuccess(response) {
                var accounts = response.data;

                // Sort by name
                accounts = _.sortBy(accounts, 'name');

                return accounts;
            }
        }

        function saveAccount(account) {

            // Prepare account for transmission
            var accountXmt = {
                id: account.id,
                name: account.name
            };

            if (!accountXmt.id) {
                return $http.post(api + '/accounts', accountXmt)
                    .then(saveAccountSuccess)
                    .catch(function(message) {
                        exception.catcher('XHR Failed for saveAccount')(message);
                        $location.url('/');
                    });
            }
            else {
                return $http.put(api + '/accounts/' + accountXmt.id, accountXmt)
                    .then(saveAccountSuccess)
                    .catch(function(message) {
                        exception.catcher('XHR Failed for saveAccount')(message);
                        $location.url('/');
                    });
            }

            function saveAccountSuccess(response) {
                return response.data;
            }
        }

        function clearCache() {
            var cache = $cacheFactory.get('$http');
            cache.remove(api + '/accounts');
        }
    }
})();
