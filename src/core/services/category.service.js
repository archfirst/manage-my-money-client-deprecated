/* jshint -W024 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('categoryService', categoryService);

    categoryService.$inject = ['$http', '$location', '$cacheFactory', 'exception', 'api', '_'];

    /* @ngInject */
    function categoryService($http, $location, $cacheFactory, exception, api, _) {
        var service = {
            getCategories: getCategories,
            saveCategory: saveCategory,
            clearCache: clearCache
        };

        return service;

        /**
         * Get all categories.
         * @return {Promise} A promise that returns an array of categories if resolved
         */
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

        function saveCategory(category) {

            // Prepare category for transmission
            var categoryXmt = {
                id: category.id,
                name: category.name
            };

            if (!categoryXmt.id) {
                return $http.post(api + '/categories', categoryXmt)
                    .then(saveCategorySuccess)
                    .catch(function(message) {
                        exception.catcher('XHR Failed for saveCategory')(message);
                        $location.url('/');
                    });
            }
            else {
                return $http.put(api + '/categories/' + categoryXmt.id, categoryXmt)
                    .then(saveCategorySuccess)
                    .catch(function(message) {
                        exception.catcher('XHR Failed for saveCategory')(message);
                        $location.url('/');
                    });
            }

            function saveCategorySuccess(response) {
                return response.data;
            }
        }

        function clearCache() {
            var cache = $cacheFactory.get('$http');
            cache.remove(api + '/categories');
        }
    }
})();
