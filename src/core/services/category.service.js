/* jshint -W024 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('categoryService', categoryService);

    categoryService.$inject = ['$http', '$location', 'exception', 'api'];

    /* @ngInject */
    function categoryService($http, $location, exception, api) {
        var service = {
            getCategories: getCategories
        };

        return service;

        function getCategories() {
            return $http.get(api + '/categories', { cache: true })
                .then(getCategoriesSuccess)
                .catch(function(message) {
                    exception.catcher('XHR Failed for getCategories')(message);
                    $location.url('/');
                });

            function getCategoriesSuccess(response) {
                return response.data;
            }
        }
    }
})();
