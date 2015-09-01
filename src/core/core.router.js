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
                template: '<mmm-transactions-panel class="transactionsPanel"></mmm-transactions-panel>'
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
