(function() {

    'use strict';

    angular.module('app.settings')
        .directive('mmmCategorySettings', directiveFunction)
        .controller('CategorySettingsController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/settings/category-settings/category-settings.html',
            controller: 'CategorySettingsController',
            controllerAs: 'vm'
        };

        return directive;
    }

    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['logger', 'categoryService'];

    /* @ngInject */
    function ControllerFunction(logger, categoryService) {

        var vm = this;
        vm.categories = null;
        vm.addCategoryName = null;
        vm.editedCategory = null;

        vm.addCategory = addCategory;
        vm.saveCategory = saveCategory;
        vm.editCategory = editCategory;
        vm.cancelEdit = cancelEdit;

        activate();

        function activate() {
            return getCategories().then(function() {
                logger.log('Activated Categories View');
            });
        }

        function getCategories() {

            // Since category settings changes categories, it should always clear the cache
            categoryService.clearCache();

            return categoryService.getCategories().then(function(data) {
                vm.categories = data;
                return vm.categories;
            });
        }

        function addCategory() {
            return categoryService.saveCategory({ name: vm.addCategoryName })
                .then(function() {
                    // Wipe out category name to add
                    vm.addCategoryName = undefined;

                    // Fetch fresh list of categories
                    return getCategories();
                });
        }

        function saveCategory() {
            return categoryService.saveCategory(vm.editedCategory)
                .then(function() {
                    // Cancel the editing
                    cancelEdit();

                    // Fetch fresh list of categories
                    return getCategories();
                });
        }

        function editCategory(category) {
            // Allow edit if no category is being edited or if the click is on a different category
            if ( (vm.editedCategory === null) || (vm.editedCategory.id !== category.id) ) {
                vm.editedCategory = angular.copy(category);
            }
        }

        function cancelEdit() {
            vm.editedCategory = null;
        }
    }

})();
