(function() {

    'use strict';

    angular.module('app.settings')
        .directive('mmmCategorySettings', categorySettingsDirective)
        .controller('CategorySettingsController', CategorySettingsController);


    // ----- categorySettingsDirective -----
    categorySettingsDirective.$inject = [];

    /* @ngInject */
    function categorySettingsDirective() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/settings/category-settings/category-settings.html',
            controller: 'CategorySettingsController',
            controllerAs: 'vm'
        };

        return directive;
    }

    // ----- CategorySettingsController -----
    CategorySettingsController.$inject = ['logger', 'categoryService'];

    /* @ngInject */
    function CategorySettingsController(logger, categoryService) {

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
            vm.editedCategory = angular.copy(category);
        }

        function cancelEdit() {
            vm.editedCategory = null;
        }
    }

})();
