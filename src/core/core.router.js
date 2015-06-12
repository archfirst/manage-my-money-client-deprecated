(function() {
    'use strict';

    var core = angular.module('app.core');

    core.config(configFunction);

    configFunction.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

    /* @ngInject */
    function configFunction($locationProvider, $stateProvider, $urlRouterProvider) {

        $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('dashboard', {
                url: '/',
                template: '<mmm-dashboard></mmm-dashboard>'
            })

            .state('accounts', {
                url: '/accounts',
                template: '<mmm-accounts></mmm-accounts>'
            })

            .state('accounts.detail', {
                url: '/:accountId',
                /* jshint maxlen:false */
                /* jscs:disable maximumLineLength */
                template: '<mmm-transactions-panel class="transactionsPanel" data-account="vm.account"></mmm-transactions-panel>',
                resolve: {
                    account: function(transactionService, $stateParams) {
                        var accountId = parseInt($stateParams.accountId, 0);
                        return transactionService.getTransactions(accountId)
                            .then(function(transactions) {
                                return {
                                    id: accountId,
                                    transactions: transactions
                                };
                            });
                    }
                },
                // intermediate controller to capture the result of resolve and pass it to the directive
                controller: ['account', function(account) {
                    this.account = account;
                }],
                controllerAs: 'vm'
            })

            .state('settings', {
                url: '/settings',
                template: '<mmm-settings></mmm-settings>'
            })

            .state('settings.accounts', {
                url: '/accounts',
                template: '<mmm-account-settings class="settingsContent"></mmm-account-settings>'
            })

            .state('settings.categories', {
                url: '/categories',
                template: '<mmm-category-settings class="settingsContent"></mmm-category-settings>'
            });
    }
})();
