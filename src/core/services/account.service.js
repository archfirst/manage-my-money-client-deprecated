/* jshint -W024 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('accountService', accountService);

    accountService.$inject = ['$http', '$location', 'exception', 'api'];

    /* @ngInject */
    function accountService($http, $location, exception, api) {
        var service = {
            getAccounts: getAccounts
        };

        return service;

        function getAccounts() {
            return $http.get(api + '/accounts', { cache: true })
                .then(getAccountsSuccess)
                .catch(function(message) {
                    exception.catcher('XHR Failed for getAccounts')(message);
                    $location.url('/');
                });

            function getAccountsSuccess(response) {
                return response.data;
            }
        }
    }
})();
