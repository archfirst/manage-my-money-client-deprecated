(function() {

    'use strict';

    angular.module('app.accounts')
        .directive('mmmAccounts', directiveFunction)
        .controller('AccountsController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/accounts/accounts.html',
            controller: 'AccountsController',
            controllerAs: 'vm'
        };

        return directive;
    }


    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['logger', 'accountService'];

    /* @ngInject */
    function ControllerFunction(logger, accountService) {

        var vm = this;
        vm.accounts = null;

        activate();

        function activate() {
            return getAccounts().then(function() {
                logger.log('Activated Accounts View');
            });
        }

        function getAccounts() {
            return accountService.getAccounts().then(function(data) {

                vm.accounts = data;
                return vm.accounts;
            });
        }
    }

})();
