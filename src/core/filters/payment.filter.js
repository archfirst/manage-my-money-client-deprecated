// Formats a number to show a payment:
// if number is zero or positive
//     don't show it
// else
//     show it as a positive number
// Usage:
//     {{-100 | payment}}
//  => 100.00

(function () {
    'use strict';

    angular
        .module('app.core')
        .filter('payment', filterFunction);

    filterFunction.$inject = ['$filter'];

    /* @ngInject */
    function filterFunction($filter) {
        return function(input) {
            if (input >= 0) {
                return '';
            }
            else {
                return $filter('number')(-input, 2);
            }
        };
    }
})();
