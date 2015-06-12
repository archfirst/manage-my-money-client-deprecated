(function() {

    'use strict';

    angular.module('app.dashboard')
        .directive('mmmDashboard', directiveFunction)
        .controller('DashboardController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/dashboard/dashboard.html',
            controller: 'DashboardController',
            controllerAs: 'vm'
        };

        return directive;
    }


    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['transactionService', 'logger', '_', 'moment'];

    /* @ngInject */
    function ControllerFunction(transactionService, logger, _, moment) {
        var vm = this;
        vm.periods = [
            {name: 'This month'},
            {name: 'Last month'},
            {name: 'Last 3 months'},
            {name: 'Last 6 months'},
            {name: 'Last 12 months'},
            {name: 'This year'},
            {name: 'Last year'},
            {name: 'All time'}
        ];
        vm.startDate = null;
        vm.endDate = null;
        vm.period = null;
        vm.chartdata = null;
        vm.getTransactionsByCategory = getTransactionsByCategory;

        activate();

        function activate() {
            vm.period = vm.periods[0];
            return getTransactionsByCategory().then(function() {
                logger.log('Activated Dashboard View');
            });
        }

        function getTransactionsByCategory() {
            calculateDateRange();
            return transactionService.getTransactionsByCategory(vm.startDate, vm.endDate).then(function(categories) {

                // Separate the positive and negative values, drop the zeros
                var positives = _.filter(categories, function(category) {
                    return category.amount > 0;
                });
                var negatives = _.filter(categories, function(category) {
                    return category.amount < 0;
                });

                // Sort positives in descending order and negatives in ascending order
                positives = _.sortBy(positives, 'amount').reverse();
                negatives = _.sortBy(negatives, 'amount');

                // Merge the two
                var allCategories = positives.concat(negatives);

                // Convert categories to chart data
                var chartdata = _.map(allCategories, function(category) {
                    return {
                        key: category.cat_name,
                        value: category.amount
                    };
                });

                vm.chartdata = chartdata;
                return vm.chartdata;
            });
        }

        function calculateDateRange() {

            var startDate = null;
            var endDate = null;

            switch (vm.period.name) {
                case 'This month':
                    startDate = moment().utc().startOf('month');
                    endDate = moment().utc().endOf('month');
                    break;

                case 'Last month':
                    startDate = moment().utc().subtract(1, 'month').startOf('month');
                    endDate = moment().utc().subtract(1, 'month').endOf('month');
                    break;

                case 'Last 3 months':
                    startDate = moment().utc().subtract(3, 'month').startOf('month');
                    endDate = moment().utc().subtract(1, 'month').endOf('month');
                    break;

                case 'Last 6 months':
                    startDate = moment().utc().subtract(6, 'month').startOf('month');
                    endDate = moment().utc().subtract(1, 'month').endOf('month');
                    break;

                case 'Last 12 months':
                    startDate = moment().utc().subtract(12, 'month').startOf('month');
                    endDate = moment().utc().subtract(1, 'month').endOf('month');
                    break;

                case 'This year':
                    startDate = moment().utc().startOf('year');
                    endDate = moment().utc().endOf('year');
                    break;

                case 'Last year':
                    startDate = moment().utc().subtract(1, 'year').startOf('year');
                    endDate = moment().utc().subtract(1, 'year').endOf('year');
                    break;
            }

            if (startDate) {
                vm.startDate = startDate.toDate();
                vm.endDate = endDate.toDate();
            }
            else {
                vm.startDate = null;
                vm.endDate = null;
            }
        }
    }

})();
