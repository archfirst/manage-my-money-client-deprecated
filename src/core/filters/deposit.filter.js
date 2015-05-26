// Formats a number to show a deposit:
// if number is negative
//     don't show it
// else
//     show it as a positive number
// Usage:
//     {{100 | deposit}}
//  => 100.00

(function () {
    'use strict';

    angular
        .module('app.core')
        .filter('deposit', formatDeposit);

    formatDeposit.$inject = ['$filter'];

    /* @ngInject */
    function formatDeposit($filter) {
        return function(input) {
            if (input < 0) {
                return '';
            }
            else {
                return $filter('number')(input, 2);
            }
        };
    }
})();
