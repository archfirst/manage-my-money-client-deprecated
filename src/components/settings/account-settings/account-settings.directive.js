(function() {

    'use strict';

    angular.module('app.settings')
        .directive('mmmAccountSettings', accountSettingsDirective)
        .controller('AccountSettingsController', AccountSettingsController);


    // ----- accountSettingsDirective -----
    accountSettingsDirective.$inject = [];

    /* @ngInject */
    function accountSettingsDirective() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/settings/account-settings/account-settings.html',
            controller: 'AccountSettingsController',
            controllerAs: 'vm'
        };

        return directive;
    }

    // ----- AccountSettingsController -----
    AccountSettingsController.$inject = ['logger', 'accountService'];

    /* @ngInject */
    function AccountSettingsController(logger, accountService) {

        var vm = this;
        vm.accounts = null;
        vm.addAccountName = null;
        vm.editedAccount = null;

        vm.addAccount = addAccount;
        vm.saveAccount = saveAccount;
        vm.editAccount = editAccount;
        vm.cancelEdit = cancelEdit;

        activate();

        function activate() {
            return getAccounts().then(function() {
                logger.log('Activated Accounts View');
            });
        }

        function getAccounts() {

            // Since account settings changes accounts, it should always clear the cache
            accountService.clearCache();

            return accountService.getAccounts().then(function(data) {
                vm.accounts = data;
                return vm.accounts;
            });
        }

        function addAccount() {
            return accountService.saveAccount({ name: vm.addAccountName })
                .then(function() {
                    // Wipe out account name to add
                    vm.addAccountName = undefined;

                    // Fetch fresh list of accounts
                    return getAccounts();
                });
        }

        function saveAccount() {
            return accountService.saveAccount(vm.editedAccount)
                .then(function() {
                    // Cancel the editing
                    cancelEdit();

                    // Fetch fresh list of accounts
                    return getAccounts();
                });
        }

        function editAccount(account) {
            vm.editedAccount = angular.copy(account);
        }

        function cancelEdit() {
            vm.editedAccount = null;
        }
    }

})();
