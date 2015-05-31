(function() {

    'use strict';

    angular.module('app.accounts')
        .directive('mmmAccounts', accountsDirective)
        .controller('AccountsController', AccountsController);


    // ----- accountsDirective -----
    accountsDirective.$inject = [];

    /* @ngInject */
    function accountsDirective() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/accounts/accounts.html',
            controller: 'AccountsController',
            controllerAs: 'vm'
        };

        return directive;
    }


    // ----- AccountsController -----
    AccountsController.$inject = ['logger', 'accountService'];

    /* @ngInject */
    function AccountsController(logger, accountService) {

        var vm = this;
        vm.accounts = null;

        activate();

        function activate() {
            return getAccounts().then(function() {
                logger.info('Activated Accounts View');
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
