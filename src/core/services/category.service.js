/* jshint -W024 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('categoryService', categoryService);

    categoryService.$inject = ['$http', '$location', 'exception', 'api', '_'];

    /* @ngInject */
    function categoryService($http, $location, exception, api, _) {
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
                var categories = response.data;

                // Sort by name
                categories = _.sortBy(categories, 'name');

                return categories;
            }
        }
    }
})();
