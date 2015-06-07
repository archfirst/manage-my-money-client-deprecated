/* global _, d3, moment */

(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('_', _)
        .constant('d3', d3)
        .constant('moment', moment)
        .constant('api', 'http://localhost:8080');
})();
